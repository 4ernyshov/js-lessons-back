const Sequelize = require("sequelize");
const { sequelizeInstance } = require("..");

class ToDo extends Sequelize.Model {}

ToDo.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      defaultValue: "Title",
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    isCompleted: { 
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },

  { sequelize: sequelizeInstance, underscored: true, modelName: "todo" }
);

module.exports = ToDo;