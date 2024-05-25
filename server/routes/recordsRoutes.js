const express = require("express");
const auth = require("../middleware/auth");
const recordsController = require("../controllers/recordsController");
const recordsRouter = express.Router();





module.exports = recordsRouter;