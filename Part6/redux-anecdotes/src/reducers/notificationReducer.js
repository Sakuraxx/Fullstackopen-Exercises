import { createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '', // must have this property
    reducers: {
        setNotification(state, action) {
           return action.payload
        },
        clearNotification(state, action) {
            if(action.payload == state)
            {
                return ''
            }
            return state
        }
    },
})

export const { setNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer;