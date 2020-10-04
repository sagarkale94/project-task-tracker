const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const TaskStatus = sequelize.define(
    'task_status',
    {
        task_status_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        task_status_title: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = TaskStatus;