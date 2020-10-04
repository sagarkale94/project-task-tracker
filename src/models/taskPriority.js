const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const TaskPriority = sequelize.define(
    'task_priority',
    {
        task_priority_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        task_priority_title: {
            type: Sequelize.STRING,
        },
        color: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = TaskPriority;