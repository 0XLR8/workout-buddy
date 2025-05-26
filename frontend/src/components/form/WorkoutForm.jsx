export const WorkoutForm = ({title}) => {
    return (
        <div className="workout-form px-4 py-3">
            <h1 className="title">{title}</h1>
            <label>Excersize Title:</label>
            <input type='text' name='excercizeTitle' />
            <label>Excersize Title:</label>
            <input type='text' name='excercizeTitle' />
            <label>Excersize Title:</label>
            <input type='text' name='excercizeTitle' />
            <button className="add-btn mt-2">Add Workout</button>
        </div>
    )
}