const express = require('express');
const router = express.Router();
const {
    getSingleWorkout,
    getAllWorkouts,
    postNewWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers');
const validateId = require('../middleware/validateId');

// Get all workouts
router.get('/', getAllWorkouts)

// Get a single workout
router.get('/:id', validateId, getSingleWorkout)

// Post a new workout
router.post('/', postNewWorkout)

// Update a workout
router.patch('/:id', validateId, updateWorkout)

// Delete a workout
router.delete('/:id', validateId, deleteWorkout)

module.exports = router;