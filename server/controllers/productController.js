const Product = require("../models/productSchema");
const Review = require("../models/reviewSchema");
const { uploadImageToCloudinary } = require("../services/cloudinaryServices");
const { calculateDistance } = require("../services/locationServices");
const mongoose = require("mongoose");

// Add Product   //done
const addProduct = async (req, res) => {
  try {
    req.body.sellerId = req.sellerId;
//  console.log(req.body.sellerId);
    const uploadedImage = req.file;

    console.log(uploadedImage);

    if (!uploadedImage) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    try {
      let cloudRes = await uploadImageToCloudinary(uploadedImage.buffer);
      req.body.image = cloudRes.secure_url;
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message:
          "There was a problem communicating with Cloudinary during the image upload.",
      });
    }

    let product = Product(req.body);
    await product.save();

    res.status(200).send({ message: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// Get Product Data By Category //done
const getProductDataByCategory = async (req, res) => {
  try {
    let page = req.query.page;
    let products_per_page = req.query.products_per_page;

    let skip = (page - 1) * products_per_page;

    const totalProduct = await Product.countDocuments({
      category: req.params.category,
    });

    const hasMore = totalProduct > page * products_per_page ? true : false;

    let products =
      (await Product.find({ category: req.params.category })
        .sort({ date: -1 })
        .skip(skip)
        .limit(products_per_page)
        .select(
          "name image brand measuringUnit pricePerUnit minimumOrderQuantity location sellerId deliveryRadius"
        )
        .lean()) || [];

    let deliverableProducts = [];
    let nonDeliverableProducts = [];

    products.map((product) => {
      let userCoordinates = [
        parseFloat(req.params.lng),
        parseFloat(req.params.lat),
      ];

      console.log(userCoordinates, product.location.coordinates);

      const distance = calculateDistance(
        userCoordinates,
        product.location.coordinates
      );

      console.log(distance, product.deliveryRadius);

      if (distance <= product.deliveryRadius) {
        deliverableProducts.push(product);
      } else {
        nonDeliverableProducts.push(product);
      }
    });

    res
      .status(200)
      .send({ deliverableProducts, nonDeliverableProducts, hasMore });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// Get Product Dashboard Data  //done
const getProductDashboardData = async (req, res) => {
  try {
    let data = await Product.findById(req.params.productId)
      .select("shelfLife quantity description")
      .lean();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

const getProductStocksById = async (req, res) => {
  try {
    // Sanitize productId by trimming extra spaces or newlines
    const productId = req.params.productId.trim();

    // Check if the productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Invalid product ID format" });
    }

    let productQty = await Product.findById(productId)
      .select("quantity")
      .lean();

    if (!productQty) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ quantityLeft: productQty.quantity });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Get Product Data By Id //done
const getProductDataById = async (req, res) => {
  try {
    // Sanitize productId by trimming extra spaces or newlines
    const productId = req.params.productId.trim();

    // Check if the productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Invalid product ID format" });
    }

    let product = await Product.findById(productId).lean();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Delete Product Data By Id  //done
const deleteProduct = async (req, res) => {
  try {
    const sellerId = req.sellerId;

    // Sanitize productId by trimming extra spaces or newlines
    const productId = req.params.productId.trim();

    // Check if the productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Invalid product ID format" });
    }

    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (product.sellerId != sellerId) {
      return res
        .status(403)
        .send({ message: "You are not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};

const getProductDataBySellerId = async (req, res) => {
  try {
    // Get sellerId from JWT Middleware instead of query parameters
    const sellerId = req.sellerId;
    console.log("Seller ID from Token:", sellerId); // Debugging

    if (!sellerId) {
      return res.status(400).send({ message: "Seller ID is required" });
    }

    let data = await Product.find({ sellerId: sellerId }).lean();

    if (data.length === 0) {
      return res
        .status(404)
        .send({ message: "No products found for this seller" });
    }

    res.status(200).send(data);
  } catch (error) {
    console.log("Error fetching products:", error); // Debugging
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// Update Product //done
const updateProduct = async (req, res) => {
  try {
    const sellerId = req.sellerId;
    console.log(sellerId);

    const uploadedImage = req.file;
    console.log(uploadedImage);

    // Sanitize productId by trimming extra spaces or newlines
    const productId = req.params.productId.trim();

    // Check if the productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Invalid product ID format" });
    }

    if (uploadedImage) {
      try {
        let cloudRes = await uploadImageToCloudinary(uploadedImage.buffer);
        req.body.image = cloudRes.secure_url;
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          message:
            "There was a problem communicating with Cloudinary during the image upload.",
        });
      }
    }

    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (product.sellerId != sellerId) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this product" });
    }

    const updatedFields = {};
    let {
      image,
      name,
      category,
      description,
      pricePerUnit,
      measuringUnit,
      minimumOrderQuantity,
      location,
      quantity,
      shelfLife,
      deliveryRadius,
    } = req.body;

    pricePerUnit = parseFloat(pricePerUnit);
    minimumOrderQuantity = parseInt(minimumOrderQuantity);
    quantity = parseInt(quantity);
    deliveryRadius = parseInt(deliveryRadius);
    location.coordinates = location.coordinates.map((coord) =>
      parseFloat(coord)
    );

    console.log(updatedFields);

    if (image && image !== product.image) {
      updatedFields.image = image;
    }
    if (name && name !== product.name) {
      updatedFields.name = name;
    }
    if (category && category !== product.category) {
      updatedFields.category = category;
    }
    if (description && description !== product.description) {
      updatedFields.description = description;
    }
    if (pricePerUnit && pricePerUnit !== product.pricePerUnit) {
      updatedFields.pricePerUnit = pricePerUnit;
    }
    if (measuringUnit && measuringUnit !== product.measuringUnit) {
      updatedFields.measuringUnit = measuringUnit;
    }
    if (deliveryRadius && deliveryRadius !== product.deliveryRadius) {
      updatedFields.deliveryRadius = deliveryRadius;
    }
    if (
      minimumOrderQuantity &&
      minimumOrderQuantity !== product.minimumOrderQuantity
    ) {
      updatedFields.minimumOrderQuantity = minimumOrderQuantity;
    }
    if (
      location &&
      location.coordinates &&
      location.coordinates.length === 2 &&
      (location.coordinates[0] !== product.location.coordinates[0] ||
        location.coordinates[1] !== product.location.coordinates[1])
    ) {
      updatedFields.location = {
        type: "Point",
        coordinates: location.coordinates,
      };
    }
    if (quantity && quantity !== product.quantity) {
      updatedFields.quantity = quantity;
    }
    if (shelfLife && shelfLife !== product.shelfLife) {
      updatedFields.shelfLife = shelfLife;
    }

    console.log("Updated Fields: ", updatedFields);

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).send({ message: "No fields to update" });
    }

    await Product.findByIdAndUpdate(productId, updatedFields);

    res.status(200).send({
      message: "Product Updated Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};

const getMainProductDataById = async (req, res) => {
  //done
  try {
    const productId = req.params.productId.trim(); // Trim any extra spaces or newlines

    // Check if the productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Invalid product ID format" });
    }

    // Convert the productId to ObjectId using the 'new' keyword
    const product = await Product.findById(
      new mongoose.Types.ObjectId(productId)
    )
      .select(
        "name image brand measuringUnit pricePerUnit minimumOrderQuantity location.coordinates sellerId"
      )
      .lean();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};

module.exports = {
  addProduct,  //done
  getProductDataByCategory,  //done
  getProductDataById,      //done
  getProductDataBySellerId,  //done
  deleteProduct,         //done
  updateProduct,       //done
  getProductStocksById,    //done
  getProductDashboardData,    //done
  getMainProductDataById,   //done
};
