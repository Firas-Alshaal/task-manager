const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const taskController = require("../controllers/task");

router.get("/tasks", taskController.getTasks);

router.post(
  "/create-task",
  [
    body("taskName")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter a long title"),
    body("taskDescription")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Please enter a long content"),
    // body("assignedTo")
    //   .isArray()
    //   .withMessage("Assigned to must be an array of employee IDs.")
    //   .custom((value) => {
    //     value.forEach((id) => {
    //       if (!mongoose.Types.ObjectId.isValid(id)) {
    //         throw new Error(
    //           "Each ID in assigned to must be a valid MongoDB ObjectId"
    //         );
    //       }
    //     });
    //     return true;
    //   }),
  ],
  taskController.createTask
);

router.post(
  "/create-employee",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please enter a long name"),
    body("email").trim().isEmail().withMessage("Please enter a valid email"),
  ],
  taskController.createEmployee
);

// router.delete("/task/:taskId", isAuth, taskController.deletePost);

module.exports = router;
