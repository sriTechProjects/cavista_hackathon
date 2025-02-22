const products = [
  {
    "id": "P001",
    "name": "Paracetamol 500mg",
    "category": "Pharmaceuticals",
    "subCategory": "OTC Drugs",
    "count": 150,
    "status": "Available"
  },
  {
    "id": "P002",
    "name": "Amoxicillin 250mg",
    "category": "Pharmaceuticals",
    "subCategory": "Prescription Drugs",
    "count": 80,
    "status": "Available"
  },
  {
    "id": "P003",
    "name": "Cetirizine 10mg",
    "category": "Pharmaceuticals",
    "subCategory": "OTC Drugs",
    "count": 200,
    "status": "Available"
  },
  {
    "id": "P004",
    "name": "Metformin 500mg",
    "category": "Pharmaceuticals",
    "subCategory": "Prescription Drugs",
    "count": 120,
    "status": "Available"
  },
  {
    "id": "P005",
    "name": "Insulin Injection",
    "category": "Pharmaceuticals",
    "subCategory": "Specialty Drugs",
    "count": 50,
    "status": "Out of Stock"
  },
  {
    "id": "P006",
    "name": "Surgical Gloves (Latex-Free)",
    "category": "PPE",
    "subCategory": "Gloves",
    "count": 500,
    "status": "Available"
  },
  {
    "id": "P007",
    "name": "N95 Respirator Mask",
    "category": "PPE",
    "subCategory": "Masks",
    "count": 300,
    "status": "Available"
  },
  {
    "id": "P008",
    "name": "Digital Thermometer",
    "category": "Medical Devices",
    "subCategory": "Diagnostic Tools",
    "count": 75,
    "status": "Available"
  },
  {
    "id": "P009",
    "name": "Blood Pressure Monitor",
    "category": "Medical Devices",
    "subCategory": "Diagnostic Tools",
    "count": 40,
    "status": "Out of Stock"
  },
  {
    "id": "P010",
    "name": "Glucometer Strips (50-pack)",
    "category": "Medical Devices",
    "subCategory": "Testing Kits",
    "count": 100,
    "status": "Available"
  },
  {
    "id": "P011",
    "name": "Cotton Bandage Roll",
    "category": "Consumables",
    "subCategory": "Bandages",
    "count": 300,
    "status": "Available"
  },
  {
    "id": "P012",
    "name": "Alcohol Swabs (100-pack)",
    "category": "Consumables",
    "subCategory": "Cleaning Supplies",
    "count": 500,
    "status": "Available"
  },
  {
    "id": "P013",
    "name": "IV Catheter 20G",
    "category": "Consumables",
    "subCategory": "Catheters",
    "count": 60,
    "status": "Out of Stock"
  },
  {
    "id": "P014",
    "name": "Nebulizer Machine",
    "category": "Medical Devices",
    "subCategory": "Therapeutic Devices",
    "count": 25,
    "status": "Available"
  },
  {
    "id": "P015",
    "name": "Vitamin C Tablets",
    "category": "Health and Wellness",
    "subCategory": "Vitamins",
    "count": 150,
    "status": "Available"
  },
  {
    "id": "P016",
    "name": "Calcium Tablets",
    "category": "Health and Wellness",
    "subCategory": "Vitamins",
    "count": 180,
    "status": "Available"
  },
  {
    "id": "P017",
    "name": "Pregnancy Test Kit",
    "category": "Laboratory Supplies",
    "subCategory": "Testing Kits",
    "count": 100,
    "status": "Available"
  },
  {
    "id": "P018",
    "name": "First-Aid Kit",
    "category": "Emergency Supplies",
    "subCategory": "First-Aid",
    "count": 40,
    "status": "Available"
  },
  {
    "id": "P019",
    "name": "Sanitary Pads (10-pack)",
    "category": "Personal Care",
    "subCategory": "Hygiene Products",
    "count": 400,
    "status": "Available"
  },
  {
    "id": "P020",
    "name": "Adult Diapers (10-pack)",
    "category": "Personal Care",
    "subCategory": "Hygiene Products",
    "count": 60,
    "status": "Out of Stock"
  }
]


