const Config = require('../../config');
const TaskStatus = require('../models/taskStatus');

module.exports = {

    getAllTaskStatus: (req, res) => {
        TaskStatus.findAll({
            attributes: [
                ['task_status_id', 'taskStatusId'],
                ['task_status_title', 'taskStatusTitle']
            ],
            order: [
                ['task_status_id', 'DESC'],
            ],
        }).then(taskStatus => {
            if (taskStatus.length > 0) {
                res.send({
                    errCode: Config.errCodeSuccess,
                    errMessage: "",
                    data: taskStatus
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