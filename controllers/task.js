const { validationResult } = require("express-validator");
const Task = require("../models/task");
exports.getTasks = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Task.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Task.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((tasks) => {
      res.status(200).json({
        message: "Fetched tasks successfully",
        tasks: tasks,
        totalItems: totalItems,
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

  const title = req.body.title;
  const description = req.body.description;
  const task = new Task({
    title: title,
    content: description,
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
