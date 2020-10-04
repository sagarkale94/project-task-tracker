const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const TaskAssignment = sequelize.define(
    'task_assignment',
    {
        task_assignment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        task_id: {
            type: Sequelize.INTEGER,
        },
        project_id: {
            type: Sequelize.INTEGER,
        },
        created_by_employee_id: {
            type: Sequelize.INTEGER,
        },
        assigned_to_employee_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        created_on: {
            type: Sequelize.DATE,
        },
        task_status_id: {
            type: Sequelize.INTEGER,
        },
        task_priority_id: {
            type: Sequelize.INTEGER,
        },
        is_deleted: {
            type: Sequelize.TINYINT,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = TaskAssignment;