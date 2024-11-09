import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tododb", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;