const express = require("express");
const { chatWithBot, clearChatHistory } = require("../controllers/chatController");

const router = express.Router();

router.post("/chat", chatWithBot);
router.post("/clear-history", clearChatHistory);

module.exports = router;
