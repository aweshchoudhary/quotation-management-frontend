import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: true,
    darkMode: typeof window !== 'undefined' && localStorage.getItem("darkMode") || false
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers:{
        toggleSidebar(state){
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        toggleDarkMode(state){
            state.darkMode = !state.darkMode;
            typeof window !== 'undefined'&&localStorage.setItem("darkMode", state.darkMode)
        }
    }
})

export const {toggleSidebar, toggleDarkMode} = globalSlice.actions; 
export default globalSlice.reducer;