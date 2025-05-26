import { useContext } from "react";
import { WorkoutItem } from "./WorkoutItem";
import { WorkoutContext } from "../../context/workoutContext";

export const WorkoutList = () => {
    const {workouts} = useContext(WorkoutContext);

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