import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../lib/supabaseClient";

const expenseCategories = [
  "Equipment & Materials",
  "Labor & Subcontracting",
  "Permits & Regulatory Fees",
  "Transportation & Logistics",
  "Office & Administrative",
  "Sales & Marketing",
  "Maintenance & Service",
  "Training & Development",
  "Financing & Interest",
  "Miscellaneous",
];

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: undefined as number | undefined,
    date: "",
    category: expenseCategories[0],
    amount: "",
    description: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState<number | null>(null);

  // Fetch expenses from Supabase
  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false });
      if (error) {
        setError("Failed to fetch expenses: " + error.message);
      } else {
        setExpenses(data || []);
      }
      setLoading(false);
    };
    fetchExpenses();
  }, []);

  // Summary calculations
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const thisMonthExpenses = expenses
    .filter((e) => (e.date || "").startsWith(thisMonth))
    .reduce((sum, e) => sum + Number(e.amount), 0);

  // Group expenses by month for the chart (progressive, dynamic)
  const currentYear = new Date().getFullYear();
  // Find all months with data in the current year
  const monthsWithData = expenses
    .filter((e) => new Date(e.date).getFullYear() === currentYear)
    .map((e) => new Date(e.date).getMonth());
  const maxMonth =
    monthsWithData.length > 0
      ? Math.max(...monthsWithData)
      : new Date().getMonth();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const months = Array.from({ length: maxMonth + 1 }, (_, i) => monthNames[i]);
  const monthlyData = {} as { [key: string]: number };
  expenses.forEach((e) => {
    const d = new Date(e.date);
    const month = d.getMonth();
    const year = d.getFullYear();
    if (year === currentYear) {
      const key = `${monthNames[month]} ${currentYear}`;
      monthlyData[key] = (monthlyData[key] || 0) + Number(e.amount);
    }
  });
  const monthlyExpensesData = months.map((m) => {
    const key = `${m} ${currentYear}`;
    return { month: key, total: monthlyData[key] || 0 };
  });

  // Filtered expenses
  const filteredExpenses = filter
    ? expenses.filter((e) => e.category === filter)
    : expenses;

  // Handlers
  const openModal = (expense?: any) => {
    if (expense) {
      setForm({
        id: expense.id,
        date: expense.date,
        category: expense.category,
        amount: expense.amount.toString(),
        description: expense.description,
      });
      setEditId(expense.id);
    } else {
      setForm({
        id: undefined,
        date: "",
        category: expenseCategories[0],
        amount: "",
        description: "",
      });
      setEditId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({
      id: undefined,
      date: "",
      category: expenseCategories[0],
      amount: "",
      description: "",
    });
    setEditId(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.date || !form.amount || !form.category) return;
    if (editId) {
      // Update
      const { error } = await supabase
        .from("expenses")
        .update({
          date: form.date,
          category: form.category,
          amount: Number(form.amount),
          description: form.description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editId);
      if (error) {
        setError("Failed to update expense: " + error.message);
        return;
      }
      setExpenses(
        expenses.map((e) =>
          e.id === editId ? { ...e, ...form, amount: Number(form.amount) } : e
        )
      );
      // Log admin activity for update
      await supabase.from("admin_activity").insert([
        {
          module: "expenses",
          record_id: editId,
          action: "updated",
          description: `Updated expense: ₱${form.amount} (${form.category}) on ${form.date}`,
          actor: null,
          timestamp: new Date().toISOString(),
        },
      ]);
    } else {
      // Insert
      const { data, error } = await supabase
        .from("expenses")
        .insert([
          {
            date: form.date,
            category: form.category,
            amount: Number(form.amount),
            description: form.description,
          },
        ])
        .select();
      if (error) {
        setError("Failed to add expense: " + error.message);
        return;
      }
      if (data && data[0]) {
        setExpenses([data[0], ...expenses]);
        // Log admin activity for create
        await supabase.from("admin_activity").insert([
          {
            module: "expenses",
            record_id: data[0].id,
            action: "created",
            description: `Added expense: ₱${form.amount} (${form.category}) on ${form.date}`,
            actor: null,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setDeleteExpenseId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteExpense = async () => {
    if (!deleteExpenseId) return;
    setError("");
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", deleteExpenseId);
    if (error) {
      setError("Failed to delete expense: " + error.message);
      return;
    }
    setExpenses(expenses.filter((e) => e.id !== deleteExpenseId));
    // Log admin activity for delete
    await supabase.from("admin_activity").insert([
      {
        module: "expenses",
        record_id: deleteExpenseId,
        action: "deleted",
        description: `Deleted expense record (${deleteExpenseId})`,
        actor: null,
        timestamp: new Date().toISOString(),
      },
    ]);
    setShowDeleteModal(false);
    setDeleteExpenseId(null);
  };

  const cancelDeleteExpense = () => {
    setShowDeleteModal(false);
    setDeleteExpenseId(null);
  };

  return (
    <div className="p-2 sm:p-4 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1"
          aria-label="Back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">Expenses Management</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
          <div className="p-2 bg-blue-500 rounded-lg">
            <span role="img" aria-label="Total">
              💸
            </span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total Expenses
            </p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
              ₱{totalExpenses.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-green-50 dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
          <div className="p-2 bg-green-500 rounded-lg">
            <span role="img" aria-label="Month">
              📅
            </span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              This Month
            </p>
            <p className="text-2xl font-bold text-green-900 dark:text-green-200">
              ₱{thisMonthExpenses.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Expenses Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Monthly Expenses
        </h3>
        <div className="h-72 min-w-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyExpensesData}>
              <defs>
                <linearGradient
                  id="expensesBarGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#d53369" />
                  <stop offset="100%" stopColor="#daae51" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" height={40} tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) =>
                  value >= 1_000_000
                    ? `₱${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
                    : `₱${(value / 1000).toFixed(0)}k`
                }
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  background: "#111",
                  color: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 700,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  opacity: 1,
                  padding: 16,
                }}
                labelStyle={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 16,
                }}
                itemStyle={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                }}
                formatter={(value) => [
                  `₱${value.toLocaleString()}`,
                  "Expenses",
                ]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar
                dataKey="total"
                fill="url(#expensesBarGradient)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Error/Loading States */}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading ? (
        <div className="text-center py-8 text-gray-500">
          Loading expenses...
        </div>
      ) : (
        <>
          {/* Filter and Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <select
              className="border rounded-lg px-3 py-2 text-gray-700 dark:bg-gray-800 dark:text-gray-100"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {expenseCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow"
              onClick={() => openModal()}
            >
              + Add Expense
            </button>
          </div>

          {/* Expenses Table */}
          <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md w-full">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-right">Amount (₱)</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400">
                      No expenses found.
                    </td>
                  </tr>
                ) : (
                  filteredExpenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b last:border-b-0 hover:bg-blue-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-4 py-2">{expense.date}</td>
                      <td className="px-4 py-2">{expense.category}</td>
                      <td className="px-4 py-2">{expense.description}</td>
                      <td className="px-4 py-2 text-right">
                        {Number(expense.amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 mr-2"
                          onClick={() => openModal(expense)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="inline-flex items-center text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(expense.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Add/Edit Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md relative border border-gray-200 dark:border-gray-700">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {editId ? "Edit Expense" : "Add Expense"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleFormChange}
                  className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  {expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                  Amount (₱)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleFormChange}
                  className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  maxLength={100}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {editId ? "Update Expense" : "Add Expense"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Expense Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
              Delete Expense?
            </h3>
            <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this expense? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDeleteExpense}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteExpense}
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

export default ExpensesPage;
