import {configureStore} from "@reduxjs/toolkit"
import globalSlice from "./features/globalSlice"
import quoteSlice from "./features/quoteSlice"

const store = configureStore({
    reducer:{
        global: globalSlice,
        quote: quoteSlice
    }
})

export default store