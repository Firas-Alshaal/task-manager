const { validationResult } = require("express-validator");
const Task = require("../models/task");
const Employee = require("../models/employee");
exports.getTasks = (req, res, next) => {
  Task.find()
    .populate("assignedTo")
    .then((tasks) => {
      res.status(200).json({
        message: "Fetched tasks successfully",
        tasks: tasks,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getEmployees = (req, res, next) => {
  Employee.find()
    .then((employee) => {
      res.status(200).json({
        message: "Fetched employee successfully",
        employees: employee,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createTask = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.taskName;
  const description = req.body.taskDescription;
  const assignedEmployee = req.body.assignedTo;
  const task = new Task({
    taskName: title,
    taskDescription: description,
    assignedTo: assignedEmployee,
  });
  task
    .save()
    .then((result) => {
      res.status(201).json({
        message: "task created successfully",
        task: task,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createEmployee = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const email = req.body.email;
  const employee = new Employee({
    name: name,
    email: email,
  });
  employee
    .save()
    .then((result) => {
      res.status(201).json({
        message: "employee created successfully",
        employee: employee,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.deletePost = (req, res, next) => {
//   const postId = req.params.postId;
//   let samePost;

//   Post.findById(postId)
//     .then((post) => {
//       if (!post) {
//         const error = new Error("Could not find post!");
//         error.statusCode = 404;
//         throw error;
//       }
//       if (post.creator.toString() !== req.userId) {
//         const error = new Error("Not Authorized");
//         error.statusCode = 403;
//         throw error;
//       }
//       samePost = post;
//       clearImage(post.imageUrl);
//       return Post.findByIdAndDelete(postId);
//     })
//     .then((result) => {
//       return User.findById(req.userId);
//     })
//     .then((user) => {
//       user.posts.pull(postId);
//       return user.save();
//     })
//     .then((result) => {
//       res.status(200).json({ message: "Post Deleted", post: samePost });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
