import { WorkoutForm } from "./components/form/WorkoutForm";
import { Navigation } from "./components/navigation/Navigation"
import { WorkoutList } from "./components/workout/WorkoutList";
import { WorkoutContext } from "./context/WorkoutContext";
import { useEffect, useState } from "react";

export const App = () => {

    const [workouts, setWorkouts] = useState(null);   
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [functionalError, setFunctionalError] = useState(null);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try{
                const result = await fetch('http://localhost:4000/api/workouts');
                if(!result.ok){
                    console.log(er.error);
                    throw new Error(er.error);
                }

                const data = await result.json();
                setWorkouts(data.map(item => {
                    return {
                        ...item,
                        id: item._id
                    }
                }));
            } catch(er) {
                console.log(er);
                setFetchError(er.error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [])

    const handleDeleteWorkoutClick = async (id) => {
        try{
            
        } catch(er) {
            setFunctionalError('There was an error during delete process. Please try again later.')
        }
    }

    const handleEditWorkoutClick = (id) => {
        console.log(id);
    }

    return(
        <WorkoutContext.Provider value={{
            workouts,
            selectedWorkout,
            fetchError,
            loading,
            setWorkouts,
            setFunctionalError,
            handleDeleteWorkoutClick,
            handleEditWorkoutClick,
            setSelectedWorkout
        }}>
            <Navigation />
            <div className="container p-2 d-flex gap-3 align-items-start">
                <WorkoutList />
                <WorkoutForm title='Add a new workout'/>
            </div>
        </WorkoutContext.Provider>
    )
}