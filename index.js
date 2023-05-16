const { Sequelize } = require("sequelize");


const sequelizeInstance = new Sequelize({
  dialect: "sqlite",
  port: 5000,
  database: "sqlite",
  username: "chernyshov",
  password: "",
  storage: "/db/sqliteData/db.sqlite" 
});

const initDB = async () => {
  try {
    await sequelizeInstance.authenticate(); 
    await sequelizeInstance.sync(); 
    //console.log("Sequelize");
  } catch (error) {
    console.log("Error", error);
    process.exit();
  }
};

module.exports = {
  sequelizeInstance,
  initDB,
};