const orders = [
  {
    orderId: 1,
    items: ["Paracetamol Tablets", "Cough Syrup", "Bandages"],
    date: "10-02-2025",
    amount: 2096,
    payment: "Paid",
    status: "Delivered"
  },
  {
    orderId: 2,
    items: ["Cough Syrup", "Antiseptic Cream"],
    date: "09-02-2025",
    amount: 3850,
    payment: "Pending",
    status: "Processing"
  },
  {
    orderId: 3,
    items: ["Antiseptic Cream", "Thermometer", "Pain Relief Spray", "Bandages", "Medical Face Masks"],
    date: "11-02-2025",
    amount: 1275,
    payment: "Paid",
    status: "Shipped"
  },
  {
    orderId: 4,
    items: ["Pain Relief Spray", "Blood Pressure Monitor", "Digital Glucometer"],
    date: "08-02-2025",
    amount: 1960,
    payment: "Paid",
    status: "Delivered"
  },
  {
    orderId: 5,
    items: ["Thermometer", "Multivitamin Capsules", "Hand Sanitizer"],
    date: "07-02-2025",
    amount: 1500,
    payment: "Paid",
    status: "Delivered"
  },
  {
    orderId: 6,
    items: ["Blood Pressure Monitor", "Antacid Tablets"],
    date: "10-02-2025",
    amount: 2400,
    payment: "Pending",
    status: "Processing"
  },
  {
    orderId: 7,
    items: ["Bandages", "Cotton Rolls", "Antibiotic Ointment", "Nebulizer Machine"],
    date: "06-02-2025",
    amount: 1999,
    payment: "Paid",
    status: "Delivered"
  },
  {
    orderId: 8,
    items: ["Multivitamin Capsules", "Medical Face Masks", "Paracetamol Tablets", "Cough Syrup"],
    date: "05-02-2025",
    amount: 3480,
    payment: "Paid",
    status: "Shipped"
  },
  {
    orderId: 9,
    items: ["Antacid Tablets", "Digital Glucometer", "Hand Sanitizer"],
    date: "04-02-2025",
    amount: 750,
    payment: "Pending",
    status: "Processing"
  },
  {
    orderId: 10,
    items: ["Digital Glucometer", "Thermometer", "Blood Pressure Monitor", "Nebulizer Machine", "Cotton Rolls"],
    date: "03-02-2025",
    amount: 1300,
    payment: "Paid",
    status: "Delivered"
  },
  {
    orderId: 11,
    items: ["Medical Face Masks", "Hand Sanitizer", "Antibiotic Ointment"],
    date: "02-02-2025",
    amount: 1550,
    payment: "Paid",
    status: "Shipped"
  },
  {
    orderId: 12,
    items: ["Hand Sanitizer", "Paracetamol Tablets", "Bandages"],
    date: "01-02-2025",
    amount: 2540,
    payment: "Pending",
    status: "Processing"
  },
  {
    orderId: 13,
    items: ["Antibiotic Ointment", "Cough Syrup", "Digital Glucometer", "Multivitamin Capsules"],
    date: "30-01-2025",
    amount: 4196,
    payment: "Paid",
    status: "Delivered"
  },
  {
    orderId: 14,
    items: ["Nebulizer Machine", "Thermometer", "Blood Pressure Monitor", "Paracetamol Tablets", "Antacid Tablets"],
    date: "29-01-2025",
    amount: 3320,
    payment: "Paid",
    status: "Shipped"
  },
  {
    orderId: 15,
    items: ["Cotton Rolls", "Multivitamin Capsules", "Medical Face Masks", "Pain Relief Spray", "Bandages", "Hand Sanitizer"],
    date: "28-01-2025",
    amount: 1700,
    payment: "Pending",
    status: "Processing"
  }
];

const ordersToPlace = [
  {
    orderId: 1,
    items: ["Paracetamol Tablets", "Cough Syrup", "Bandages"],
    amount: 2096,
  },
  {
    orderId: 2,
    items: ["Cough Syrup", "Antiseptic Cream"],
    amount: 3850,
  },
  {
    orderId: 3,
    items: ["Antiseptic Cream", "Thermometer", "Pain Relief Spray", "Bandages", "Medical Face Masks"],
    amount: 1275,
  },
  {
    orderId: 4,
    items: ["Pain Relief Spray", "Blood Pressure Monitor", "Digital Glucometer"],
    amount: 1960,
  },
  {
    orderId: 5,
    items: ["Thermometer", "Multivitamin Capsules", "Hand Sanitizer"],
    amount: 1500,
  },
  {
    orderId: 6,
    items: ["Blood Pressure Monitor", "Antacid Tablets"],
    amount: 2400,
  },
  {
    orderId: 7,
    items: ["Bandages", "Cotton Rolls", "Antibiotic Ointment", "Nebulizer Machine"],
    amount: 1999,
  },
  {
    orderId: 8,
    items: ["Multivitamin Capsules", "Medical Face Masks", "Paracetamol Tablets", "Cough Syrup"],
    amount: 3480,
  },
  {
    orderId: 9,
    items: ["Antacid Tablets", "Digital Glucometer", "Hand Sanitizer"],
    amount: 750,
  },
  {
    orderId: 10,
    items: ["Digital Glucometer", "Thermometer", "Blood Pressure Monitor", "Nebulizer Machine", "Cotton Rolls"],
    amount: 1300,
  },
  {
    orderId: 11,
    items: ["Medical Face Masks", "Hand Sanitizer", "Antibiotic Ointment"],
    amount: 1550,
  },
  {
    orderId: 12,
    items: ["Hand Sanitizer", "Paracetamol Tablets", "Bandages"],
    amount: 2540,
  },
  {
    orderId: 13,
    items: ["Antibiotic Ointment", "Cough Syrup", "Digital Glucometer", "Multivitamin Capsules"],
    amount: 4196,
  },
  {
    orderId: 14,
    items: ["Nebulizer Machine", "Thermometer", "Blood Pressure Monitor", "Paracetamol Tablets", "Antacid Tablets"],
    amount: 3320,
  },
  {
    orderId: 15,
    items: ["Cotton Rolls", "Multivitamin Capsules", "Medical Face Masks", "Pain Relief Spray", "Bandages", "Hand Sanitizer"],
    amount: 1700,
  }
];



export { products, orders, ordersToPlace };
