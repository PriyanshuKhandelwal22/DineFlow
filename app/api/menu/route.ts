import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnavailable = searchParams.get("includeUnavailable") === "true";

    const menuItems = await db.menuItem.findMany({
      where: includeUnavailable ? undefined : { available: true },
      orderBy: { category: "asc" },
    });

    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load menu" }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const item = await db.menuItem.create({
      data: {
        id: body.id,
        name: body.name,
        category: body.category,
        description: body.description,
        price: Number(body.price),
        rating: Number(body.rating || 0),
        reviews: Number(body.reviews || 0),
        type: body.type || "Veg",
        prepTime: body.prepTime || "10 mins",
        calories: body.calories || "0 kcal",
        protein: body.protein || "0g",
        spice: body.spice || "Mild",
        image: body.image || "",
        popular: Boolean(body.popular),
        chefRecommend: Boolean(body.chefRecommend),
        recommendReason: body.recommendReason || null,
        ingredients: Array.isArray(body.ingredients)
          ? body.ingredients
          : String(body.ingredients || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Menu create failure:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}

//API TO toggle availibbility of menu items
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }
    {/*admin can update any of the fields of the menu item.
    So we will check which fields are present in the request body and update only those fields.
     We will use the Prisma update method to update the menu item.*/}
    const updateData: any = {};

    if ("available" in body) updateData.available = Boolean(body.available);
    if ("name" in body) updateData.name = String(body.name);
    if ("category" in body) updateData.category = String(body.category);
    if ("description" in body) updateData.description = String(body.description);
    if ("price" in body) updateData.price = Number(body.price);
    if ("type" in body) updateData.type = String(body.type);
    if ("prepTime" in body) updateData.prepTime = String(body.prepTime);
    if ("image" in body) updateData.image = String(body.image);

    const item = await db.menuItem.update({
      where: { id: body.id },
      data: updateData,
    });

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("Menu update failure:", error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}