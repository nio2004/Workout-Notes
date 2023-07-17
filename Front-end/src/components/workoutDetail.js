import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutDetail = ({workout}) => {
    const {user} = useAuthContext()
    const { dispatch } = useWorkoutsContext()
    if(!user){
        return ;
    }
    const handleClick = async () => {
        const response = await fetch('/api/workouts/'+workout._id, {
            method: 'DELETE',
            headers: {'Authorization':`Bearer ${user.token}`}
        })
        //const json = await response.json()
        //console.log('almost deleting'+workout._id)
        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: workout})
            console.log("workout deleted")
        }
    }


    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps : </strong>{workout.reps}</p>
            <p>Time: {workout.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}
export default WorkoutDetail