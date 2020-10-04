const Config = require('../../config');
const Employee = require('../models/employee');
const Project = require('../models/project');
const Task = require('../models/task');
const TaskStatus = require('../models/taskStatus');
const TaskPriority = require('../models/taskPriority');

module.exports = {

    getAllTaskByProjectId: (req, res) => {
        Project.findAll({
            attributes: [
                ['project_id', 'projectId']
            ],
            where: {
                is_deleted: 0,
                project_id: req.params.projectId
            },
            include: {
                model: Employee,
                attributes: [],
                where: {
                    is_deleted: 0,
                    employee_id: req.employeeId,
                },
                required: true,
            }
        }).then(projects => {
            console.log('projects', projects)
            if (projects.length > 0) {

                Task.findAll({
                    attributes: [
                        ['task_id', 'taskId'],
                        ['task_title', 'taskTitle']
                    ],
                    where: {
                        is_deleted: 0,
                        $or: [
                            { '$createBy.employeeId$': req.employeeId },
                            { '$assignedTo.employeeId$': req.employeeId }
                        ]
                    },
                    include: [
                        {
                            model: Employee,
                            as: 'createBy',
                            attributes: [
                                ['employee_id', 'employeeId'],
                                ['first_name', 'firstName'],
                                ['middle_name', 'middleName'],
                                ['last_name', 'lastName'],
                            ],
                            where: {
                                is_deleted: 0
                            },
                            required: true,
                            through: { attributes: [] },
                        },
                        {
                            model: Employee,
                            as: 'assignedTo',
                            attributes: [
                                ['employee_id', 'employeeId'],
                                ['first_name', 'firstName'],
                                ['middle_name', 'middleName'],
                                ['last_name', 'lastName'],
                            ],
                            where: {
                                is_deleted: 0
                            },
                            required: false,
                            through: { attributes: [] },
                        },
                        {
                            model: TaskStatus,
                            as: 'taskStatus',
                            attributes: [
                                ['task_status_id', 'taskStatusId'],
                                ['task_status_title', 'taskStatusTitle'],
                            ],
                            required: true,
                            through: { attributes: [] },
                        },
                        {
                            model: TaskPriority,
                            as: 'taskPriority',
                            attributes: [
                                ['task_priority_id', 'taskPriorityId'],
                                ['task_priority_title', 'taskPriorityTitle'],
                                'color'
                            ],
                            required: true,
                            through: { attributes: [] },
                        }
                    ]

                }).then(tasks => {
                    if (tasks.length > 0) {
                        res.send({
                            errCode: Config.errCodeSuccess,
                            errMessage: "",
                            data: tasks
                        });
                    } else {
                        res.send({
                            errCode: Config.errCodeNoRecordFound,
                            errMessage: "No record found..!!",
                            data: []
                        });
                    }
                }).catch(err => {
                    console.log('errrrr', err)
                    res.send({
                        errCode: Config.errCodeError,
                        errMessage: err,
                        data: ""
                    });
                });

            } else {
                res.send({
                    errCode: Config.errCodeError,
                    errMessage: "Access denied..!!",
                    data: []
                });
            }

        }).catch(err => {
            console.log('getalltask', err);
            res.send({
                errCode: Config.errCodeError,
                errMessage: err,
                data: ""
            });
        });

    }

}