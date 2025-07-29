const { Router } = require("express")
const mailRouter = Router();
const { Message_Model } = require("../DataBase/message");


mailRouter.post("/send-message", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new Message_Model({ name, email, message });
        await newMessage.save();
        res.status(200).json({ success: true, message: "Message stored successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to store message." });
    }
});

module.exports = { mailRouter };