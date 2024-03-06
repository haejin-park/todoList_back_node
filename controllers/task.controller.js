const Task = require("../models/Task");

const taskController = {};
taskController.createTask = async (req, res) => {
    try {
        const {task, isComplete} = req.body;
        const newTask = new Task({task, isComplete});
        await newTask.save();
        res.status(200).json({status:'ok', data: newTask});
    } catch(error) {
        res.status(400).json({status:'fail', error: error.message});
    }
};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({status: 'ok', data: taskList});
    } catch(error) {
        res.status(400).json({status:'fail', error: error.message});
    }   
};

taskController.putTask = async (req, res) => {
    try {
        const taskId = req.params.id; //url에서 id가져오기
        const newTask = await Task.findById(taskId);
        newTask.isComplete = ! newTask.isComplete;
        await newTask.save();
        res.status(200).json({status: 'ok', data: newTask});
    } catch(error) {
        res.status(400).json({status:'fail', error: error.message});
    }   
};

taskController.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.deleteOne({_id: taskId});
        res.status(200).json({status: 'ok'});
    } catch(error) {
        res.status(400).json({status: 'fail', error: error.message});
    }
};

module.exports = taskController