import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext }from './useWorkoutContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchWorkouts} = useWorkoutsContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT'})
        dispatchWorkouts({ type: 'SET_WORKOUTS',payload: null})
    }
    return { logout }
}