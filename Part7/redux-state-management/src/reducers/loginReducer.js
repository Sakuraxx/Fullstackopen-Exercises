import { createSlice } from "@reduxjs/toolkit";

const loginReducer = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        login(state, action) {
            return action.payload;
        },
        logout(state, action) {
            return null;
        }
    }
});

export const { login, logout } = loginReducer.actions;
export default loginReducer.reducer;