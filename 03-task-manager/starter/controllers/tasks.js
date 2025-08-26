const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async-wrapper');
const {createCustomError} = require('../errors/custom-error');
const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
}); 

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body) 
    res.status(201).json({task})
}) 

const getSingleTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findById(taskID);        
    if(!task){
        return next(createCustomError(`task with id ${taskID}, not found `, 404))
    }
    res.status(200).json({task})
}) 

const deleteSingleTask = asyncWrapper( async(req, res, next) => {
    const { id: deleteTaskID } = req.params;
    const deletedTask = await Task.findOneAndDelete({_id: deleteTaskID});
    console.log("poi11", deletedTask);
    
    if(!deletedTask){
        return next(createCustomError(`task with id ${deleteTaskID}, not found `, 404));
    }
    res.status(200).json({deletedTask, msg: 'task deleted successfully'})        
}) 

const updateSingleTask = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID}, req.body, {new: true, runValidators: true
    });

    if(!task){
        return next(createCustomError(`no records with such id:  ${taskID}`, 404));
    }

    res.status(200).json({task})
}) 

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateSingleTask,
    deleteSingleTask
}