import React, { useState } from "react";
import dayjs from "dayjs";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [ageData, setAgeData] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = dayjs();
    const birth = dayjs(birthDate);

    if (birth.isAfter(today)) return alert("Birthdate cannot be in the future!");

    // Years, months, days
    const years = today.diff(birth, "year");
    const months = today.diff(birth.add(years, "year"), "month");
    const days = today.diff(birth.add(years, "year").add(months, "month"), "day");

    // Total time units
    const totalDays = today.diff(birth, "day");
    const totalHours = today.diff(birth, "hour");
    const totalMinutes = today.diff(birth, "minute");
    const totalSeconds = today.diff(birth, "second");

    // Next Birthday
    let nextBirthday = birth.add(years + 1, "year");
    const daysToGo = nextBirthday.diff(today, "day");

    // Extra fun facts
    const weeksLived = Math.floor(totalDays / 7);
    const heartBeats = Math.floor(totalMinutes * 72 / 60); // avg 72 bpm
    const breaths = Math.floor(totalMinutes * 16 / 60); // avg 16 breaths/min
    const newYears = years; // new years celebrations experienced
    const hoursSlept = Math.floor(totalHours / 3); // assuming ~8 hrs/day

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToGo,
      nextAge: years + 1,
      weeksLived,
      heartBeats,
      breaths,
      newYears,
      hoursSlept,
    });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center my-20 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Age Calculator</h1>

        {/* Date Input */}
        <div className="flex gap-3 justify-center mb-6">
          <input
            type="date"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={calculateAge}
          >
            Calculate Age
          </button>
        </div>

        {ageData && (
          <>
            {/* Current Age */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-xl text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Your Current Age</h2>
              <div className="flex justify-center gap-8 text-2xl font-bold">
                <div>
                  <p className="text-green-600">{ageData.years}</p>
                  <p className="text-sm">Years</p>
                </div>
                <div>
                  <p className="text-blue-600">{ageData.months}</p>
                  <p className="text-sm">Months</p>
                </div>
                <div>
                  <p className="text-purple-600">{ageData.days}</p>
                  <p className="text-sm">Days</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatBox label="Total Days" value={ageData.totalDays} />
              <StatBox label="Total Hours" value={ageData.totalHours} />
              <StatBox label="Total Minutes" value={ageData.totalMinutes} />
              <StatBox label="Total Seconds" value={ageData.totalSeconds} />
            </div>

            {/* Next Birthday */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">🎂 Next Birthday</h2>
              <div className="flex justify-center gap-8 text-2xl font-bold">
                <div>
                  <p className="text-pink-600">{ageData.daysToGo}</p>
                  <p className="text-sm">Days to go</p>
                </div>
                <div>
                  <p className="text-purple-600">{ageData.nextAge}</p>
                  <p className="text-sm">Years old</p>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="flex flex-wrap gap-3 justify-center">
              <FunFact label={`You've lived ${ageData.weeksLived} weeks`} icon="⏱️" />
              <FunFact label={`Your heart has beaten ~${ageData.heartBeats.toLocaleString()} times`} icon="💓" />
              <FunFact label={`You've taken ~${ageData.breaths.toLocaleString()} breaths`} icon="🌬️" />
              <FunFact label={`You've experienced ${ageData.newYears} New Year's celebrations`} icon="🎉" />
              <FunFact label={`You've slept ~${ageData.hoursSlept.toLocaleString()} hours`} icon="🛌" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="border rounded-lg p-4 text-center shadow-sm bg-white">
      <p className="text-lg font-bold">{value.toLocaleString()}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function FunFact({ label, icon }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm text-sm font-medium">
      <span>{icon}</span>
      {label}
    </div>
  );
}



//---------------


// import React, { useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { v4 as uuidv4 } from "uuid";

// // 🔹 Floating Input Component (supports textarea)
// const FloatingInput = ({
//   label,
//   value,
//   onChange,
//   type = "text",
//   name,
//   multiline = false,
// }) => {
//   const id = name || label.replace(/\s+/g, "-").toLowerCase();
//   return (
//     <div className="relative z-0 w-full mb-4 group">
//       {multiline ? (
//         <textarea
//           id={id}
//           value={value ?? ""}
//           onChange={onChange}
//           rows={3}
//           className="peer block w-full px-2 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
//           placeholder=" "
//         />
//       ) : (
//         <input
//           id={id}
//           type={type}
//           value={value ?? ""}
//           onChange={onChange}
//           autoComplete="off"
//           className="peer block w-full px-2 pt-5 pb-2 text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
//           placeholder=" "
//         />
//       )}
//       <label
//         htmlFor={id}
//         className="absolute text-sm text-gray-500 bg-white px-1 duration-300 transform -translate-y-4 scale-75 top-2 left-2 z-10 origin-[0]
//           peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-gray-400
//           peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
//       >
//         {label}
//       </label>
//     </div>
//   );
// };

// export default function InvoiceMaker() {
//   const [company, setCompany] = useState({
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     zip: "",
//     email: "",
//     phone: "",
//     website: "",
//     logo: null,
//   });

//   const [client, setClient] = useState({
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     zip: "",
//     email: "",
//     phone: "",
//   });

//   const [invoice, setInvoice] = useState({
//     number: "INV-" + Math.floor(Math.random() * 100000),
//     date: new Date().toISOString().split("T")[0],
//     dueDate: "",
//     po: "",
//   });

//   const [items, setItems] = useState([
//     { id: uuidv4(), description: "", qty: "1", rate: "0", amount: 0 },
//   ]);

//   const [tax, setTax] = useState("0");
//   const [discount, setDiscount] = useState("0");
//   const [notes, setNotes] = useState("");
//   const [terms, setTerms] = useState("");
//   const [preview, setPreview] = useState(false);

//   // ✅ Company field update
//   const handleCompanyChange = (field, value) =>
//     setCompany((prev) => ({ ...prev, [field]: value }));

//   // ✅ Client field update
//   const handleClientChange = (field, value) =>
//     setClient((prev) => ({ ...prev, [field]: value }));

//   // ✅ Invoice field update
//   const handleInvoiceChange = (field, value) =>
//     setInvoice((prev) => ({ ...prev, [field]: value }));

//   // Items logic
//   const handleItemChange = (id, field, value) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               [field]: value,
//               amount:
//                 (parseFloat(field === "qty" ? value : item.qty) || 0) *
//                 (parseFloat(field === "rate" ? value : item.rate) || 0),
//             }
//           : item
//       )
//     );
//   };

//   const addItem = () =>
//     setItems((prev) => [
//       ...prev,
//       { id: uuidv4(), description: "", qty: "1", rate: "0", amount: 0 },
//     ]);

//   const removeItem = (id) =>
//     setItems((prev) => prev.filter((item) => item.id !== id));

//   const subtotal = items.reduce(
//     (sum, i) => sum + (parseFloat(i.amount) || 0),
//     0
//   );
//   const total =
//     subtotal -
//     (parseFloat(discount) || 0) +
//     (subtotal * (parseFloat(tax) || 0)) / 100;

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file)
//       setCompany((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
//   };

//   // ✅ PDF Download with auto page-split
//   const downloadPDF = () => {
//     const input = document.getElementById("invoicePreview");
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       const imgProps = pdf.getImageProperties(imgData);
//       const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
//       heightLeft -= pdfHeight;

//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
//         heightLeft -= pdfHeight;
//       }

//       pdf.save(`${invoice.number}.pdf`);
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl p-8">
//         {/* Title */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-blue-600">🧾 Invoice Maker</h1>
//           <button
//             onClick={() => setPreview(true)}
//             className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition"
//           >
//             Preview Invoice
//           </button>
//         </div>

//         {/* Company & Client Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Company */}
//           <div className="border p-4 rounded-lg shadow-sm">
//             <h2 className="font-bold text-blue-600 mb-2">🏢 Company Info</h2>

//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-600 mb-1">
//                 Company Logo
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoUpload}
//                 className="block w-full text-sm"
//               />
//               {company.logo && (
//                 <img
//                   src={company.logo}
//                   alt="Logo"
//                   className="mt-2 w-24 h-24 object-contain"
//                 />
//               )}
//             </div>

//             <FloatingInput
//               name="company-name"
//               label="Company Name"
//               value={company.name}
//               onChange={(e) => handleCompanyChange("name", e.target.value)}
//             />
//             <FloatingInput
//               name="company-address"
//               label="Address"
//               value={company.address}
//               onChange={(e) => handleCompanyChange("address", e.target.value)}
//             />
//             <FloatingInput
//               name="company-city"
//               label="City"
//               value={company.city}
//               onChange={(e) => handleCompanyChange("city", e.target.value)}
//             />
//             <FloatingInput
//               name="company-state"
//               label="State"
//               value={company.state}
//               onChange={(e) => handleCompanyChange("state", e.target.value)}
//             />
//             <FloatingInput
//               name="company-country"
//               label="Country"
//               value={company.country}
//               onChange={(e) => handleCompanyChange("country", e.target.value)}
//             />
//             <FloatingInput
//               name="company-zip"
//               label="Zip Code"
//               value={company.zip}
//               onChange={(e) => handleCompanyChange("zip", e.target.value)}
//             />
//             <FloatingInput
//               name="company-email"
//               label="Email"
//               value={company.email}
//               onChange={(e) => handleCompanyChange("email", e.target.value)}
//             />
//             <FloatingInput
//               name="company-phone"
//               label="Phone"
//               value={company.phone}
//               onChange={(e) => handleCompanyChange("phone", e.target.value)}
//             />
//             <FloatingInput
//               name="company-website"
//               label="Website"
//               value={company.website}
//               onChange={(e) => handleCompanyChange("website", e.target.value)}
//             />
//           </div>

//           {/* Client */}
//           <div className="border p-4 rounded-lg shadow-sm">
//             <h2 className="font-bold text-green-600 mb-2">👤 Client Info</h2>
//             <FloatingInput
//               name="client-name"
//               label="Client Name"
//               value={client.name}
//               onChange={(e) => handleClientChange("name", e.target.value)}
//             />
//             <FloatingInput
//               name="client-address"
//               label="Address"
//               value={client.address}
//               onChange={(e) => handleClientChange("address", e.target.value)}
//             />
//             <FloatingInput
//               name="client-city"
//               label="City"
//               value={client.city}
//               onChange={(e) => handleClientChange("city", e.target.value)}
//             />
//             <FloatingInput
//               name="client-state"
//               label="State"
//               value={client.state}
//               onChange={(e) => handleClientChange("state", e.target.value)}
//             />
//             <FloatingInput
//               name="client-country"
//               label="Country"
//               value={client.country}
//               onChange={(e) => handleClientChange("country", e.target.value)}
//             />
//             <FloatingInput
//               name="client-zip"
//               label="Zip Code"
//               value={client.zip}
//               onChange={(e) => handleClientChange("zip", e.target.value)}
//             />
//             <FloatingInput
//               name="client-email"
//               label="Email"
//               value={client.email}
//               onChange={(e) => handleClientChange("email", e.target.value)}
//             />
//             <FloatingInput
//               name="client-phone"
//               label="Phone"
//               value={client.phone}
//               onChange={(e) => handleClientChange("phone", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Invoice Details */}
//         <div className="mt-6 border p-4 rounded-lg shadow-sm">
//           <h2 className="font-bold text-purple-600 mb-2">📑 Invoice Details</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <FloatingInput
//               name="invoice-number"
//               label="Invoice Number"
//               value={invoice.number}
//               onChange={(e) => handleInvoiceChange("number", e.target.value)}
//             />
//             <FloatingInput
//               name="invoice-po"
//               label="PO Number"
//               value={invoice.po}
//               onChange={(e) => handleInvoiceChange("po", e.target.value)}
//             />
//             <FloatingInput
//               name="invoice-date"
//               label="Invoice Date"
//               type="date"
//               value={invoice.date}
//               onChange={(e) => handleInvoiceChange("date", e.target.value)}
//             />
//             <FloatingInput
//               name="invoice-due-date"
//               label="Due Date"
//               type="date"
//               value={invoice.dueDate}
//               onChange={(e) => handleInvoiceChange("dueDate", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Items */}
//         <div className="mt-6 border p-4 rounded-lg shadow-sm">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="font-bold text-orange-600">🛒 Invoice Items</h2>
//             <button
//               onClick={addItem}
//               className="px-3 py-1 bg-orange-600 text-white rounded shadow hover:bg-orange-700"
//             >
//               + Add Item
//             </button>
//           </div>
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="grid grid-cols-4 gap-2 mb-2 items-center"
//             >
//               <FloatingInput
//                 name={`item-desc-${item.id}`}
//                 label="Description"
//                 value={item.description}
//                 onChange={(e) =>
//                   handleItemChange(item.id, "description", e.target.value)
//                 }
//               />
//               <FloatingInput
//                 name={`item-qty-${item.id}`}
//                 label="Qty"
//                 type="number"
//                 value={item.qty}
//                 onChange={(e) =>
//                   handleItemChange(item.id, "qty", e.target.value)
//                 }
//               />
//               <FloatingInput
//                 name={`item-rate-${item.id}`}
//                 label="Rate"
//                 type="number"
//                 value={item.rate}
//                 onChange={(e) =>
//                   handleItemChange(item.id, "rate", e.target.value)
//                 }
//               />
//               <div className="col-span-4 text-right font-semibold">
//                 ${item.amount.toFixed(2)}
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="ml-3 text-red-500 hover:text-red-700"
//                 >
//                   ❌
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Tax & Discount */}
//         <div className="mt-6 border p-4 rounded-lg shadow-sm">
//           <h2 className="font-bold text-yellow-600 mb-2">💰 Tax & Discount</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <FloatingInput
//               name="tax"
//               label="Tax %"
//               type="number"
//               value={tax}
//               onChange={(e) => setTax(e.target.value)}
//             />
//             <FloatingInput
//               name="discount"
//               label="Discount $"
//               type="number"
//               value={discount}
//               onChange={(e) => setDiscount(e.target.value)}
//             />
//           </div>
//           <div className="mt-4 text-right">
//             <p>Subtotal: ${subtotal.toFixed(2)}</p>
//             <p>Tax: {tax}%</p>
//             <p>Discount: ${discount}</p>
//             <h3 className="text-xl font-bold text-blue-600">
//               Total: ${total.toFixed(2)}
//             </h3>
//           </div>
//         </div>

