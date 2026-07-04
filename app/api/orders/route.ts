import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function mapOrderForKds(order: any) {
  return {
    id: order.id,
    sessionId: order.sessionId,
    table: order.tableNumber,
    items: order.items.map((item: any) => ({
      id: item.menuItem.id,
      name: item.menuItem.name,
      price: item.menuItem.price,
      quantity: item.quantity,
      image: item.menuItem.image,
      type: item.menuItem.type,
      prepTime: item.menuItem.prepTime,
    })),
    notes: order.notes || "",
    subtotal: order.subtotal,
    gst: order.gst,
    grandTotal: order.grandTotal,
    prepStage: order.prepStage,
    time: new Date(order.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    timestamp: new Date(order.createdAt).getTime(),
    priority: order.priority,
    completedDishes: Object.fromEntries(
      order.items.map((item: any) => [
        `${order.id}-${item.menuItem.id}`,
        item.prepped,
      ])
    ),
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Admin can request archived orders too.
    // KDS stays unchanged because default behavior still returns only active orders.
    const includeArchived = searchParams.get("includeArchived") === "true";

    // These are optional filters for admin dashboard reporting.
    const table = searchParams.get("table");
    const sessionId = searchParams.get("sessionId");
    const status = searchParams.get("status");

    const where: any = {};

    if (!includeArchived) {
      where.prepStage = { lt: 4 };
    }

    if (table) {
      where.tableNumber = table;
    }

    if (sessionId) {
      where.sessionId = sessionId;
    }

    if (status && status !== "all") {
      where.prepStage = Number(status);
    }

    const orders = await db.order.findMany({
      where,
      include: {
        items: {
          include: { menuItem: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders.map(mapOrderForKds), { status: 200 });
  } catch (error) {
    console.error("Order loading failure:", error);

    return NextResponse.json(
      { error: "Failed to load orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      restaurantSlug,
      tableNumber,
      sessionId,
      items,
      notes,
      subtotal,
      gst,
      grandTotal,
      priority,
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must include at least one item" },
        { status: 400 }
      );
    }

    const newOrder = await db.order.create({
      data: {
        restaurantSlug: String(restaurantSlug || "demo"),
        tableNumber: String(tableNumber || "12"),
        sessionId: sessionId || null,
        notes: notes || "",
        subtotal: Number(subtotal),
        gst: Number(gst),
        grandTotal: Number(grandTotal),
        priority: priority || "Normal",
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.id,
            quantity: Number(item.quantity),
          })),
        },
      },
      include: {
        items: {
          include: { menuItem: true },
        },
      },
    });

    return NextResponse.json(mapOrderForKds(newOrder), { status: 201 });
  } catch (error) {
    console.error("Order writing failure:", error);
    const message = error instanceof Error ? error.message : "Failed to write order";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, prepStage, itemKey, prepped } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId is required" },
        { status: 400 }
      );
    }

    if (typeof prepStage === "number") {
      const updatedOrder = await db.order.update({
        where: { id: orderId },
        data: { prepStage },
        include: {
          items: {
            include: { menuItem: true },
          },
        },
      });

      return NextResponse.json(mapOrderForKds(updatedOrder), { status: 200 });
    }

    if (itemKey) {
      const menuItemId = String(itemKey).replace(`${orderId}-`, "");

      await db.orderItem.updateMany({
        where: {
          orderId,
          menuItemId,
        },
        data: {
          prepped: Boolean(prepped),
        },
      });

      const updatedOrder = await db.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: { menuItem: true },
          },
        },
      });

      if (!updatedOrder) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(mapOrderForKds(updatedOrder), { status: 200 });
    }

    return NextResponse.json(
      { error: "No valid update action supplied" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Order update failure:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}


