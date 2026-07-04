import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { restaurantSlug, tableNumber } = body;

    if (!restaurantSlug || !tableNumber) {
      return NextResponse.json(
        { error: "restaurantSlug and tableNumber are required" },
        { status: 400 }
      );
    }

    const session = await db.tableSession.create({
      data: {
        restaurantSlug: String(restaurantSlug),
        tableNumber: String(tableNumber),
      },
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error("Session creation failure:", error);
    return NextResponse.json(
      { error: "Failed to create table session" },
      { status: 500 }
    );
  }
}