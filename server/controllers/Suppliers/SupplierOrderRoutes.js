const SendingProductToOrders = async (req, res) => {
  try {
  } catch (error) {
    console.error("Supplier Order Routes error:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

module.exports = SendingProductToOrders;
