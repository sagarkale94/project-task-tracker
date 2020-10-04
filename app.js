const express = require('express')
const app = express()
const port = require('./config').port;
const authenticationRoutes = require('./src/routes/authentication');
const projectRoutes = require('./src/routes/project');
const taskRoutes = require('./src/routes/task');
const taskStatusRoutes = require('./src/routes/taskStatus');
const taskPriorityRoutes = require('./src/routes/taskPriority');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        info: {
            title: "Project Task Tracker",
            version: "1.1.2",
            description:
                "This is a Project Task Tracker API application made with Express and documented with Swagger",
        }
    },
    apis: ["src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authenticationRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
app.use(taskStatusRoutes);
app.use(taskPriorityRoutes);
app.use((req, res) => {
    res.status(404).send({ errCode: 0, errMessage: "404 request", data: "" })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});