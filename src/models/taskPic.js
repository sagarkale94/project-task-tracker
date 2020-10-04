const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Task = require('./task');

const TaskPic = sequelize.define(
    'task_pic',
    {
        task_pic_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        task_id: {
            type: Sequelize.INTEGER,
        },
        task_pic_url: {
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

Task.hasMany(TaskPic, {
    as: 'taskPic',
    foreignKey: 'task_id',
});
TaskPic.belongsTo(Task, {
    as: 'taskPic',
    foreignKey: 'task_pic_id',
});

module.exports = TaskPic;