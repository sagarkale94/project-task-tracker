const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Employee = require('./employee');
const ProjectEmployeeMapping = require('./projectEmployeeMapping');

const Project = sequelize.define(
    'project',
    {
        project_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        project_title: {
            type: Sequelize.STRING,
        },
        started_on: {
            type: Sequelize.DATE,
        },
        ended_on: {
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

Project.belongsToMany(Employee, {
    through: ProjectEmployeeMapping,
    foreignKey: 'project_id'
});
Employee.belongsToMany(Project, {
    through: ProjectEmployeeMapping,
    foreignKey: 'employee_id'
});

module.exports = Project;