//         {/* Notes & Terms */}
//         <div className="mt-6 border p-4 rounded-lg shadow-sm">
//           <h2 className="font-bold text-gray-700 mb-2">📝 Additional Info</h2>
//           <FloatingInput
//             name="notes"
//             label="Notes"
//             multiline
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//           />
//           <FloatingInput
//             name="terms"
//             label="Terms & Conditions"
//             multiline
//             value={terms}
//             onChange={(e) => setTerms(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Preview Modal */}
//       {preview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div
//             id="invoicePreview"
//             className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl"
//           >
//             {company.logo && (
//               <div className="flex justify-center mb-4">
//                 <img
//                   src={company.logo}
//                   alt="Company Logo"
//                   className="h-20 object-contain"
//                 />
//               </div>
//             )}
//             <h1 className="text-2xl font-bold mb-4 text-center">
//               INVOICE {invoice.number}
//             </h1>
//             <div className="grid grid-cols-2 text-sm mb-4">
//               <div>
//                 <h2 className="font-bold">From:</h2>
//                 <p>{company.name}</p>
//                 <p>
//                   {company.address}, {company.city}, {company.state},{" "}
//                   {company.country} {company.zip}
//                 </p>
//                 <p>{company.email}</p>
//                 <p>{company.phone}</p>
//               </div>
//               <div>
//                 <h2 className="font-bold">To:</h2>
//                 <p>{client.name}</p>
//                 <p>
//                   {client.address}, {client.city}, {client.state},{" "}
//                   {client.country} {client.zip}
//                 </p>
//                 <p>{client.email}</p>
//                 <p>{client.phone}</p>
//               </div>
//             </div>
//             <table className="w-full border mb-4">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th>Description</th>
//                   <th>Qty</th>
//                   <th>Rate</th>
//                   <th>Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item) => (
//                   <tr key={item.id} className="text-center border-t">
//                     <td>{item.description}</td>
//                     <td>{item.qty}</td>
//                     <td>${item.rate}</td>
                    
//                     <td>${item.amount.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Totals */}
//             <div className="text-right mb-4">
//               <p>Subtotal: ${subtotal.toFixed(2)}</p>
//               <p>Tax: {tax}%</p>
//               <p>Discount: ${discount}</p>
//               <h3 className="text-xl font-bold text-blue-600">
//                 Total: ${total.toFixed(2)}
//               </h3>
//             </div>

//             {/* Notes & Terms */}
//             {notes && (
//               <div className="mb-4">
//                 <h2 className="font-bold">Notes:</h2>
//                 <p>{notes}</p>
//               </div>
//             )}
//             {terms && (
//               <div className="mb-4">
//                 <h2 className="font-bold">Terms & Conditions:</h2>
//                 <p>{terms}</p>
//               </div>
//             )}

//             {/* Actions */}
//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setPreview(false)}
//                 className="px-4 py-2 rounded-lg bg-gray-500 text-white shadow hover:bg-gray-600 transition"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={downloadPDF}
//                 className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition"
//               >
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }