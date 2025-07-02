import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface InventoryItem {
  id: string;
  itemDescription: string;
  qty: string;
  uom: string;
  deliveryDate: string;
  qty_delivered: string;
  releaseDate: string;
  qty_released: string;
  totalQtyOnHand: string;
  category: string;
  notes?: string;
  threshold?: number;
}

const GLOBAL_THRESHOLD = 3;

const InventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [form, setForm] = useState<Omit<InventoryItem, "id">>({
    itemDescription: "",
    qty: "",
    uom: "",
    deliveryDate: "",
    qty_delivered: "",
    releaseDate: "",
    qty_released: "",
    totalQtyOnHand: "",
    category: "",
    notes: "",
    threshold: GLOBAL_THRESHOLD,
  });
  const [categoryFilter, setCategoryFilter] = useState("");
  const [itemDescriptions, setItemDescriptions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [showManualDescription, setShowManualDescription] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("item_description", { ascending: true });
      if (error) {
        console.error("Error fetching inventory:", error);
      } else {
        setItems(
          (data || []).map((item) => ({
            id: item.id,
            itemDescription: item.item_description,
            qty: item.qty,
            uom: item.uom,
            deliveryDate: item.delivery_date,
            qty_delivered: item.qty_delivered,
            releaseDate: item.release_date,
            qty_released: item.qty_released,
            totalQtyOnHand: item.total_qty_on_hand,
            category: item.category,
            notes: item.notes || "",
            threshold:
              item.threshold !== undefined && item.threshold !== null
                ? Number(item.threshold)
                : GLOBAL_THRESHOLD,
          }))
        );
        // Fetch unique item descriptions
        const uniqueDescriptions = Array.from(
          new Set(
            (data || []).map((item) => item.item_description).filter(Boolean)
          )
        );
        setItemDescriptions(uniqueDescriptions);
      }
    };
    fetchInventory();
  }, []);

  // Calculate filtered items
  const searchLower = search.toLowerCase();
  const filtered = items.filter(
    (i) =>
      (categoryFilter === "" || i.category === categoryFilter) &&
      (i.itemDescription?.toLowerCase().includes(searchLower) ||
        i.category?.toLowerCase().includes(searchLower) ||
        i.uom?.toLowerCase().includes(searchLower) ||
        (i.qty !== undefined &&
          i.qty !== null &&
          i.qty.toString().toLowerCase().includes(searchLower)) ||
        (i.qty_delivered !== undefined &&
          i.qty_delivered !== null &&
          i.qty_delivered.toString().toLowerCase().includes(searchLower)) ||
        (i.qty_released !== undefined &&
          i.qty_released !== null &&
          i.qty_released.toString().toLowerCase().includes(searchLower)) ||
        (i.totalQtyOnHand !== undefined &&
          i.totalQtyOnHand !== null &&
          i.totalQtyOnHand.toString().toLowerCase().includes(searchLower)))
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page if filter/search changes and current page is out of range
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [categoryFilter, search, totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleExport = () => {
    const csv = [
      [
        "Category",
        "Item Description",
        "Qty",
        "Uom",
        "Delivery Date",
        "Qty Delivered",
        "Release Date",
        "Qty Released",
        "Total Qty On Hand",
        "Notes",
      ],
      ...items.map((i) => [
        i.category,
        i.itemDescription,
        i.qty,
        i.uom,
        i.deliveryDate,
        i.qty_delivered,
        i.releaseDate,
        i.qty_released,
        i.totalQtyOnHand,
        i.notes || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const { error } = await supabase
        .from("inventory")
        .update({
          item_description: form.itemDescription,
          qty: form.qty,
          uom: form.uom,
          delivery_date: form.deliveryDate,
          qty_delivered: form.qty_delivered,
          release_date: form.releaseDate,
          qty_released: form.qty_released,
          total_qty_on_hand: form.totalQtyOnHand,
          category: form.category,
          notes: form.notes,
          threshold: form.threshold,
        })
        .eq("id", editing.id);
      if (error) alert("Error updating item");
      else {
        // Log activity
        await supabase.from("admin_activity").insert([
          {
            module: "inventory",
            record_id: editing.id,
            action: "updated",
            description: `Updated inventory item: ${form.itemDescription}`,
            actor: null,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } else {
      const { error } = await supabase.from("inventory").insert([
        {
          item_description: form.itemDescription,
          qty: form.qty,
          uom: form.uom,
          delivery_date: form.deliveryDate,
          qty_delivered: form.qty_delivered,
          release_date: form.releaseDate,
          qty_released: form.qty_released,
          total_qty_on_hand: form.totalQtyOnHand,
          category: form.category,
          notes: form.notes,
          threshold: form.threshold,
        },
      ]);
      if (error) alert("Error adding item");
      else {
        // Log activity (fetch the new record's id)
        const { data: newData } = await supabase
          .from("inventory")
          .select("id")
          .order("id", { ascending: false })
          .limit(1);
        const newId = newData && newData[0] ? newData[0].id : null;
        await supabase.from("admin_activity").insert([
          {
            module: "inventory",
            record_id: newId,
            action: "created",
            description: `Added inventory item: ${form.itemDescription}`,
            actor: null,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    }
    setShowForm(false);
    setEditing(null);
    const { data } = await supabase.from("inventory").select("*");
    setItems(
      (data || []).map((item) => ({
        id: item.id,
        itemDescription: item.item_description,
        qty: item.qty,
        uom: item.uom,
        deliveryDate: item.delivery_date,
        qty_delivered: item.qty_delivered,
        releaseDate: item.release_date,
        qty_released: item.qty_released,
        totalQtyOnHand: item.total_qty_on_hand,
        category: item.category,
        notes: item.notes || "",
        threshold:
          item.threshold !== undefined && item.threshold !== null
            ? Number(item.threshold)
            : GLOBAL_THRESHOLD,
      }))
    );
  };

  const handleEdit = (item: InventoryItem) => {
    setEditing(item);
    setForm({ ...item, threshold: item.threshold ?? GLOBAL_THRESHOLD });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteItem = async () => {
    if (!deleteItemId) return;
    // Find the item for description
    const item = items.find((i) => i.id === deleteItemId);
    const { error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", deleteItemId);
    if (error) alert("Error deleting item");
    else {
      // Log activity
      await supabase.from("admin_activity").insert([
        {
          module: "inventory",
          record_id: deleteItemId,
          action: "deleted",
          description: item
            ? `Deleted inventory item: ${item.itemDescription}`
            : `Deleted inventory item (${deleteItemId})`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    const { data } = await supabase.from("inventory").select("*");
    setItems(
      (data || []).map((item) => ({
        id: item.id,
        itemDescription: item.item_description,
        qty: item.qty,
        uom: item.uom,
        deliveryDate: item.delivery_date,
        qty_delivered: item.qty_delivered,
        releaseDate: item.release_date,
        qty_released: item.qty_released,
        totalQtyOnHand: item.total_qty_on_hand,
        category: item.category,
        notes: item.notes || "",
        threshold:
          item.threshold !== undefined && item.threshold !== null
            ? Number(item.threshold)
            : GLOBAL_THRESHOLD,
      }))
    );
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  const cancelDeleteItem = () => {
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  // Compute filtered item descriptions based on selected category
  const filteredItemDescriptions = form.category
    ? items
        .filter((i) => i.category === form.category)
        .map((i) => i.itemDescription)
    : itemDescriptions;

  // Out of stock and low stock logic
  const outOfStockItems = items.filter((i) => Number(i.totalQtyOnHand) === 0);
  const lowStockItems = items.filter(
    (i) =>
      Number(i.totalQtyOnHand) > 0 &&
      Number(i.totalQtyOnHand) <= (i.threshold ?? GLOBAL_THRESHOLD)
  );

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin")}
            className="mr-3 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-6 w-6 text-black dark:text-gray-100" />
          </button>
          <h1 className="text-2xl font-bold text-black dark:text-gray-100">
            Inventory Management
          </h1>
        </div>
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center mr-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </button>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="mb-4 px-3 py-2 border rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
      {lowStockItems.length > 0 && (
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-2 rounded mb-2 font-semibold">
          {lowStockItems.length} item(s) are low on stock!
        </div>
      )}
      {outOfStockItems.length > 0 && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-2 rounded mb-4 font-semibold">
          {outOfStockItems.length} item(s) are out of stock!
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-700">
              <th className="px-6 py-3 text-left font-bold text-blue-500">
                Item Description
              </th>
              <th className="px-6 py-3 text-center font-bold text-green-500">
                Qty
              </th>
              <th className="px-6 py-3 text-left font-bold text-purple-500">
                Uom
              </th>
              <th className="px-6 py-3 text-left font-bold text-pink-500">
                Delivery Date
              </th>
              <th className="px-6 py-3 text-center font-bold text-yellow-500">
                Qty Delivered
              </th>
              <th className="px-6 py-3 text-left font-bold text-cyan-500">
                Release Date
              </th>
              <th className="px-6 py-3 text-center font-bold text-orange-500">
                Qty Released
              </th>
              <th className="px-6 py-3 text-center font-bold text-indigo-500">
                Total Qty On Hand
              </th>
              <th className="px-6 py-3 text-center font-bold text-teal-500">
                Threshold
              </th>
              <th className="px-6 py-3 text-left font-bold text-red-500">
                Category
              </th>
              <th className="px-6 py-3 text-left font-bold text-gray-400">
                Notes
              </th>
              <th className="px-6 py-3 text-left font-bold text-black dark:text-white">
                Actions
              </th>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-white dark:bg-gray-800">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-500"
                >
                  <option value="">All</option>
                  <option value="Solar Accessories">Solar Accessories</option>
                  <option value="Inverters">Inverters</option>
                  <option value="Other Materials">Other Materials</option>
                </select>
              </th>
              <th colSpan={9}></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedItems.map((i) => {
              const isOutOfStock = Number(i.totalQtyOnHand) === 0;
              const isLowStock =
                Number(i.totalQtyOnHand) > 0 &&
                Number(i.totalQtyOnHand) <= (i.threshold ?? GLOBAL_THRESHOLD);
              const isDisabled =
                i.qty === undefined || i.qty === null || i.qty === "";
              return (
                <tr
                  key={i.id}
                  className={
                    isOutOfStock
                      ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 font-bold"
                      : isLowStock
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-200 font-bold"
                      : isDisabled
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }
                >
                  <td className="px-6 py-2 align-middle">
                    {i.itemDescription}
                  </td>
                  <td className="px-6 py-2 align-middle text-center">
                    {i.qty}
                  </td>
                  <td className="px-6 py-2 align-middle">
                    {i.uom ? i.uom.toLowerCase() : ""}
                  </td>
                  <td className="px-6 py-2 align-middle">{i.deliveryDate}</td>
                  <td className="px-6 py-2 align-middle text-center">
                    {i.qty_delivered}
                  </td>
                  <td className="px-6 py-2 align-middle">{i.releaseDate}</td>
                  <td className="px-6 py-2 align-middle text-center">
                    {i.qty_released}
                  </td>
                  <td className="px-6 py-2 align-middle text-center">
                    {i.totalQtyOnHand}
                  </td>
                  <td className="px-6 py-2 align-middle text-center">
                    {i.threshold ?? GLOBAL_THRESHOLD}
                  </td>
                  <td className="px-6 py-2 align-middle">{i.category}</td>
                  <td className="px-6 py-2 align-middle">{i.notes}</td>
                  <td className="px-6 py-2 align-middle text-center">
                    <button
                      onClick={() => handleEdit(i)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(i.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {paginatedItems.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="text-center text-gray-400 px-4 py-6"
                >
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border font-semibold ${
            currentPage === 1
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Prev
        </button>
        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded font-semibold border transition-colors duration-150 mx-0.5
              ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
              }`}
            style={{ minWidth: 36 }}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border font-semibold ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-lg space-y-4 relative"
          >
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-2">
              {editing ? "Edit" : "Add"} Inventory Item
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => {
                    const newCategory = e.target.value;
                    setForm((f) => {
                      const filtered = newCategory
                        ? items
                            .filter((i) => i.category === newCategory)
                            .map((i) => i.itemDescription)
                        : itemDescriptions;
                      return {
                        ...f,
                        category: newCategory,
                        itemDescription: filtered.includes(f.itemDescription)
                          ? f.itemDescription
                          : "",
                      };
                    });
                  }}
                  className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Solar Accessories">Solar Accessories</option>
                  <option value="Inverters">Inverters</option>
                  <option value="Solar Panels">Solar Panels</option>
                  <option value="Other Materials">Other Materials</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Item Description *
                </label>
                {!showManualDescription &&
                filteredItemDescriptions.length > 0 ? (
                  <>
                    <div className="flex gap-2">
                      <select
                        required
                        value={form.itemDescription}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            itemDescription: e.target.value,
                          }))
                        }
                        className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="" disabled>
                          Select Item Description
                        </option>
                        {filteredItemDescriptions.map((desc) => (
                          <option key={desc} value={desc}>
                            {desc}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="text-blue-600 underline text-xs px-2"
                        onClick={() => setShowManualDescription(true)}
                      >
                        Add new description
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        required
                        value={form.itemDescription}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            itemDescription: e.target.value,
                          }))
                        }
                        placeholder="Item Description"
                        className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      {filteredItemDescriptions.length > 0 && (
                        <button
                          type="button"
                          className="text-blue-600 underline text-xs px-2"
                          onClick={() => setShowManualDescription(false)}
                        >
                          Select from list
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Quantity *
                  </label>
                  <input
                    required
                    value={form.qty}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, qty: e.target.value }))
                    }
                    type="number"
                    min="0"
                    placeholder="Quantity"
                    className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    UOM *
                  </label>
                  <select
                    required
                    value={form.uom}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, uom: e.target.value }))
                    }
                    className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="" disabled>
                      Select UOM
                    </option>
                    <option value="PCS">PCS</option>
                    <option value="SETS">SETS</option>
                    <option value="UNITS">UNITS</option>
                    <option value="KWH">KWH</option>
                    <option value="KW">KW</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Delivery Date *
                  </label>
                  <input
                    required
                    value={form.deliveryDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, deliveryDate: e.target.value }))
                    }
                    type="date"
                    placeholder="Delivery Date"
                    className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Qty Delivered
                  </label>
                  <input
                    value={form.qty_delivered}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, qty_delivered: e.target.value }))
                    }
                    type="number"
                    min="0"
                    placeholder="Qty Delivered"
                    className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Release Date
                  </label>
                  <input
                    value={form.releaseDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, releaseDate: e.target.value }))
                    }
                    type="date"
                    placeholder="Release Date"
                    className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Qty Released
                  </label>
                  <input
                    value={form.qty_released}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, qty_released: e.target.value }))
                    }
                    type="number"
                    min="0"
                    placeholder="Qty Released"
                    className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Total Qty On Hand *
                </label>
                <input
                  required
                  value={form.totalQtyOnHand}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, totalQtyOnHand: e.target.value }))
                  }
                  type="number"
                  min="0"
                  placeholder="Total Qty On Hand"
                  className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={2}
                  placeholder="Enter notes (optional)"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Threshold
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.threshold ?? GLOBAL_THRESHOLD}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        threshold: Number(e.target.value),
                      }))
                    }
                    className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <span className="text-xs text-gray-400 dark:text-gray-400">
                    (Default: {GLOBAL_THRESHOLD})
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Custom Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
              Delete Item?
            </h3>
            <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this inventory item? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDeleteItem}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteItem}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
