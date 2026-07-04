import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/tables?restaurantSlug=demo
// Admin needs a saved table list so QR management is repeatable.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantSlug = searchParams.get("restaurantSlug") || "demo";

    const tables = await db.restaurantTable.findMany({
      where: { restaurantSlug },
      orderBy: [{ active: "desc" }, { tableNumber: "asc" }],
    });

    return NextResponse.json(tables, { status: 200 });
  } catch (error) {
    console.error("Table loading failure:", error);

    return NextResponse.json(
      { error: "Failed to load tables" },
      { status: 500 }
    );
  }
}

// POST /api/tables
// Creates a table once, then admin can generate its QR whenever needed.
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.tableNumber) {
      return NextResponse.json(
        { error: "tableNumber is required" },
        { status: 400 }
      );
    }

    const table = await db.restaurantTable.create({
      data: {
        restaurantSlug: String(body.restaurantSlug || "demo"),
        tableNumber: String(body.tableNumber).trim(),
        label: body.label ? String(body.label).trim() : null,
        seats: Number(body.seats || 2),
        active: true,
      },
    });

    return NextResponse.json(table, { status: 201 });
  } catch (error) {
    console.error("Table create failure:", error);

    return NextResponse.json(
      { error: "Failed to create table" },
      { status: 500 }
    );
  }
}

// PATCH /api/tables
// We update instead of delete so historical orders still make sense.
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const updateData: {
      tableNumber?: string;
      label?: string | null;
      seats?: number;
      active?: boolean;
    } = {};

    if ("tableNumber" in body) {
      updateData.tableNumber = String(body.tableNumber).trim();
    }

    if ("label" in body) {
      updateData.label = body.label ? String(body.label).trim() : null;
    }

    if ("seats" in body) {
      updateData.seats = Number(body.seats);
    }

    if ("active" in body) {
      updateData.active = Boolean(body.active);
    }

    const table = await db.restaurantTable.update({
      where: { id: body.id },
      data: updateData,
    });

    return NextResponse.json(table, { status: 200 });
  } catch (error) {
    console.error("Table update failure:", error);

    return NextResponse.json(
      { error: "Failed to update table" },
      { status: 500 }
    );
  }
}