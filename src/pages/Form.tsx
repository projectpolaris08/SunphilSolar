import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CreatableSelect from "react-select/creatable";

const defaultIntro = `We would like to extend our gratitude for choosing and trusting our company in providing you the solar energy set up for your home / property. We guarantee you that we value your business and investment.\n\nPlease see below the cost proposal for the 8kW Hybrid Solar Set up for your review and approval.`;
const defaultSystemDesc = `The system works as Hybrid / On grid / Off Grid Set up. During the day the primary source of supply will be Solar Panel - Battery, Meralco will serve as a backup if ever the production of both Solar and Battery is not enough. During night time the primary source will be the Battery and Meralco will serve as a backup once the Battery reaches its indicated state of charge. During Blackout Battery will serve as the primary source of electricity to the house.`;
const defaultMaterialNote = `For Material Cost, Delivery and Installation (Solar Panels, Accessories, Solar Inverter, Hardware materials for solar and Installation) will have a total amount of Php 375,000.00`;
const defaultWarranty = `Warranty:\nFor Solar Panels - 12 years\nFor Solar Inverter - 5 years\nFor Workmanship - 2 years warranty\nFor Battery - 3 years warranty`;
const defaultTerms = `1. 30% Down Payment. 50% upon installation.\n2. Approximately 2-4 days project completion. (We will do procurement of materials simultaneously)\n   • 1 day processing of procurement of solar materials needed.\n   • 1 - 3 days assembling and testing of set up before releasing for shipping or pick up.`;
const defaultPreparedBy = "Admin Jayar";

const defaultContactInfo = (
  <div style={{ fontSize: 12, color: "#888", marginTop: 24 }}>
    <div>sunphilsolar</div>
    <div>Solar Power Installation Services</div>
    <div>28C, North Fairview phase 8 Subdivision, Blk 85 Yen, Quezon City</div>
    <div>09606921760</div>
    <div>sunphilsolarpowerinstallation@gmail.com</div>
  </div>
);

// Type for row fields
type RowField = "description" | "qty" | "unit" | "total";

