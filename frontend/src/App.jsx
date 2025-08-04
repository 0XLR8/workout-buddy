import { WorkoutForm } from "./components/form/WorkoutForm";
import { Navigation } from "./components/navigation/Navigation"
import { WorkoutList } from "./components/workout/WorkoutList";
import { WorkoutContext } from "./context/WorkoutContext";
import { useEffect, useState } from "react";

export const App = () => {

    const [workouts, setWorkouts] = useState(null);   
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try{
                const result = await fetch('http://localhost:4000/api/workouts');
                
                if(!result.ok){
                    const errorData = await result.json();
                    throw new Error(errorData.error);
                }

                const data = await result.json();
                
                setWorkouts(data.map(item => {
                    return {
                        ...item,
                        id: item._id
                    }
                }));
            } catch(er) {
                setFetchError(er.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [])

    const handleDeleteWorkoutClick = async (id) => {
        setDeleteError(null);
        try{
            const result = await fetch(`http://localhost:4000/api/workouts/${id}`, {
                method: 'DELETE'
            })

            const data = await result.json();

            if(!result.ok){
                throw new Error(data.error);
            }

            setWorkouts(workouts.filter(item => item.id !== id));
        } catch(er) {
            setDeleteError(er.message);
        }
    }

    const handleEditWorkoutClick = (id) => {
        setSelectedWorkout(workouts.find(item => item.id === id));
    }

    return(
        <WorkoutContext.Provider value={{
            workouts,
            selectedWorkout,
            loading,
            fetchError,
            setWorkouts,
            handleDeleteWorkoutClick,
            handleEditWorkoutClick,
            setSelectedWorkout
        }}>
            <Navigation />
            {deleteError && <p className="workout-error">{deleteError}</p>}
            <div className="container p-2 d-flex gap-3 align-items-start">
                <WorkoutList />
                <WorkoutForm title='Add a new workout'/>
            </div>
        </WorkoutContext.Provider>
    )
}