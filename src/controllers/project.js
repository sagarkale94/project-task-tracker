const Config = require('../../config');
const Employee = require('../models/employee');
const Project = require('../models/project');
const Task = require('../models/task');
const Sequelize = require('sequelize');
const TaskStatus = require('../models/taskStatus');

module.exports = {

    getAllProjectByEmployeeId: (req, res) => {

        Project.findAll({
            attributes: [
                ['project_id', 'projectId'],
                ['project_title', 'projectTitle'],
            ],
            where: {
                is_deleted: 0,
            },
            include: {
                model: Employee,
                as: 'projectEmployee',
                attributes: [],
                where: {
                    is_deleted: 0,
                    employee_id: req.employeeId,
                },
                required: true,
            },
            order: [
                ['project_id', 'DESC'],
            ],
            offset: parseInt(req.params.pageNo * req.params.pageSize),
            limit: parseInt(req.params.pageSize),
        }).then(projects => {
            if (projects.length > 0) {
                res.send({
                    errCode: Config.errCodeSuccess,
                    errMessage: "",
                    data: projects
                });
            } else {
                res.send({
                    errCode: Config.errCodeNoRecordFound,
                    errMessage: "No record found..!!",
                    data: []
                });
            }
        }).catch(err => {
            res.send({
                errCode: Config.errCodeError,
                errMessage: err,
                data: ""
            });
        });

    },

    getProjectDetailsByProjectId: (req, res) => {

        Project.findAll({
            attributes: [
                ['project_id', 'projectId'],
                ['project_title', 'projectTitle'],
                ['started_on', 'startedOn'],
                ['ended_on', 'endedOn']
            ],
            where: {
                is_deleted: 0,
                project_id: req.params.projectId
            },
            include: [
                {
                    model: Employee,
                    as: 'projectEmployee',
                    attributes: [],
                    where: {
                        is_deleted: 0,
                        employee_id: req.employeeId,
                    },
                    required: true,
                },
                {
                    model: Employee,
                    as: 'projectEmployee',
                    attributes: [
                        [Sequelize.fn('COUNT', Sequelize.col('projectEmployee.employee_id')), 'employeeCount']
                    ],
                    where: {
                        is_deleted: 0
                    },
                    required: true,
                    through: { attributes: [] }
                },
                {
                    model: Task,
                    as: 'projectTask',
                    attributes: [
                        [Sequelize.fn('COUNT', Sequelize.col('projectTask.task_id')), 'taskCount']
                    ],
                    where: {
                        is_deleted: 0
                    },
                    required: false,
                    through: { attributes: [] }
                }
            ],
        }).then(projects => {
            if (projects.length > 0) {
                res.send({
                    errCode: Config.errCodeSuccess,
                    errMessage: "",
                    data: projects
                });
            } else {
                res.send({
                    errCode: Config.errCodeNoRecordFound,
                    errMessage: "No record found..!!",
                    data: []
                });
            }
        }).catch(err => {
            console.log('err', err)
            res.send({
                errCode: Config.errCodeError,
                errMessage: err,
                data: ""
            });
        });

    }

}