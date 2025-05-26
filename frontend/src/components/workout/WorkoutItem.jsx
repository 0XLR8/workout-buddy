import { useContext } from "react"
import { WorkoutContext } from "../../context/workoutContext"

export const WorkoutItem = ({id, title, load, reps, createdAt}) => {
    const {handleDeleteWorkoutClick, handleEditWorkoutClick} = useContext(WorkoutContext);

    return (
        <div className="workout-item">
            <h1>{title}</h1>
            <p><b>Load(kg):</b> {load}</p>
            <p><b>Reps:</b> {reps}</p>
            <p>{createdAt}</p>
            <span 
                className="delete-btn"
                onClick={() => handleDeleteWorkoutClick(id)}
            >
                <i className="bi bi-trash-fill"></i>
            </span>
            <span
                className="edit-btn"
                onClick={() => handleEditWorkoutClick(id)}
            >
                <i className="bi bi-pencil-fill"></i>
            </span>
        </div>
    )
}