import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('auth')
        if (!data) return { user: null, token: null }

        return JSON.parse(data)
    } catch {
        return { user: null, token: null }
    }
}


const initialState = loadUserFromLocalStorage()

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
    state.user = action.payload.user
    state.token = action.payload.token

    localStorage.setItem('auth', JSON.stringify({
        user: state.user,
        token: state.token
    }))
},

        logout: (state) => {
    state.user = null
    state.token = null
    localStorage.removeItem('auth')
}

    }

})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer

