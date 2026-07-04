import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function mapAlert(alert: any) {
  return {
    id: alert.id,
    table: alert.table,
    reason: alert.reason,
    resolved: alert.resolved,
    time: new Date(alert.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export async function GET() {
  try {
    const alerts = await db.staffAlert.findMany({
      where: { resolved: false },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(alerts.map(mapAlert), { status: 200 });
  } catch (error) {
    console.error("Alert loading failure:", error);
    return NextResponse.json(
      { error: "Failed to load alerts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { table, reason } = body;

    if (!table || !reason) {
      return NextResponse.json(
        { error: "table and reason are required" },
        { status: 400 }
      );
    }

    const alert = await db.staffAlert.create({
      data: {
        table: String(table),
        reason: String(reason),
      },
    });

    return NextResponse.json(mapAlert(alert), { status: 201 });
  } catch (error) {
    console.error("Alert creation failure:", error);
    return NextResponse.json(
      { error: "Failed to create alert" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { alertId, resolved } = body;

    if (!alertId) {
      return NextResponse.json(
        { error: "alertId is required" },
        { status: 400 }
      );
    }

    const alert = await db.staffAlert.update({
      where: { id: alertId },
      data: { resolved: Boolean(resolved) },
    });

    return NextResponse.json(mapAlert(alert), { status: 200 });
  } catch (error) {
    console.error("Alert update failure:", error);
    return NextResponse.json(
      { error: "Failed to update alert" },
      { status: 500 }
    );
  }
}