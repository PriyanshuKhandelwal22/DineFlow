import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { restaurantSlug, tableNumber, origin } = body;

    if (!restaurantSlug || !tableNumber || !origin) {
      return NextResponse.json(
        { error: "restaurantSlug, tableNumber, and origin are required" },
        { status: 400 }
      );
    }

    const url = `${origin}/r/${encodeURIComponent(
      restaurantSlug
    )}/table/${encodeURIComponent(tableNumber)}`;

    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 512,
      margin: 2,
      color: {
        dark: "#111827",
        light: "#ffffff",
      },
    });

    return NextResponse.json({
      url,
      qrDataUrl,
    });
  } catch (error) {
    console.error("QR generation failure:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}