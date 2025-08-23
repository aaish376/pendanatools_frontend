import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import { BsTrash } from "react-icons/bs";

// 🔹 Floating Input Component (supports textarea)
const FloatingInput = ({
  label,
  value,
  onChange,
  type = "text",
  name,
  multiline = false,
}) => {
  const id = name || label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="relative z-0 w-full mb-4 group">
      {multiline ? (
        <textarea
          id={id}
          value={value ?? ""}
          onChange={onChange}
          rows={3}
          className="peer block w-full px-2 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
          placeholder=" "
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          autoComplete="off"
          className="peer block w-full px-2 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
          placeholder=" "
        />
      )}
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 bg-white px-1 duration-300 transform -translate-y-4 scale-75 top-2 left-2 z-10 origin-[0]
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-gray-400
          peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
      >
        {label}
      </label>
    </div>
  );
};

export default function InvoiceMaker() {
  const [company, setCompany] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    email: "",
    phone: "",
    website: "",
    logo: null,
  });

  const [client, setClient] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    email: "",
    phone: "",
  });

  const [invoice, setInvoice] = useState({
    number: "INV-" + Math.floor(Math.random() * 100000),
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
  });

  const [items, setItems] = useState([
    { id: uuidv4(), description: "", qty: "1", rate: "0", amount: 0 },
  ]);

  const [tax, setTax] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState("");
  const [preview, setPreview] = useState(false);

  // ✅ Company field update
  const handleCompanyChange = (field, value) =>
    setCompany((prev) => ({ ...prev, [field]: value }));

  // ✅ Client field update
  const handleClientChange = (field, value) =>
    setClient((prev) => ({ ...prev, [field]: value }));

  // ✅ Invoice field update
  const handleInvoiceChange = (field, value) =>
    setInvoice((prev) => ({ ...prev, [field]: value }));

  // Items logic
  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              amount:
                (parseFloat(field === "qty" ? value : item.qty) || 0) *
                (parseFloat(field === "rate" ? value : item.rate) || 0),
            }
          : item
      )
    );
  };

  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { id: uuidv4(), description: "", qty: "1", rate: "0", amount: 0 },
    ]);

  const removeItem = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const subtotal = items.reduce(
    (sum, i) => sum + (parseFloat(i.amount) || 0),
    0
  );
  const taxRate = parseFloat(tax) || 0;
  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = parseFloat(discount) || 0;
  const total = subtotal - discountAmount + taxAmount;

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file)
      setCompany((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
  };

  // ✅ PDF Download with auto page-split
const downloadPDF = () => {
  const input = document.getElementById("invoicePreview");
  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Add page header
    pdf.setFontSize(10);
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" });
    pdf.text(`${timestamp} Generated using PenanaTools`, 10, 10, { align: "left" });
 

    // Add footer
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.text("This is a system generated invoice", pdfWidth / 2, pdfHeight - 10, { align: "center" });
    }

    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
    let heightLeft = imgHeight;
    let position = 20; // Start after header

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight - 20;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 20;
      pdf.addPage();
      pdf.text(`${timestamp} Generated using PenanaTools`, 10, 10, { align: "left" });
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
      pdf.text("This is a system generated invoice", pdfWidth / 2, pdfHeight - 10, { align: "center" });
    }

    pdf.save(`${invoice.number}.pdf`);
  });
};

  const InvoiceContent = () => (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ width: "30%", height: "30px" }}>
          {company.logo && <img src={company.logo} alt="Company Logo" style={{ height: "80px", width: "80px", objectFit: "contain" }} />}
        </div>
        <div style={{ width: "60%", textAlign: "right" }}>
          <p><strong>Invoice #:</strong> {invoice.number}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Due Date:</strong> {invoice.dueDate || "N/A"}</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ width: "45%" }}>
          <h2 className="font-bold">From</h2>
          <p>{company.name}</p>
          <p>
            {company.address}, {company.city}, {company.state}, {company.country} {company.zip}
          </p>
          <p>{company.email}</p>
          <p>{company.phone}</p>
        </div>
        <div style={{ width: "45%", textAlign: "right" }}>
          <h2 className="font-bold">To</h2>
          <p>{client.name}</p>
          <p>
            {client.address}, {client.city}, {client.state}, {client.country} {client.zip}
          </p>
          <p>{client.email}</p>
          <p>{client.phone}</p>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Qty</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rate</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ border: "1px solid #ddd" }}>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.description}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.qty}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>${parseFloat(item.rate || 0).toFixed(2)}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>${item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax ({tax}%): ${taxAmount.toFixed(2)}</p>
        <p>Discount: ${discountAmount.toFixed(2)}</p>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>
          Total: ${total.toFixed(2)}
        </h3>
      </div>
      {notes && (
        <div style={{ marginBottom: "20px" }}>
          <h2 className="font-bold">Notes:</h2>
          <p>{notes}</p>
        </div>
      )}
      {terms && (
        <div style={{ marginBottom: "20px" }}>
          <h2 className="font-bold">Terms & Conditions:</h2>
          <p>{terms}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl p-8">
        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">🧾 Invoice Maker</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setPreview(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition"
            >
              Preview Invoice
            </button>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Company & Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-blue-600 mb-2">🏢 Company Info</h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Company Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="block w-full text-sm"
              />
              {company.logo && (
                <img
                  src={company.logo}
                  alt="Logo"
                  className="mt-2 w-24 h-24 object-contain"
                />
              )}
            </div>

            <FloatingInput
              name="company-name"
              label="Company Name"
              value={company.name}
              onChange={(e) => handleCompanyChange("name", e.target.value)}
            />
            <FloatingInput
              name="company-address"
              label="Address"
              value={company.address}
              onChange={(e) => handleCompanyChange("address", e.target.value)}
            />
            <FloatingInput
              name="company-city"
              label="City"
              value={company.city}
              onChange={(e) => handleCompanyChange("city", e.target.value)}
            />
            <FloatingInput
              name="company-state"
              label="State"
              value={company.state}
              onChange={(e) => handleCompanyChange("state", e.target.value)}
            />
            <FloatingInput
              name="company-country"
              label="Country"
              value={company.country}
              onChange={(e) => handleCompanyChange("country", e.target.value)}
            />
            <FloatingInput
              name="company-zip"
              label="Zip Code"
              value={company.zip}
              onChange={(e) => handleCompanyChange("zip", e.target.value)}
            />
            <FloatingInput
              name="company-email"
              label="Email"
              value={company.email}
              onChange={(e) => handleCompanyChange("email", e.target.value)}
            />
            <FloatingInput
              name="company-phone"
              label="Phone"
              value={company.phone}
              onChange={(e) => handleCompanyChange("phone", e.target.value)}
            />
            <FloatingInput
              name="company-website"
              label="Website"
              value={company.website}
              onChange={(e) => handleCompanyChange("website", e.target.value)}
            />
          </div>

          {/* Client */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-green-600 mb-2">👤 Client Info</h2>
            <FloatingInput
              name="client-name"
              label="Client Name"
              value={client.name}
              onChange={(e) => handleClientChange("name", e.target.value)}
            />
            <FloatingInput
              name="client-address"
              label="Address"
              value={client.address}
              onChange={(e) => handleClientChange("address", e.target.value)}
            />
            <FloatingInput
              name="client-city"
              label="City"
              value={client.city}
              onChange={(e) => handleClientChange("city", e.target.value)}
            />
            <FloatingInput
              name="client-state"
              label="State"
              value={client.state}
              onChange={(e) => handleClientChange("state", e.target.value)}
            />
            <FloatingInput
              name="client-country"
              label="Country"
              value={client.country}
              onChange={(e) => handleClientChange("country", e.target.value)}
            />
            <FloatingInput
              name="client-zip"
              label="Zip Code"
              value={client.zip}
              onChange={(e) => handleClientChange("zip", e.target.value)}
            />
            <FloatingInput
              name="client-email"
              label="Email"
              value={client.email}
              onChange={(e) => handleClientChange("email", e.target.value)}
            />
            <FloatingInput
              name="client-phone"
              label="Phone"
              value={client.phone}
              onChange={(e) => handleClientChange("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Invoice Details */}
        <div className="mt-6 border p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-purple-600 mb-2">📑 Invoice Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <FloatingInput
              name="invoice-number"
              label="Invoice Number"
              value={invoice.number}
              onChange={(e) => handleInvoiceChange("number", e.target.value)}
            />
            <FloatingInput
              name="invoice-date"
              label="Invoice Date"
              type="date"
              value={invoice.date}
              onChange={(e) => handleInvoiceChange("date", e.target.value)}
            />
            <FloatingInput
              name="invoice-due-date"
              label="Due Date"
              type="date"
              value={invoice.dueDate}
              onChange={(e) => handleInvoiceChange("dueDate", e.target.value)}
            />
          </div>
        </div>

        {/* Items */}
        <div className="mt-6 border p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-orange-600">🛒 Invoice Items</h2>
            <button
              onClick={addItem}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition flex items-center"
            >
              + Add Item
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-2 font-semibold text-gray-600">
            <div>Description</div>
            <div>Qty</div>
            <div>Rate</div>
            <div className="text-right">Amount</div>
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 gap-2 mb-2 items-center"
            >
              <FloatingInput
                name={`item-desc-${item.id}`}
                label="Description"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(item.id, "description", e.target.value)
                }
              />
              <FloatingInput
                name={`item-qty-${item.id}`}
                label="Qty"
                type="number"
                value={item.qty}
                onChange={(e) =>
                  handleItemChange(item.id, "qty", e.target.value)
                }
              />
              <FloatingInput
                name={`item-rate-${item.id}`}
                label="Rate"
                type="number"
                value={item.rate}
                onChange={(e) =>
                  handleItemChange(item.id, "rate", e.target.value)
                }
              />
              <div className="text-right font-semibold flex items-center justify-end">
                ${item.amount.toFixed(2)}
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-3 text-red-500 hover:text-red-700"
                >
                  <BsTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tax & Discount */}
        <div className="mt-6 border p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-yellow-600 mb-2">💰 Tax & Discount</h2>
          <div className="grid grid-cols-2 gap-4">
            <FloatingInput
              name="tax"
              label="Tax %"
              type="number"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            />
            <FloatingInput
              name="discount"
              label="Discount $"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="mt-4 text-right">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax ({tax}%): ${taxAmount.toFixed(2)}</p>
            <p>Discount: ${discountAmount.toFixed(2)}</p>
            <h3 className="text-xl font-bold text-blue-600">
              Total: ${total.toFixed(2)}
            </h3>
          </div>
        </div>

        {/* Notes & Terms */}
        <div className="mt-6 border p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-gray-700 mb-2">📝 Additional Info</h2>
          <FloatingInput
            name="notes"
            label="Notes"
            multiline
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <FloatingInput
            name="terms"
            label="Terms & Conditions"
            multiline
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <InvoiceContent />
            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setPreview(false)}
                className="px-4 py-2 rounded-lg bg-gray-500 text-white shadow hover:bg-gray-600 transition"
              >
                Close
              </button>
              <button
                onClick={downloadPDF}
                className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden preview for PDF capture */}
      <div
        id="invoicePreview"
        style={{ position: "absolute", left: "-9999px", width: "48rem" }}
        className="bg-white p-6 rounded-lg shadow-2xl"
      >
        <InvoiceContent />
      </div>
    </div>
  );
}