import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";

function AuditorAudit() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);
  const [csvTitle, setCsvTitle] = useState("audit_report");
  // This ref is used to debounce scans for 3 seconds.
  const scanCooldownRef = useRef(false);

  const handleScanResult = (result, error) => {
    if (!showScanner) return;

    // Process only if we have valid text and not in cooldown.
    if (result?.text && !scanCooldownRef.current) {
      // Start cooldown
      scanCooldownRef.current = true;
      setTimeout(() => {
        scanCooldownRef.current = false;
      }, 3000);

      try {
        const text = result.text.trim();
        const pairs = text.split(",");
        const dataObj = {};
        pairs.forEach((item) => {
          const [key, value] = item.split(":");
          if (key && value) {
            dataObj[key.trim()] = value.trim();
          }
        });

        // Convert expiry_date using Date.parse to avoid invalid format errors
        let localExpiry = "";
        if (dataObj.expiry_date) {
          const parsedDate = Date.parse(dataObj.expiry_date);
          localExpiry = !isNaN(parsedDate)
            ? new Date(parsedDate).toLocaleDateString()
            : dataObj.expiry_date;
        }

        const newItem = {
          product_id: dataObj.product_id || "",
          product_name: dataObj.product_name || "",
          product_price: parseFloat(dataObj.product_price) || 0,
          product_qty: parseInt(dataObj.product_qty, 10) || 0,
          product_location: dataObj.product_location || "",
          expiry_date: localExpiry,
          batch_name: dataObj.batch_name || "",
        };

        // Check if record is duplicate based on product_id.
        const isDuplicate = scannedItems.some(
          (item) => item.product_id === newItem.product_id
        );

        if (isDuplicate) {
          // Ask user if they want to add duplicate.
          if (
            window.confirm(
              "This record already exists. Do you want to add it anyway?"
            )
          ) {
            setScannedItems((prev) => [...prev, newItem]);
            alert("Duplicate record added.");
          } else {
            alert("Duplicate record discarded.");
          }
        } else {
          setScannedItems((prev) => [...prev, newItem]);
          alert("QR code scanned successfully! Entry added to the table.");
        }
      } catch (err) {
        console.error("Error parsing QR data:", err);
        alert("Invalid QR code format.");
      }
    }

    if (error) {
      // Optionally log errors here.
      // console.error("QR Scan Error:", error);
    }
  };

  const handleExportCSV = () => {
    let csv =
      "Product ID,Product Name,Price,Quantity,Location,Expiry Date,Batch Name\n";
    scannedItems.forEach((item) => {
      csv += `${item.product_id},${item.product_name},${item.product_price},${item.product_qty},${item.product_location},${item.expiry_date},${item.batch_name}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${csvTitle || "audit_report"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Auditor Audit Page</h1>

      {/* Toggle Scanner */}
      {!showScanner && (
        <button
          onClick={() => setShowScanner(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Start Scanning
        </button>
      )}

      {/* QR Scanner Section */}
      {showScanner && (
        <div className="my-4 max-w-md">
          <QrReader
            onResult={handleScanResult}
            constraints={{ facingMode: "environment" }} // Use "user" if needed
            containerStyle={{ width: "100%" }}
          />
          <button
            onClick={() => setShowScanner(false)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Stop Scanning
          </button>
        </div>
      )}

      {/* Live Table of Scanned Items */}
      <div className="mt-8 bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">Scanned Items</h2>
        {scannedItems.length === 0 ? (
          <p className="text-gray-600">No items scanned yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-3 border">Product ID</th>
                <th className="py-2 px-3 border">Product Name</th>
                <th className="py-2 px-3 border">Price</th>
                <th className="py-2 px-3 border">Quantity</th>
                <th className="py-2 px-3 border">Location</th>
                <th className="py-2 px-3 border">Expiry Date</th>
                <th className="py-2 px-3 border">Batch Name</th>
              </tr>
            </thead>
            <tbody>
              {scannedItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-3 border">{item.product_id}</td>
                  <td className="py-2 px-3 border">{item.product_name}</td>
                  <td className="py-2 px-3 border">{item.product_price}</td>
                  <td className="py-2 px-3 border">{item.product_qty}</td>
                  <td className="py-2 px-3 border">{item.product_location}</td>
                  <td className="py-2 px-3 border">{item.expiry_date}</td>
                  <td className="py-2 px-3 border">{item.batch_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* CSV Title Input & Export Button */}
        {scannedItems.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <input
              type="text"
              placeholder="Enter CSV file title"
              value={csvTitle}
              onChange={(e) => setCsvTitle(e.target.value)}
              className="mb-2 sm:mb-0 px-3 py-2 border rounded-md w-full sm:w-auto"
            />
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Export to CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuditorAudit;
