const express = require('express');
const router = express.Router();
const Project = require('../controllers/project');
const verifyToken = require('../middlewares/verifyToken');

/**
* @swagger
* /getMyAllProjects/{pageSize}/{pageNo}:
    *   get:
    *     tags:
    *       - Project
    *     description: get user specific projects
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token
    *         in: header
    *         required: true
    *       - name: pageSize
    *         description: pageSize
    *         in: path
    *         required: true
    *       - name: pageNo
    *         description: pageNo
    *         in: path
    *         required: true
    * 
    *     responses:
    *       200:
    *         description: success
*/
router.get('/getMyAllProjects/:pageSize/:pageNo', verifyToken, (req, res) => {
    Project.getAllProjectByEmployeeId(req, res);
});

module.exports = router;
