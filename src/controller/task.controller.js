import Task from '../database/model/task.model.js'

class TaskController {

renderNewForm(req, res){
  res.render("task_form", {isUpdate: false });
}

 async renderEditForm(req, res) {
  const id = req.params.id;
  const task = await Task.findByPk(id);
  res.render("task_form", { isUpdate: true, task });
  
 }

  async createTask(req, res) {
    const name = req.body.name
    const description = req.body.description
    const isFinished = req.body.isFinished ? true : false
    try {
      await Task.create({name, description, isFinished})
      return res.status(201).json({
        message:"negocio criado com sucesso"
      })
    } catch (e){
      console.error(e);
      res.status(400).json({
        erro:"Deu erro"
      })
    }
    res.redirect("/tasks");
  }

  async updateTask(req, res) {
    const id = req.body.id
    const name = req.body.name
    const description = req.body.description
    const isFinished = req.body.isFinished ? true : false
    try {
      await Task.update({name, description, isFinished}, { where: { id } })
      return res.status(201).json({
        message:"negocio criado com sucesso"
      })
    } catch (e){
      console.error(e);
      res.status(400).json({
        erro:"Deu erro"
      })
    }

    res.redirect("/tasks");
  }

  async listTasks(req, res) {
    try {
      const tasks = await Task.findAll()
      return res.status(200).json({
        message:"negocio criado com sucesso",
        data:tasks
      })
    } catch(e) {
      console.error(e);
      res.status(400).json({
        erro:"Deu erro"
      })
    }
    res.render("task_list", { tasks });
  }

  async deleteTask(req, res) {
    const {id} = req.params;
    try {
      const task = await Task.findByPk(id);
      if(!task) {
        return res.status(400).json({
          message:"Taks não existe",
        })
      }
      await Task.destroy({ where: { id } })
      return res.status(200).json({
        message:"Excluido com sucesso",
      })
    } catch(e) {
      console.error(e);
      res.status(400).json({
        erro:"Deu erro"
      })
    }
    res.render("task_list", { tasks });
  }

  async findTaskById(req, res) {
    const id = req.params.id;
    try {
      const task = await Task.findByPk(id);
      if(!task) {
        return res.status(400).json({
          message:"Taks não existe",
        })
      }
      return res.status(200).json({
        message:"negocio criado com sucesso",
        "data":task
      })
    } catch (e){
      console.error(e);
      res.status(400).json({
        erro:"Deu erro"
      })
    }
    res.redirect("/tasks");
  }

}

export default TaskController;