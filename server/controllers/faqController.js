const FAQ = require("../models/faqSchema");
const Product = require("../models/productSchema"); // Import the Product model

const addFAQ = async (req, res) => {
  try {
    console.log("Received request to add FAQ");
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    console.log("User ID from token:", req.userId);

    req.body.userId = req.userId;
    req.body.productId = req.params.productId;

    // 🔹 Fetch the product to get the sellerId
    const product = await Product.findById(req.body.productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    req.body.sellerId = product.sellerId; // Assign sellerId from product

    // 🔹 Save the FAQ
    let data = new FAQ(req.body);
    let result = await data.save();
    console.log("FAQ Saved:", result);

    res.status(200).send({
      message: "Your question has been submitted. The seller will respond soon.",
      faq: result
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};


// Show Paginated FAQs by Product ID
const showFAQsbyProduct = async (req, res) => {
  try {
    let page = req.query.page;
    let faq_per_page = req.query.faq_per_page;

    let skip = (page - 1) * faq_per_page;

    let data = await FAQ.find({
      productId: req.params.productId,
      isAnswered: true,
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(faq_per_page)
      .select("question answer")
      .lean();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};

// Show FAQs by Seller ID
const showFAQsbySeller = async (req, res) => {
  try {
    let sellerId = req.sellerId;

    let data = await FAQ.find({
      sellerId: sellerId,
      isAnswered: req.query.isAnswered,
    })
      .sort({ date: -1 })
      .select("question answer productId")
      .lean();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};


// Answering FAQ by Seller
const ansFAQ = async (req, res) => {
  try {
    let data = await FAQ.findByIdAndUpdate(req.params.faqId, {
      answer: req.body.answer,
      isAnswered: true,
    });
    res.status(200).send({
      message: "Answered Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};

module.exports = {
  addFAQ,
  showFAQsbyProduct,
  showFAQsbySeller,
  ansFAQ
  
};
