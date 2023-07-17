import { useEffect } from 'react'
import WorkoutDetail from '../components/workoutDetail'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
    const { workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts',{
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            
            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
                console.log('the workouts are set')
            }
        }
        // console.log(user)
        if(user){
        fetchWorkouts()
        console.log('fetching')
        }
    },[dispatch, user])
    return(
        <div className='home'>
            <div className='workouts'>
                { workouts && workouts.map(workout => (
                    <WorkoutDetail workout={workout} key={workout._id}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home