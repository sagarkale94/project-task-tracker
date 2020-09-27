const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Role = require('./role');

const EmployeeProfile = sequelize.define(
    'employee_profile',
    {
        employee_profile_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        profile: {
            type: Sequelize.STRING,
        },
        profile_description: {
            type: Sequelize.STRING,
        },
        role_id: {
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

EmployeeProfile.hasOne(Role, {
    foreignKey: 'role_id',
    sourceKey: 'role_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

module.exports = EmployeeProfile;