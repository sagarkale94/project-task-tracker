const Config = require('../../config');
const Employee = require('../models/employee');
const Project = require('../models/project');

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

    }

}