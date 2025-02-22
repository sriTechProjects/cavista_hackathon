const cartItems = [
  {
    id: 1,
    name: "Apple",
    genre: "Fruits",
    price: "₹120",
    actualPrice: "₹150",
    quantity: 2,
    img: "https://www.ampimex.in/wp-content/uploads/2021/02/apples-.jpg",
  },
  {
    id: 2,
    name: "Banana",
    genre: "Fruits",
    price: "₹60",
    actualPrice: "₹80",
    quantity: 1,
    img: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg",
  },
  {
    id: 3,
    name: "Tomato",
    genre: "Vegetables",
    price: "₹40",
    actualPrice: "₹50",
    quantity: 3,
    img: "https://cdn.britannica.com/16/187216-131-FB186228/tomatoes-tomato-plant-Fruit-vegetable.jpg",
  },
  {
    id: 4,
    name: "Potato",
    genre: "Vegetables",
    price: "₹30",
    actualPrice: "₹45",
    quantity: 4,
    img: "https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP.jpg",
  },
  {
    id: 5,
    name: "Rice (Basmati)",
    genre: "Groceries",
    price: "₹200",
    actualPrice: "₹250",
    quantity: 1,
    img: "https://m.media-amazon.com/images/I/61Y1PZx5CZL.jpg",
  },
  {
    id: 6,
    name: "Wheat Flour",
    genre: "Groceries",
    price: "₹150",
    actualPrice: "₹180",
    quantity: 2,
    img: "https://cdn.britannica.com/16/187216-131-FB186228/tomatoes-tomato-plant-Fruit-vegetable.jpg",
  }
];

const products = [
  {
    id: 1,
    name: "Green Apple",
    category: "Fruits",
    price: "98",
    unit: "kg",
    status: "out of stock",
  },
  {
    id: 2,
    name: "Almonds",
    category: "Dry Fruits",
    price: "850",
    unit: "kg",
    status: "available",
  },
  {
    id: 3,
    name: "Brown Bread",
    category: "Bakery",
    price: "45",
    unit: "pack",
    status: "out of stock",
  },
  {
    id: 4,
    name: "Whole Wheat Flour",
    category: "Groceries",
    price: "55",
    unit: "kg",
    status: "available",
  },
  {
    id: 5,
    name: "Chicken Breast",
    category: "Meat",
    price: "320",
    unit: "kg",
    status: "available",
  },
  {
    id: 6,
    name: "Salmon Fillet",
    category: "Seafood",
    price: "750",
    unit: "kg",
    status: "available",
  },
  {
    id: 7,
    name: "Cheddar Cheese",
    category: "Dairy",
    price: "400",
    unit: "kg",
    status: "out of stock",
  },
  {
    id: 8,
    name: "Olive Oil",
    category: "Cooking Essentials",
    price: "999",
    unit: "liter",
    status: "available",
  },
  {
    id: 9,
    name: "Brown Rice",
    category: "Grains",
    price: "120",
    unit: "kg",
    status: "available",
  },
  {
    id: 10,
    name: "Dark Chocolate",
    category: "Snacks",
    price: "250",
    unit: "bar",
    status: "available",
  },
  {
    id: 11,
    name: "Carrot",
    category: "Vegetables",
    price: "60",
    unit: "kg",
    status: "available",
  },
  {
    id: 12,
    name: "Organic Honey",
    category: "Health & Wellness",
    price: "550",
    unit: "bottle",
    status: "available",
  },
  {
    id: 13,
    name: "Basmati Rice",
    category: "Grains",
    price: "180",
    unit: "kg",
    status: "available",
  },
  {
    id: 14,
    name: "Pistachios",
    category: "Dry Fruits",
    price: "950",
    unit: "kg",
    status: "out of stock",
  },
  {
    id: 15,
    name: "Greek Yogurt",
    category: "Dairy",
    price: "80",
    unit: "cup",
    status: "available",
  },
];

