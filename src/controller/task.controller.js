import Task from '../database/model/task.model.js';

class TaskController {
  renderNewForm(req, res) {
    res.render("task_form", { isUpdate: false });
  }

  async renderEditForm(req, res) {
    const id = req.params.id;
    try {
      const task = await Task.findByPk(id);
      if (!task) return res.status(404).json({ message: "Task não encontrada" });
      res.render("task_form", { isUpdate: true, task });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erro ao carregar o formulário de edição" });
    }
  }

  async createTask(req, res) {
    const { name, description, isFinished } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Nome e descrição são obrigatórios" });
    }
    try {
      const task = await Task.create({ name, description, isFinished: !!isFinished });
      return res.status(201).json({ message: "Tarefa criada com sucesso", task });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erro ao criar a tarefa" });
    }
  }

  async updateTask(req, res) {
    const { id, name, description, isFinished } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Nome e descrição são obrigatórios" });
    }
    try {
      const [updated] = await Task.update(
        { name, description, isFinished: !!isFinished },
        { where: { id } }
      );
      if (!updated) return res.status(404).json({ message: "Tarefa não encontrada" });
      return res.status(200).json({ message: "Tarefa atualizada com sucesso" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erro ao atualizar a tarefa" });
    }
  }

  async deleteTask(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Task.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ message: "Tarefa não encontrada" });
      return res.status(200).json({ message: "Excluída com sucesso" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erro ao excluir a tarefa" });
    }
  }

  async listTasks(req, res) {
    try {
      const tasks = await Task.findAll();
      return res.status(200).json(tasks);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erro ao listar as tarefas" });
    }
  }

  async findTaskById(req, res) {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });
      return res.status(200).json(task);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erro ao buscar a tarefa" });
    }
  }
}

export default TaskController;
