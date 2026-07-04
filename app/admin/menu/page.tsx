"use client";

import { useEffect, useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  type: string;
  prepTime: string;
  popular: boolean;
  chefRecommend: boolean;
  image: string;
  available: boolean;
};

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);

  //admin can add new menu items using this state
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    category: "Starters",
    description: "",
    price: "",
    type: "Veg",
    prepTime: "10 mins",
    image: "",
    ingredients: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    type: "",
    prepTime: "",
    image: "",
  });


  const fetchMenu = async () => {
    const response = await fetch("/api/menu?includeUnavailable=true", {
      cache: "no-store",
    });
    if (!response.ok) return;

    const data = await response.json();
    setItems(data);
  };
  const toggleAvailability = async (id: string, available: boolean) => {

  const response = await fetch("/api/menu", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      available: !available,
    }),
  });
  if (!response.ok) return;

  const updatedItem = await response.json();

  setItems((prev: MenuItem[]) =>
    prev.map((item: MenuItem) =>
      item.id === id ? { ...item, available: updatedItem.available } : item
    )
  );
};

// Function to create a new menu item and send it to api/menu route
const createItem = async (event: React.FormEvent) => {
  event.preventDefault();

  const response = await fetch("/api/menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...newItem,
      id: newItem.id.trim(),
      name: newItem.name.trim(),
      description: newItem.description.trim(),
      price: Number(newItem.price),
      available: true,
    }),
  });

  if (!response.ok) return;

  const createdItem = await response.json();

  setItems((prev) => [createdItem, ...prev]);
  setNewItem({
    id: "",
    name: "",
    category: "Starters",
    description: "",
    price: "",
    type: "Veg",
    prepTime: "10 mins",
    image: "",
    ingredients: "",
  });
};

/* add edit fynctionality to edit menu items.  */
const startEditing = (item: MenuItem) => {
  setEditingId(item.id);
  setEditItem({
    name: item.name,
    category: item.category,
    description: item.description,
    price: String(item.price),
    type: item.type,
    prepTime: item.prepTime,
    image: item.image,
  });
};

const cancelEditing = () => {
  setEditingId(null);
};

const saveEdit = async (id: string) => {
  const response = await fetch("/api/menu", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      ...editItem,
      price: Number(editItem.price),
    }),
  });

  if (!response.ok) return;

  const updatedItem = await response.json();

  setItems((prev) =>
    prev.map((item) => (item.id === id ? updatedItem : item))
  );

  setEditingId(null);
};


  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-black">Menu Management</h1>
          <p className="text-sm text-slate-400 mt-1">
            View and manage restaurant menu items.
          </p>
        </div>

        {/* create a form to add new menu items with fields for id, name, category, description, price, type, prep time, image and ingredients. On submit, call createItem function */}
        <form
          onSubmit={createItem}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5"
        >
          <input
            placeholder="ID, e.g. d2"
            value={newItem.id}
            onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
            required
          />

          <input
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
            required
          />

          <input
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
          />

          <input
            placeholder="Price"
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
            required
          />

          <input
            placeholder="Prep time"
            value={newItem.prepTime}
            onChange={(e) => setNewItem({ ...newItem, prepTime: e.target.value })}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
          />

          <input
            placeholder="Image URL"
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            className="rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="md:col-span-2 rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
            required
          />

          <input
            placeholder="Ingredients comma separated"
            value={newItem.ingredients}
            onChange={(e) => setNewItem({ ...newItem, ingredients: e.target.value })}
            className="md:col-span-2 rounded-xl bg-slate-950 border border-slate-700 px-3 py-2"
          />

          <button className="md:col-span-2 rounded-xl bg-orange-600 px-4 py-3 font-black">
            Add Menu Item
          </button>
        </form>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-3 px-4 py-3 text-xs font-black uppercase text-slate-400 border-b border-slate-800">
            <span className="col-span-4">Item</span>
            <span className="col-span-2">Category</span>
            <span className="col-span-2">Type</span>
            <span className="col-span-2">Prep</span>
            <span className="col-span-1 text-right">Price</span>
            <span className="col-span-1 text-right">Action</span>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-3 px-4 py-4 border-b border-slate-800 items-center"
            >
              <div className="col-span-4 flex items-center gap-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-800"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                    No img
                  </div>
                )}
                <div>
                  <p className="font-black">{item.name}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <span className="col-span-2 text-sm text-slate-300">
                {item.category}
              </span>

              <span className="col-span-2 text-sm text-slate-300">
                {item.type}
              </span>

              <span className="col-span-2 text-sm text-slate-300">
                {item.prepTime}
              </span>

              <span className="col-span-1 text-right font-black">
                ₹{item.price}
              </span>

              <div className="col-span-1 flex flex-col gap-2">
                <button
                  onClick={() => startEditing(item)}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-black text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => toggleAvailability(item.id, item.available)}
                  className={`rounded-lg px-3 py-2 text-xs font-black text-white ${
                    item.available ? "bg-red-600" : "bg-emerald-600"
                  }`}
                >
                  {item.available ? "Disable" : "Enable"}
                </button>
              </div>
              {editingId === item.id && (
  <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950 border border-slate-800 rounded-xl p-4">
    <input
      value={editItem.name}
      onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
      className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2"
      placeholder="Name"
    />

    <input
      value={editItem.category}
      onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
      className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2"
      placeholder="Category"
    />

    <input
      value={editItem.price}
      onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
      className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2"
      placeholder="Price"
    />

    <input
      value={editItem.prepTime}
      onChange={(e) => setEditItem({ ...editItem, prepTime: e.target.value })}
      className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2"
      placeholder="Prep Time"
    />

    <input
      value={editItem.image}
      onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
      className="md:col-span-2 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2"
      placeholder="Image URL"
    />

    <textarea
      value={editItem.description}
      onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
      className="md:col-span-2 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2"
      placeholder="Description"
    />

    <div className="md:col-span-2 flex gap-3">
      <button
        type="button"
        onClick={() => saveEdit(item.id)}
        className="rounded-xl bg-emerald-600 px-4 py-2 font-black text-white"
      >
        Save
      </button>

      <button
        type="button"
        onClick={cancelEditing}
        className="rounded-xl bg-slate-700 px-4 py-2 font-black text-white"
      >
        Cancel
      </button>
    </div>
  </div>
)}
            </div>
          ))}

          {items.length === 0 && (
            <div className="p-10 text-center text-slate-400">
              No menu items found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

