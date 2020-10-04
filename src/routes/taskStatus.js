const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const TaskStatus = require('../controllers/taskStatus');

/**
* @swagger
* /getAllTaskStatus:
    *   get:
    *     tags:
    *       - Task Status
    *     description: get all task status
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token
    *         in: header
    *         required: true
    * 
    *     responses:
    *       200:
    *         description: success
*/
router.get('/getAllTaskStatus', verifyToken, (req, res) => {
    TaskStatus.getAllTaskStatus(req, res);
});

module.exports = router;
