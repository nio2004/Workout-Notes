const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
} = require('../controller/workoutcontroller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

//Get all workouts
router.get('/', getWorkouts)

//Get single workout
router.get('/:id', getWorkout)

//POST single workout
router.post('/', createWorkout)

//Delete single workout
router.delete('/:id', deleteWorkout)

//Update single workout
router.patch('/:id', updateWorkout)

module.exports = router