const orders = [
  {
    id: 1,
    orderName: "Green Apple",
    customerName: "Amit Sharma",
    location: "Mumbai",
    date: "10-02-2025",
    qty: 2,
    price: 196,
    payment: "Paid",
    status: "Delivered"
  },
  {
    id: 2,
    orderName: "Almonds",
    customerName: "Neha Verma",
    location: "Delhi",
    date: "09-02-2025",
    qty: 1,
    price: 850,
    payment: "Pending",
    status: "Processing"
  },
  {
    id: 3,
    orderName: "Whole Wheat Flour",
    customerName: "Ravi Kumar",
    location: "Bengaluru",
    date: "11-02-2025",
    qty: 5,
    price: 275,
    payment: "Paid",
    status: "Shipped"
  },
  {
    id: 4,
    orderName: "Chicken Breast",
    customerName: "Priya Desai",
    location: "Chennai",
    date: "08-02-2025",
    qty: 3,
    price: 960,
    payment: "Paid",
    status: "Delivered"
  },
  {
    id: 5,
    orderName: "Salmon Fillet",
    customerName: "Karan Mehta",
    location: "Pune",
    date: "07-02-2025",
    qty: 2,
    price: 1500,
    payment: "Paid",
    status: "Delivered"
  },
  {
    id: 6,
    orderName: "Cheddar Cheese",
    customerName: "Simran Kaur",
    location: "Jaipur",
    date: "10-02-2025",
    qty: 1,
    price: 400,
    payment: "Pending",
    status: "Processing"
  },
  {
    id: 7,
    orderName: "Olive Oil",
    customerName: "Rajiv Singh",
    location: "Hyderabad",
    date: "06-02-2025",
    qty: 1,
    price: 999,
    payment: "Paid",
    status: "Delivered"
  },
  {
    id: 8,
    orderName: "Brown Rice",
    customerName: "Ananya Joshi",
    location: "Kolkata",
    date: "05-02-2025",
    qty: 4,
    price: 480,
    payment: "Paid",
    status: "Shipped"
  },
  {
    id: 9,
    orderName: "Dark Chocolate",
    customerName: "Siddharth Malhotra",
    location: "Ahmedabad",
    date: "04-02-2025",
    qty: 3,
    price: 750,
    payment: "Pending",
    status: "Processing"
  },
  {
    id: 10,
    orderName: "Carrot",
    customerName: "Pooja Agarwal",
    location: "Surat",
    date: "03-02-2025",
    qty: 5,
    price: 300,
    payment: "Paid",
    status: "Delivered"
  },
  {
    id: 11,
    orderName: "Organic Honey",
    customerName: "Manoj Patel",
    location: "Nagpur",
    date: "02-02-2025",
    qty: 1,
    price: 550,
    payment: "Paid",
    status: "Shipped"
  },
  {
    id: 12,
    orderName: "Basmati Rice",
    customerName: "Deepak Yadav",
    location: "Bhopal",
    date: "01-02-2025",
    qty: 3,
    price: 540,
    payment: "Pending",
    status: "Processing"
  },
  {
    id: 13,
    orderName: "Green Apple",
    customerName: "Swati Saxena",
    location: "Lucknow",
    date: "30-01-2025",
    qty: 2,
    price: 196,
    payment: "Paid",
    status: "Delivered"
  },
  {
    id: 14,
    orderName: "Greek Yogurt",
    customerName: "Tarun Sharma",
    location: "Chandigarh",
    date: "29-01-2025",
    qty: 4,
    price: 320,
    payment: "Paid",
    status: "Shipped"
  },
  {
    id: 15,
    orderName: "Almonds",
    customerName: "Meera Kapoor",
    location: "Goa",
    date: "28-01-2025",
    qty: 2,
    price: 1700,
    payment: "Pending",
    status: "Processing"
  }
]


export { cartItems, products, orders };
