const express = require("express");
const router = express.Router();
const {getAllTasks, createTask, getSingleTask, updateSingleTask, deleteSingleTask} = require('../controllers/tasks');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTask).patch(updateSingleTask).delete(deleteSingleTask)



module.exports = router;