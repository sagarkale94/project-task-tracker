const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const TaskStatus = require('./taskStatus');
const TaskPriority = require('./taskPriority');
const Employee = require('./employee');
const Project = require('./project');
const TaskAssignment = require('../models/taskAssignment');

const Task = sequelize.define(
    'task',
    {
        task_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        task_title: {
            type: Sequelize.STRING,
        },
        task_description: {
            type: Sequelize.STRING,
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

Task.belongsToMany(Project, {
    through: TaskAssignment,
    as: 'projectTask',
    foreignKey: 'task_id'
});
Project.belongsToMany(Task, {
    through: TaskAssignment,
    as: 'projectTask',
    foreignKey: 'project_id'
});

Task.belongsToMany(Employee, {
    through: TaskAssignment,
    as: 'createBy',
    foreignKey: 'task_id',
});
Employee.belongsToMany(Task, {
    through: TaskAssignment,
    as: 'createBy',
    foreignKey: 'created_by_employee_id'
});

Task.belongsToMany(Employee, {
    through: TaskAssignment,
    as: 'assignedTo',
    foreignKey: 'task_id'
});
Employee.belongsToMany(Task, {
    through: TaskAssignment,
    as: 'assignedTo',
    foreignKey: {
        name: 'assigned_to_employee_id',
        allowNull: true
    }
});

Task.belongsToMany(TaskStatus, {
    through: TaskAssignment,
    as: 'taskStatus',
    foreignKey: 'task_id'
});
TaskStatus.belongsToMany(Task, {
    through: TaskAssignment,
    as: 'taskStatus',
    foreignKey: 'task_status_id'
});

Task.belongsToMany(TaskPriority, {
    through: TaskAssignment,
    as: 'taskPriority',
    foreignKey: 'task_id',
});
TaskPriority.belongsToMany(Task, {
    through: TaskAssignment,
    as: 'taskPriority',
    foreignKey: 'task_priority_id',
});

module.exports = Task;