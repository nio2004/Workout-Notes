import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')

    const {user} = useAuthContext()

    
    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return;
        }

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`  
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            setLoad('')
            setReps('')
            setTitle('')
            dispatch({type: 'CREATE_WORKOUTS', payload: json})
            console.log('New Workout Added')
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
        
            <label>Load:</label>
            <input type='text' onChange={(e) => setLoad(e.target.value)} value={load} />

            <label>Reps:</label>
            <input type='text' onChange={(e) => setReps(e.target.value)} value={reps} />

            <button> Add Workout </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm