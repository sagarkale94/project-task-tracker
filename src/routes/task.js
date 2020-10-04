const express = require('express');
const router = express.Router();
const Task = require('../controllers/task');
const verifyToken = require('../middlewares/verifyToken');

/**
* @swagger
* /getAllTaskByProjectId/{projectId}:
    *   get:
    *     tags:
    *       - Tasks
    *     description: get Tasks by projectId
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token
    *         in: header
    *         required: true
    *       - name: projectId
    *         description: projectId
    *         in: path
    *         required: true
    * 
    *     responses:
    *       200:
    *         description: success
*/
router.get('/getAllTaskByProjectId/:projectId', verifyToken, (req, res) => {
    Task.getAllTaskByProjectId(req, res);
});

module.exports = router;
