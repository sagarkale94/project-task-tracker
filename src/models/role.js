const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Role = sequelize.define(
    'role',
    {
        role_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        role_title: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Role;