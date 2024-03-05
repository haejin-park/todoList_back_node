const Task = require("../model/Task");

const taskController = {};
taskController.createTask = async (req, res) => {
    try {
        const {task, isComplete} = req.body;
        const newTask = new Task({task, isComplete});
        await newTask.save();
        res.status(200).json({status:'ok', data: newTask});
    } catch(err) {
        res.status(400).json({status:'fail', error:err});
    }
};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({status: 'ok', data: taskList});
    } catch(err) {
        res.status(400).json({status:'fail', error:err});
    }   
};

taskController.putTask = async (req, res) => {
    try {
        const taskId = req.params.id; //url에서 id가져오기
        const newTask = await Task.findById(taskId);
        newTask.isComplete = ! newTask.isComplete;
        await newTask.save();
        res.status(200).json({status: 'ok', data: newTask});
    } catch(err) {
        res.status(400).json({status:'fail', error:err});
    }   
};

taskController.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.deleteOne({_id: taskId});
        res.status(200).json({status: 'ok'});
    } catch(err) {
        res.status(400).json({status: 'fail', error:err});
    }
};

module.exports = taskController