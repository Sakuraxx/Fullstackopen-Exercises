import { createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '', // must have this property
    reducers: {
        setNotification(state, action) {
           return action.payload
        },
    },
})

export const { setNotification} = notificationSlice.actions
export default notificationSlice.reducer;