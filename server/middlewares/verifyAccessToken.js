

const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
      return res.status(401).json({ message: "Access token is required" });
    }

    const accessToken = authHeader.split(" ")[1];
    // console.log(accessToken);
    if (!accessToken) {
      return res.status(401).json({ message: "Invalid Authorization header format" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    // console.log("Decoded JWT Payload:", decoded);

    // Assign userId or sellerId to the request object based on the token payload
    if (decoded.user) {
      req.userId = decoded.user;
      console.log("user:",req.userId);
    } else if (decoded.seller) {
      req.sellerId = decoded.seller;
      // console.log(req.sellerId);
    } else {
      return res.status(403).json({ message: "Invalid token, please login again" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired, please login again" });
    }
    return res.status(403).json({ message: "Invalid token, please login again" });
  }
};

module.exports = verifyAccessToken;
