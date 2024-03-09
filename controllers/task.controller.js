const Task = require("../models/Task");

const taskController = {};
taskController.createTask = async (req, res) => {
    try {
        const {task, isComplete} = req.body;
        const {userId} = req;
        const newTask = new Task({task, isComplete, author: userId});
        await newTask.save();
        res.status(200).json({status:'ok', data: newTask});
    } catch(error) {
        res.status(400).json({status:'fail', message: error.message});
    }
};

taskController.getTasks = async (req, res) => {
    try {
        const {userId} = req;
        const taskList = await Task.find({author: userId}).populate("author").select("-__v");
        res.status(200).json({status: 'ok', data: taskList});
    } catch(error) {
        res.status(400).json({status:'fail', message: error.message});
    }   
};

taskController.putTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const newTask = await Task.findById(taskId);
        newTask.isComplete = ! newTask.isComplete;
        await newTask.save();
        res.status(200).json({status: 'ok', data: newTask});
    } catch(error) {
        res.status(400).json({status:'fail', message: error.message});
    }   
};

taskController.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.deleteOne({_id: taskId});
        res.status(200).json({status: 'ok'});
    } catch(error) {
        res.status(400).json({status: 'fail', message: error.message});
    }
};

module.exports = taskController