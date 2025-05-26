import { WorkoutForm } from "./components/form/WorkoutForm";
import { Navigation } from "./components/navigation/Navigation"
import { WorkoutList } from "./components/workout/WorkoutList";
import { WorkoutContext } from "./context/workoutContext";
import { useState } from "react";

export const App = () => {

    const [workouts, setWorkouts] = useState([
        {
            id: '1', 
            title: 'Workout 1', load: 2,
            reps: 20,
        },
        {
            id: '2', 
            title: 'Workout 2', load: 3,
            reps: 15,
        },
        {
            id: '3', 
            title: 'Workout 3', load: 4,
            reps: 10,
        },
    ]);   
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const handleDeleteWorkoutClick = (id) => {
        console.log(id);
    }

    const handleEditWorkoutClick = (id) => {
        console.log(id);
    }

    return(
        <WorkoutContext.Provider value={{
            workouts,
            setWorkouts,
            handleDeleteWorkoutClick,
            handleEditWorkoutClick
        }}>
            <Navigation />
            <div className="container p-2 d-flex gap-3 align-items-start">
                <WorkoutList />
                <WorkoutForm title='Add a new workout'/>
            </div>
        </WorkoutContext.Provider>
    )
}