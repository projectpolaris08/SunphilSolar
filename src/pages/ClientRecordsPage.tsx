import React, { useState, useRef, useEffect } from "react";
import { Plus, Edit, Trash2, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface ClientRecord {
  id: string;
  date: string;
  name: string;
  address: string;
  inverter: string;
  solar_panel_pcs: string;
  solar_panel_wattage: string;
  battery_type: string;
  battery_qty: string;
  contact: string;
  facebook: string;
  visitation: string;
  notes: string;
  amount: string;
}

const ClientRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const tableRef = useRef<HTMLDivElement>(null);
  const [records, setRecords] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ClientRecord | null>(null);
  const [form, setForm] = useState<Omit<ClientRecord, "id">>({
    date: "",
    name: "",
    address: "",
    inverter: "",
    solar_panel_pcs: "",
    solar_panel_wattage: "",
    battery_type: "",
    battery_qty: "",
    contact: "",
    facebook: "",
    visitation: "",
    notes: "",
    amount: "",
  });
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const filteredRecords = records.filter((r) => {
    const searchTerm = search.toLowerCase();
    return (
      String(r.name || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.address || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.inverter || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.solar_panel_pcs || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.solar_panel_wattage || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.battery_type || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.battery_qty || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.contact || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.facebook || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.visitation || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.notes || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.amount || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(r.date || "")
        .toLowerCase()
        .includes(searchTerm)
    );
  });
  const totalPages = Math.ceil(filteredRecords.length / pageSize);
  const paginated = filteredRecords.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("client_records")
        .select("*")
        .order("date", { ascending: false });
      if (error) {
        alert("Error fetching client records: " + error.message);
      } else {
        console.log("Fetched records:", data);
        setRecords(
          (data || []).map((rec: any) => ({
            id: rec.id,
            date: rec.date || "",
            name: rec.client_name || "",
            address: rec.client_address || "",
            inverter: rec.inverter || "",
            solar_panel_pcs: rec.solar_panel_pcs || "",
            solar_panel_wattage: rec.solar_panel_wattage || "",
            battery_type: rec.battery_type || "",
            battery_qty: rec.battery_qty || "",
            contact: rec.contact_number || "",
            facebook: rec.facebook_name || "",
            visitation: rec.visitation_date || "",
            notes: rec.notes || "",
            amount: rec.amount ? rec.amount.toString() : "",
          }))
        );
      }
      setLoading(false);
    };
    fetchRecords();
  }, []);

  const handleExport = () => {
    const csv = [
      [
        "Date",
        "Client Name",
        "Client Address",
        "Inverter",
        "Solar Panels",
        "Battery",
        "Contact Number",
        "Facebook Name",
        "Visitation Date",
        "Notes",
        "Amount",
      ],
      ...records.map((r) => [
        r.date,
        r.name,
        r.address,
        r.inverter,
        r.solar_panel_pcs + " pcs, " + r.solar_panel_wattage + "W",
        r.battery_type + " " + r.battery_qty,
        r.contact,
        r.facebook,
        r.visitation,
        r.notes,
        r.amount,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "client-records.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const { error } = await supabase
        .from("client_records")
        .update({
          client_name: form.name,
          client_address: form.address,
          inverter: form.inverter,
          solar_panel_pcs: form.solar_panel_pcs
            ? parseInt(form.solar_panel_pcs, 10)
            : null,
          solar_panel_wattage: form.solar_panel_wattage,
          battery_type: form.battery_type,
          battery_qty: form.battery_qty ? parseInt(form.battery_qty, 10) : null,
          contact_number: form.contact,
          facebook_name: form.facebook,
          visitation_date: form.visitation ? form.visitation : null,
          notes: form.notes,
          amount: form.amount ? form.amount.replace(/,/g, "") : null,
          date: form.date,
        })
        .eq("id", editing.id);
      if (error) {
        console.error(error);
        alert("Failed to update record: " + error.message);
        return;
      }
      // Log activity
      await supabase.from("admin_activity").insert([
        {
          module: "client_record",
          record_id: editing.id,
          action: "updated",
          description: `Updated client record for ${form.name}`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);
    } else {
      const { error } = await supabase.from("client_records").insert([
        {
          client_name: form.name,
          client_address: form.address,
          inverter: form.inverter,
          solar_panel_pcs: form.solar_panel_pcs
            ? parseInt(form.solar_panel_pcs, 10)
            : null,
          solar_panel_wattage: form.solar_panel_wattage,
          battery_type: form.battery_type,
          battery_qty: form.battery_qty ? parseInt(form.battery_qty, 10) : null,
          contact_number: form.contact,
          facebook_name: form.facebook,
          visitation_date: form.visitation ? form.visitation : null,
          notes: form.notes,
          amount: form.amount ? form.amount.replace(/,/g, "") : null,
          date: form.date,
        },
      ]);
      if (error) {
        console.error(error);
        alert("Failed to add record: " + error.message);
        return;
      }
      // Log activity (fetch the new record's id)
      const { data: newData } = await supabase
        .from("client_records")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);
      const newId = newData && newData[0] ? newData[0].id : null;
      await supabase.from("admin_activity").insert([
        {
          module: "client_record",
          record_id: newId,
          action: "created",
          description: `Created client record for ${form.name}`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    setForm({
      date: "",
      name: "",
      address: "",
      inverter: "",
      solar_panel_pcs: "",
      solar_panel_wattage: "",
      battery_type: "",
      battery_qty: "",
      contact: "",
      facebook: "",
      visitation: "",
      notes: "",
      amount: "",
    });
    setShowForm(false);
    setEditing(null);
    setLoading(true);
    const { data, error } = await supabase
      .from("client_records")
      .select("*")
      .order("date", { ascending: false });
    if (!error && data) {
      setRecords(
        (data || []).map((rec: any) => ({
          id: rec.id,
          date: rec.date || "",
          name: rec.client_name || "",
          address: rec.client_address || "",
          inverter: rec.inverter || "",
          solar_panel_pcs: rec.solar_panel_pcs || "",
          solar_panel_wattage: rec.solar_panel_wattage || "",
          battery_type: rec.battery_type || "",
          battery_qty: rec.battery_qty || "",
          contact: rec.contact_number || "",
          facebook: rec.facebook_name || "",
          visitation: rec.visitation_date || "",
          notes: rec.notes || "",
          amount: rec.amount ? rec.amount.toString() : "",
        }))
      );
    }
    setLoading(false);
  };

  const handleEdit = (rec: ClientRecord) => {
    setEditing(rec);
    setForm({ ...rec });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteRecordId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteRecord = async () => {
    if (!deleteRecordId) return;
    // Find the record for description
    const record = records.find((r) => r.id === deleteRecordId);
    const { error } = await supabase
      .from("client_records")
      .delete()
      .eq("id", deleteRecordId);
    if (!error) {
      setRecords(records.filter((r) => r.id !== deleteRecordId));
      // Log activity
      await supabase.from("admin_activity").insert([
        {
          module: "client_record",
          record_id: deleteRecordId,
          action: "deleted",
          description: record
            ? `Deleted client record for ${record.name}`
            : `Deleted client record (${deleteRecordId})`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);
    } else {
      alert("Failed to delete record.");
    }
    setShowDeleteModal(false);
    setDeleteRecordId(null);
  };

  const cancelDeleteRecord = () => {
    setShowDeleteModal(false);
    setDeleteRecordId(null);
  };

  const scrollToTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin")}
            className="mr-3 p-2 rounded hover:bg-gray-200"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">Client Records</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
              setForm({
                date: "",
                name: "",
                address: "",
                inverter: "",
                solar_panel_pcs: "",
                solar_panel_wattage: "",
                battery_type: "",
                battery_qty: "",
                contact: "",
                facebook: "",
                visitation: "",
                notes: "",
                amount: "",
              });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Record
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
        className="mb-4 px-3 py-2 border rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading ? <div>Loading...</div> : null}
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-700">
              <th className="px-4 py-2 text-left font-bold text-blue-500">
                Date
              </th>
              <th className="px-4 py-2 text-left font-bold text-green-500">
                Client
              </th>
              <th className="px-4 py-2 text-left font-bold text-purple-500">
                Location
              </th>
              <th className="px-4 py-2 text-left font-bold text-pink-500">
                Inverter
              </th>
              <th className="px-4 py-2 text-left font-bold text-yellow-500">
                Solar Panels
              </th>
              <th className="px-4 py-2 text-left font-bold text-cyan-500">
                Battery
              </th>
              <th className="px-4 py-2 text-left font-bold text-orange-500">
                Contact Number
              </th>
              <th className="px-4 py-2 text-left font-bold text-indigo-500">
                Facebook Name
              </th>
              <th className="px-4 py-2 text-left font-bold text-teal-500">
                Visitation Date
              </th>
              <th className="px-4 py-2 text-left font-bold text-red-500">
                Notes
              </th>
              <th className="px-4 py-2 text-left font-bold text-gray-400">
                Amount
              </th>
              <th className="px-4 py-2 text-left font-bold text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginated.map((r) => (
              <tr
                key={r.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 align-middle"
              >
                <td className="px-4 py-2 align-middle whitespace-nowrap text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.date}
                </td>
                <td className="px-4 py-2 align-middle whitespace-normal break-words text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.name}
                </td>
                <td className="px-4 py-2 align-middle whitespace-normal break-words text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.address}
                </td>
                <td className="px-4 py-2 align-middle whitespace-normal break-words text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.inverter}
                </td>
                <td className="px-4 py-2 align-middle whitespace-normal break-words text-gray-900 dark:text-gray-100 text-[15px]">
                  {`${r.solar_panel_pcs} pcs, ${r.solar_panel_wattage}W`.replace(
                    /W{2,}/g,
                    "W"
                  )}
                </td>
                <td className="px-4 py-2 align-middle whitespace-normal break-words text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.battery_qty && parseInt(r.battery_qty) > 1
                    ? `${r.battery_qty} x ${r.battery_type}`
                    : r.battery_type}
                </td>
                <td className="px-4 py-2 align-middle text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.contact}
                </td>
                <td className="px-4 py-2 align-middle text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.facebook}
                </td>
                <td className="px-4 py-2 align-middle text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.visitation}
                </td>
                <td className="px-4 py-2 align-middle text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.notes}
                </td>
                <td className="px-4 py-2 align-middle text-gray-900 dark:text-gray-100 text-[15px]">
                  {r.amount
                    ? Number(r.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : ""}
                </td>
                <td className="px-4 py-2 align-middle text-center">
                  <button
                    onClick={() => handleEdit(r)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => {
              setPage((p) => Math.max(1, p - 1));
              scrollToTable();
            }}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-400"
          >
            Prev
          </button>
          {/* Page number buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => {
                setPage(num);
                scrollToTable();
              }}
              className={`px-3 py-1 rounded ${
                num === page
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-100 text-gray-800 hover:bg-blue-100"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => {
              setPage((p) => Math.min(totalPages, p + 1));
              scrollToTable();
            }}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-blue-500 text-white disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit" : "Add"} Record
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Client Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Client Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Inverter
                </label>
                <select
                  value={form.inverter}
                  onChange={(e) =>
                    setForm({ ...form, inverter: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select Inverter</option>
                  <option value="3kW">3kW</option>
                  <option value="6kW">6kW</option>
                  <option value="8kW">8kW</option>
                  <option value="12kW">12kW</option>
                  <option value="16kW">16kW</option>
                  <option value="18kW">18kW</option>
                  <option value="24kW">24kW</option>
                  <option value="32kW">32kW</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Solar Panels
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={form.solar_panel_pcs}
                    onChange={(e) =>
                      setForm({ ...form, solar_panel_pcs: e.target.value })
                    }
                    className="block border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-1/2"
                    placeholder="pcs"
                  />
                  <select
                    value={form.solar_panel_wattage}
                    onChange={(e) =>
                      setForm({ ...form, solar_panel_wattage: e.target.value })
                    }
                    className="block border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-1/2"
                  >
                    <option value="">Wattage</option>
                    <option value="580W">580W</option>
                    <option value="600W">600W</option>
                    <option value="615W">615W</option>
                    <option value="620W">620W</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Battery
                </label>
                <div className="flex gap-2">
                  <select
                    value={form.battery_type}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        battery_type: value,
                        battery_qty: value === "None" ? "0" : prev.battery_qty,
                      }));
                    }}
                    className="block border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-2/3"
                  >
                    <option value="">Select Battery</option>
                    <option value="None">None</option>
                    <option value="24v 280Ah">24v 280Ah</option>
                    <option value="24v 314Ah">24v 314Ah</option>
                    <option value="48v 280Ah">48v 280Ah</option>
                    <option value="48v 314Ah">48v 314Ah</option>
                    <option value="51.2v 280Ah">51.2v 280Ah</option>
                    <option value="51.2v 314Ah">51.2v 314Ah</option>
                  </select>
                  <input
                    type="number"
                    min={form.battery_type === "None" ? "0" : "1"}
                    value={form.battery_qty}
                    onChange={(e) =>
                      setForm({ ...form, battery_qty: e.target.value })
                    }
                    className="block border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-1/3"
                    placeholder="Qty"
                    disabled={form.battery_type === "None"}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={form.contact}
                  onChange={(e) =>
                    setForm({ ...form, contact: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Facebook Name
                </label>
                <input
                  type="text"
                  value={form.facebook}
                  onChange={(e) =>
                    setForm({ ...form, facebook: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Visitation Date
                </label>
                <input
                  type="date"
                  value={form.visitation}
                  onChange={(e) =>
                    setForm({ ...form, visitation: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={2}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Amount
                </label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Custom Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
              Delete Record?
            </h3>
            <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this client record? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDeleteRecord}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteRecord}
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

export default ClientRecordsPage;
