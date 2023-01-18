const Router = require("express").Router();
const USER_ROUTE = require('./user.route/user.route');
const VACANCY_ROUTE = require("./vacancy.route/vacancy.route");
const APPLICANT_ROUTE = require("./applicant.route/applicant.route");
const PROJECT_ROUTE = require("./project.route");
const TASK_ROUTE = require("./task.route");
const LEAVE_ROUTE = require("./leave.route/leave.route");
const ATTANDANCE_ROUTE = require("./attandance.route");
// 
Router.use(USER_ROUTE)
Router.use(VACANCY_ROUTE)
Router.use(APPLICANT_ROUTE)
Router.use(PROJECT_ROUTE)
Router.use(TASK_ROUTE)
Router.use(LEAVE_ROUTE)
Router.use(ATTANDANCE_ROUTE)

module.exports = Router;