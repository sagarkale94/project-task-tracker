const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const TaskPics = sequelize.define(
    'task_pics',
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

module.exports = TaskPics;