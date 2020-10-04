const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'project_task_tracker',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost',
    }
);

/* const sequelize = new Sequelize(
    'project_task_tracker',
    'root',
    'sagarkale94@',
    {
        dialect: 'mysql',
        host: 'localhost',
    }
); */

module.exports = sequelize;