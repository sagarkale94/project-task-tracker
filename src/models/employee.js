const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const EmployeeProfile = require('./employeeProfile');

const Employee = sequelize.define(
    'employee',
    {
        employee_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING,
        },
        middle_name: {
            type: Sequelize.STRING,
        },
        last_name: {
            type: Sequelize.STRING,
        },
        official_employee_id: {
            type: Sequelize.STRING,
        },
        employee_profile_id: {
            type: Sequelize.INTEGER,
        },
        email_id: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        mobile_no: {
            type: Sequelize.STRING,
        },
        profile_pic_url: {
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

Employee.hasOne(EmployeeProfile, {
    as: 'employeeProfile',
    foreignKey: 'employee_profile_id',
    sourceKey: 'employee_profile_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

module.exports = Employee;