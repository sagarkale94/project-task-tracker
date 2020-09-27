const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ProjectEmployeeMapping = sequelize.define(
    'project_employee_mapping',
    {
        project_employee_mapping_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        project_id: {
            type: Sequelize.INTEGER,
        },
        employee_id: {
            type: Sequelize.INTEGER,
        },
        joined_on: {
            type: Sequelize.DATE,
        },
        closed_on: {
            type: Sequelize.DATE,
            allowNull: true
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

module.exports = ProjectEmployeeMapping;