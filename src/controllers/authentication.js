const Employee = require('../models/employee');
const Config = require('../../config');
const jwt = require('jsonwebtoken');
const EmployeeProfile = require('../models/employeeProfile');
const Role = require('../models/role');

module.exports = {

    login: (req, res) => {

        Employee.findAll({
            attributes: [
                'employee_id',
                ['first_name', 'firstName'],
                ['middle_name', 'middleName'],
                ['last_name', 'lastName'],
            ],
            where: {
                is_deleted: 0,
                email_id: req.body.username,
                password: req.body.password
            },
            include: {
                model: EmployeeProfile,
                as: 'employeeProfile',
                where: {
                    is_deleted: 0,
                },
                attributes: [
                    'employee_profile_id',
                    'profile',
                    ['profile_description', 'profileDescription']
                ],
                required: true,
                include: {
                    model: Role,
                    required: true,
                    attributes: [
                        'role_id',
                        ['role_title', 'roleTitle']
                    ],
                }
            }
        }).then(employee => {
            if (employee.length > 0) {
                const token = jwt.sign({ employee_id: employee[0].employee_id, employee_profile_id: employee[0].employee_profile_id, role_id: employee[0].role_id }, Config.secret, {
                    expiresIn: Config.tokenExpiryTime
                });
                let employeeResponse = employee[0].toJSON();
                employeeResponse.token = 'Bearer ' + token;
                delete employeeResponse.employee_id;
                delete employeeResponse.employeeProfile.employee_profile_id;
                employeeResponse.employeeProfile.role.roleId = employeeResponse.employeeProfile.role.role_id;
                delete employeeResponse.employeeProfile.role.role_id;
                res.send({
                    errCode: Config.errCodeSuccess,
                    errMessage: "Logged in successfully..!!",
                    data: employeeResponse
                });
            } else {
                res.send({
                    errCode: Config.errCodeError,
                    errMessage: "Invalid credentials..!!",
                    data: ""
                });
            }
        }).catch(err => {
            res.send({
                errCode: Config.errCodeError,
                errMessage: err,
                data: ""
            });
        });

    }

}