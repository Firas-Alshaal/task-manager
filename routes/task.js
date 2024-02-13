const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const taskController = require("../controllers/task");

router.get("/tasks", taskController.getTasks);

router.post(
  "/create-task",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter a long title"),
    body("description")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter a long content"),
  ],
  taskController.createTask
);

// router.delete("/task/:taskId", isAuth, taskController.deletePost);

module.exports = router;
