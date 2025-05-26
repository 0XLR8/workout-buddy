const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
const validateId = require('../middleware/validateId');

// Get all workouts
const getAllWorkouts = async (req, res) => {
    try{
        const workouts = await Workout.find().sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch(er) {
        res.status(500).json({ error: 'Failed to fetch workouts.' });
    }
}

// Get a single workout
const getSingleWorkout = async (req, res) => {
    const {id} = req.params;

    try{
        const workout = await Workout.findById(id);

        if(!workout){
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.status(200).json(workout);
    } catch(er) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
}

// Post a new workout
const postNewWorkout = async (req, res) => {
    const {title, reps, load} = req.body;
    
    try{
        const workout = await Workout.create({title, reps, load});
        res.status(201).json(workout);
    } catch(er) {
        res.status(500).json({error: er.message});
    }
}

// Update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    
    try{
        const workout = await Workout.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        if(!workout){
            return res.status(404).json({error: 'Workout not found'});
        }

        res.status(200).json(workout);
    } catch(er) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    try{
        const deletedWorkout = await Workout.findByIdAndDelete(id);

        if(!deletedWorkout){
            res.status(404).json({error: 'Workout not found'});
        }

        res.status(200).json({ message: 'Workout deleted successfully'});
    } catch(er){
        res.status(500).json({error: "Server error"});
    }
}

module.exports = {
    getSingleWorkout,
    getAllWorkouts,
    updateWorkout,
    postNewWorkout,
    deleteWorkout
}