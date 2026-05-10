const express = require("express");
const router = express.Router();
const GameRequest = require("../models/gameRequest"); 

router.post("/create", async (req, res) => {
  try {
    const request = await GameRequest.createGameRequest(req.body);
    res.send(request);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Get all pending requests for a specific user.
router.get("/pending/:userId", async (req, res) => {
  try {
    const requests = await GameRequest.getPendingRequests(req.params.userId);
    res.send(requests);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/match/:requestId", async (req, res) => {
  try {
    const request = await GameRequest.findMatch({ id: parseInt(req.params.requestId), ...req.body });
    
    if (!request) {
      return res.status(404).send({ message: "No matching opponent found." });
    }
    
    res.send(request);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete("/cancel/:requestId", async (req, res) => {
  try {
    const { userId } = req.body; // sent in body for simplicity; could use auth middleware later
    const success = await GameRequest.cancelGameRequest(req.params.requestId, userId);
    
    if (!success) {
      return res.status(404).send({ message: "Request not found or already processed." });
    }
    
    res.send({ message: "Game request cancelled successfully." });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/:requestId", async (req, res) => {
  try {
    const sql = `SELECT * FROM GameRequest WHERE id = ?`;
    const [request] = await require("../models/db_connect").query(sql, [req.params.requestId]);
    
    if (!request) {
      return res.status(404).send({ message: "Game request not found." });
    }
    
    res.send(request);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;