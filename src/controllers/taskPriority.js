const Config = require('../../config');
const TaskPriority = require('../models/taskPriority');

module.exports = {

    getAllTaskPriority: (req, res) => {
        TaskPriority.findAll({
            attributes: [
                ['task_priority_id', 'taskPriorityId'],
                ['task_priority_title', 'taskPriorityTitle'],
                'color'
            ],
            order: [
                ['task_priority_id', 'DESC'],
            ],
        }).then(taskPriorities => {
            if (taskPriorities.length > 0) {
                res.send({
                    errCode: Config.errCodeSuccess,
                    errMessage: "",
                    data: taskPriorities
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