function Form() {
  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");
  const [subject, setSubject] = useState("");
  const [intro, setIntro] = useState(defaultIntro);
  const [systemDesc, setSystemDesc] = useState(defaultSystemDesc);
  const [rows, setRows] = useState([
    { description: "", qty: "", unit: "", total: "" },
  ]);
  const [discount, setDiscount] = useState("");
  const [materialNote, setMaterialNote] = useState(defaultMaterialNote);
  const [warranty, setWarranty] = useState(defaultWarranty);
  const [terms, setTerms] = useState(defaultTerms);
  const [preparedBy, setPreparedBy] = useState(defaultPreparedBy);
  const inverterOptions = [
    "6kW Deye Hybrid",
    "8kW Deye Hybrid",
    "12kW Deye Hybrid",
    "16kW Deye Hybrid",
    "24kW Deye Hybrid",
    "32kW Deye Hybrid",
    "36kW Deye Hybrid",
  ];
  const [selectedInverter, setSelectedInverter] = useState("");
  const descriptionOptions = [
    // Inverters
    "6kW Deye Hybrid",
    "8kW Deye Hybrid",
    "12kW Deye Hybrid",
    "16kW Deye Hybrid",
    "24kW Deye Hybrid",
    "32kW Deye Hybrid",
    "36kW Deye Hybrid",
    "18kW Deye Hybrid",
    // Batteries
    "12v 280Ah",
    "12v 314Ah",
    "24v 280Ah",
    "24v 314Ah",
    "48v 280Ah",
    "48v 314Ah",
    "51.2v 280Ah",
    "51.2v 314Ah",
    // Solar Panels
    "580W Canadian Bifacial Solar Panel",
    "615W Canadian Bifacial Solar Panel",
    "620 AE Bifacial Solar Panel",
    // Custom
    "Custom",
  ];

  // Calculate total
  const total =
    rows.reduce((sum, row) => sum + (parseFloat(row.total) || 0), 0) -
    (parseFloat(discount) || 0);

  // Auto-update Material Cost Note when rows or total change
  useEffect(() => {
    const includedItems = rows
      .map((row) => row.description)
      .filter((desc) => desc && desc.trim() !== "")
      .join(", ");
    const formattedTotal = `Php ${total.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`;
    setMaterialNote(
      `For Material Cost, Delivery and Installation (${includedItems}) will have a total amount of ${formattedTotal}`
    );
  }, [rows, total]);

  const handleRowChange = (idx: number, field: RowField, value: string) => {
    const newRows = [...rows];
    newRows[idx][field] = value;
    // Auto-calc total if qty and unit are numbers
    if (field === "qty" || field === "unit") {
      const qty = parseFloat(newRows[idx].qty) || 0;
      const unit = parseFloat(newRows[idx].unit) || 0;
      newRows[idx].total = qty && unit ? (qty * unit).toFixed(2) : "";
    }
    setRows(newRows);
  };

  const addRow = () =>
    setRows([...rows, { description: "", qty: "", unit: "", total: "" }]);
  const removeRow = (idx: number) => setRows(rows.filter((_, i) => i !== idx));

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 18;
    try {
      doc.addImage(logoBase64, "PNG", 14, 8, 32, 16);
      y = 26; // adjust y for next line if logo is present
    } catch (e) {
      // fallback: just text if image fails
      doc.setFontSize(18);
      doc.text("sunphilsolar", 14, y);
      y += 8;
    }
    doc.setFontSize(11);
    doc.text("Solar Power Installation Services", 14, y);
    y += 7;
    doc.setFontSize(10);
    doc.text(
      "28C, North Fairview phase 8 Subdivision, Blk 85 Yen, Quezon City",
      14,
      y
    );
    y += 5;
    doc.text("09606921760", 14, y + 5);
    y += 5;
    doc.text("sunphilsolarpowerinstallation@gmail.com", 14, y + 5);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Solar Energy System Quotation", 105, y, { align: "center" });
    y += 8;
    doc.setFontSize(10);
    doc.text(`Attention: ${client}`, 14, y);
    y += 7;
    doc.text(`Project Address: ${address}`, 14, y);
    y += 7;
    doc.text(`Subject: ${subject}`, 14, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Introduction/Message:", 14, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(doc.splitTextToSize(intro, 180), 14, y);
    y += doc.getTextDimensions(doc.splitTextToSize(intro, 180)).h + 2;

    doc.setFont("helvetica", "bold");
    doc.text("System Description:", 14, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(doc.splitTextToSize(systemDesc, 180), 14, y);
    y += doc.getTextDimensions(doc.splitTextToSize(systemDesc, 180)).h + 2;

    // Quotation Table
    doc.setFont("helvetica", "bold");
    doc.text("Quotation Table:", 14, y);
    doc.setFont("helvetica", "normal");
    y += 4;
    autoTable(doc, {
      startY: y,
      head: [["#", "Description", "Qty", "Unit Amount", "Total Amount"]],
      body: rows.map((row, idx) => [
        idx + 1,
        row.description,
        row.qty,
        row.unit,
        row.total,
      ]),
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 6;

    doc.setFont("helvetica", "bold");
    doc.text("Discount:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(
      discount
        ? `₱ ${parseFloat(discount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`
        : "-",
      40,
      y
    );
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.text("Total:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(
      `₱ ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      40,
      y
    );
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Material Cost Note:", 14, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(doc.splitTextToSize(materialNote, 180), 14, y);
    y += doc.getTextDimensions(doc.splitTextToSize(materialNote, 180)).h + 2;

    doc.setFont("helvetica", "bold");
    doc.text("Warranty:", 14, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(doc.splitTextToSize(warranty, 180), 14, y);
    y += doc.getTextDimensions(doc.splitTextToSize(warranty, 180)).h + 2;

    doc.setFont("helvetica", "bold");
    doc.text("Terms & Conditions:", 14, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(doc.splitTextToSize(terms, 180), 14, y);
    y += doc.getTextDimensions(doc.splitTextToSize(terms, 180)).h + 2;

    doc.setFont("helvetica", "bold");
    doc.text("Prepared by:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(preparedBy, 40, y);

    doc.save("quotation.pdf");
  };

  const handleInverterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inverter = e.target.value;
    setSelectedInverter(inverter);
    setSubject(`${inverter} System`);
    setIntro(
      `Please see below the cost proposal for the ${inverter} Solar Set up for your review and approval.`
    );
  };

  // TODO: Replace with your real logo's base64
  const logoBase64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC...";

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded shadow p-6 my-8 text-gray-900 dark:text-gray-100">
      <div className="flex items-start mb-6">
        <img
          src="/images/sunphil2.jpg"
          alt="Company Logo"
          className="h-16 mb-2"
        />
      </div>
      <h2 className="text-xl font-bold mb-2">Solar Energy System Quotation</h2>
      <div className="mb-4">
        <label className="block font-semibold">Attention:</label>
        <input
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Client Name"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Project Address:</label>
        <input
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Project Address"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Inverter:</label>
        <select
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 mb-2"
          value={selectedInverter}
          onChange={handleInverterChange}
        >
          <option value="">Select Inverter</option>
          {inverterOptions.map((inv) => (
            <option key={inv} value={inv}>
              {inv}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Subject:</label>
        <input
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Introduction/Message:</label>
        <textarea
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          rows={3}
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">System Description:</label>
        <textarea
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          rows={3}
          value={systemDesc}
          onChange={(e) => setSystemDesc(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Quotation Table:</label>
        <table className="w-full border mb-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Unit Amount</th>
              <th className="border px-2 py-1">Total Amount</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1 text-center">{idx + 1}</td>
                <td className="border px-2 py-1">
                  <CreatableSelect
                    classNamePrefix="react-select"
                    isClearable
                    options={descriptionOptions
                      .filter((opt) => opt !== "Custom")
                      .map((opt) => ({ label: opt, value: opt }))}
                    value={
                      row.description
                        ? { label: row.description, value: row.description }
                        : null
                    }
                    onChange={(option) =>
                      handleRowChange(
                        idx,
                        "description",
                        option ? option.value : ""
                      )
                    }
                    onCreateOption={(inputValue) =>
                      handleRowChange(idx, "description", inputValue)
                    }
                    placeholder="Select or type..."
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused
                          ? document.body.classList.contains("dark")
                            ? "#1f2937"
                            : "#fff"
                          : document.body.classList.contains("dark")
                          ? "#1f2937"
                          : "#fff",
                        color: document.body.classList.contains("dark")
                          ? "#f3f4f6"
                          : "#111827",
                        borderColor: "#374151",
                        minHeight: 32,
                        boxShadow: "none",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: document.body.classList.contains(
                          "dark"
                        )
                          ? "#1f2937"
                          : "#fff",
                        color: document.body.classList.contains("dark")
                          ? "#f3f4f6"
                          : "#111827",
                        zIndex: 9999,
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: document.body.classList.contains("dark")
                          ? "#f3f4f6"
                          : "#111827",
                      }),
                      input: (base) => ({
                        ...base,
                        color: document.body.classList.contains("dark")
                          ? "#f3f4f6"
                          : "#111827",
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused
                          ? document.body.classList.contains("dark")
                            ? "#374151"
                            : "#e5e7eb"
                          : document.body.classList.contains("dark")
                          ? "#1f2937"
                          : "#fff",
                        color: document.body.classList.contains("dark")
                          ? "#f3f4f6"
                          : "#111827",
                      }),
                    }}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    className="w-16 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                    type="number"
                    value={row.qty}
                    onChange={(e) =>
                      handleRowChange(idx, "qty", e.target.value)
                    }
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    className="w-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                    type="number"
                    value={row.unit}
                    onChange={(e) =>
                      handleRowChange(idx, "unit", e.target.value)
                    }
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    className="w-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                    type="number"
                    value={row.total}
                    readOnly
                  />
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    className="text-red-500"
                    onClick={() => removeRow(idx)}
                    disabled={rows.length === 1}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded dark:bg-blue-700"
          onClick={addRow}
        >
          + Add Row
        </button>
      </div>
      <div className="mb-4 flex gap-4 items-center">
        <label className="font-semibold">Discount:</label>
        <input
          className="border rounded px-2 py-1 w-32 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>
      <div className="mb-4 flex gap-4 items-center">
        <label className="font-semibold">Total:</label>
        <span className="text-lg font-bold">
          Php {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Material Cost Note:</label>
        <textarea
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          rows={2}
          value={materialNote}
          onChange={(e) => setMaterialNote(e.target.value)}
        />
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          This note auto-updates based on the Quotation Table, but you can still
          edit it.
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Warranty:</label>
        <textarea
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          rows={2}
          value={warranty}
          onChange={(e) => setWarranty(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Terms & Conditions:</label>
        <textarea
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          rows={3}
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Prepared by:</label>
        <input
          className="border rounded px-3 py-1 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          value={preparedBy}
          onChange={(e) => setPreparedBy(e.target.value)}
        />
      </div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded dark:bg-green-700"
          onClick={handleDownloadPDF}
          type="button"
        >
          Download as PDF
        </button>
      </div>
      <div className="border-t pt-4 mt-6 text-sm text-gray-600 dark:text-gray-300">
        {defaultContactInfo}
      </div>
    </div>
  );
}

export default Form;
