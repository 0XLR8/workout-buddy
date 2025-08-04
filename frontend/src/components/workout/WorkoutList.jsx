import { useContext } from "react";
import { WorkoutItem } from "./WorkoutItem";
import { WorkoutContext } from "../../context/WorkoutContext";

export const WorkoutList = () => {
    const {workouts, loading, fetchError} = useContext(WorkoutContext);

    if(loading){
        return <div className="workout-list">
            <h2>Loading...</h2>
        </div>
    }

    if(fetchError) {
        return <div className="workout-list">
            <h2>{fetchError}</h2>
        </div>
    }

    if(!Boolean(workouts.length)){
        return <div className="workout-list">
            <h2>No workouts added.</h2>
        </div>
    }

    return (
        <div className="workout-list">
           {workouts.map(item => 
                <WorkoutItem 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    load={item.load}
                    reps={item.reps} 
                />
            )
           }
        </div>
    );
}