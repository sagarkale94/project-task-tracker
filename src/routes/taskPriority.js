const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const TaskPriority = require('../controllers/taskPriority');

/**
* @swagger
* /getAllTaskPriority:
    *   get:
    *     tags:
    *       - Task Priority
    *     description: get all task priority
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
router.get('/getAllTaskPriority', verifyToken, (req, res) => {
    TaskPriority.getAllTaskPriority(req, res);
});

module.exports = router;
