import express from "express";

import TaskController from "../controller/task.controller.js";

const router = new express.Router();
const taskController = new TaskController()

router.get("/tasks", taskController.listTasks);

router.get("/tasks/new", taskController.renderNewForm);

router.get("/tasks/:id/update", taskController.renderEditForm);

router.get("/tasks/:id/delete", function (req, res) {
  const id = req.params.id;
  console.log(id);
  res.render("task_delete", { id });
});

router.post("/tasks/new", taskController.createTask);

router.post("/tasks/:id/update", taskController.updateTask);

router.delete("/tasks/:id/delete", taskController.deleteTask);

router.get("/tasks/:id/findById", taskController.findTaskById);


export default router;
