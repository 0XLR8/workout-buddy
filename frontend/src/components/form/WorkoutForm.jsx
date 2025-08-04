import { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "../../context/WorkoutContext";

export const WorkoutForm = ({title}) => {
    const [workout, setWorkout] = useState({
        title: '',
        reps: '',
        load: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {workouts, setWorkouts, fetchError, selectedWorkout, setSelectedWorkout} = useContext(WorkoutContext);

    useEffect(() => {
        if(selectedWorkout){
            setWorkout({
                title: selectedWorkout.title,
                reps: selectedWorkout.reps,
                load: selectedWorkout.load
            })
        }
    }, [selectedWorkout]);

    const handleInputChange = (e) => {
        setWorkout({
            ...workout,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {title, reps, load} = workout;
    
        if(fetchError){
            return;
        }

        if(!title.length || !String(reps.length) || !String(load.length)) {
            return;
        }

        if(selectedWorkout){
            await handleUpdateWorkout();
            return;
        }

        await handlePostWorkout();
    }

    const handlePostWorkout = async () => {
        try{
            setLoading(true);
            setError(null);
            const result = await fetch('http://localhost:4000/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(workout)
            })

            const data = await result.json();

            if (!result.ok) {
                throw new Error(data.error);
            }

            setWorkout({
                title: '',
                reps: '',
                load: ''
            })
            setLoading(false);
            setWorkouts([{...data, id: data._id}, ...workouts])
        } catch (er){
            setLoading(false);
            setError(er.message);
        }
    }

     const handleUpdateWorkout = async () => {
        try{
            setLoading(true);
            setError(null);
            const result = await fetch(`http://localhost:4000/api/workouts/${selectedWorkout.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(workout)
            })

            const data = await result.json();

            if (!result.ok) {
                throw new Error(data.error);
            }

            setWorkout({
                title: '',
                reps: '',
                load: ''
            })
            setLoading(false);
            setWorkouts(workouts.map(item => {
                if(item.id === selectedWorkout.id){
                    item.title = workout.title,
                    item.reps = workout.reps,
                    item.load = workout.load
                }

                return item;
            }))
            setSelectedWorkout(null);
        } catch (er){
            setLoading(false);
            setError(er.message);
        }
    }

    return (
        <form 
            className="workout-form px-4 py-3"
            onSubmit={handleSubmit}
        >
            <h1 className="title mb-2">{title}</h1>
            {error && <p className="error">{error}</p>}
            <label className="mt-2">Workout Title:</label>
            <input type='text' name='title' value={workout.title} onChange={handleInputChange} />
            <label>Workout Reps:</label>
            <input type='text' name='reps' value={workout.reps} onChange={handleInputChange} />
            <label>Workout Load:</label>
            <input type='text' name='load' value={workout.load} onChange={handleInputChange} />
            <button disabled={loading} className="add-btn mt-2">Add Workout</button>
        </form>
    )
}