import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quoteDetails: {},
    company:{},
    products:[],
    tables:[],
}

const quoteSlice = createSlice({
    name: "quote",
    initialState,
    reducers:{
        setQuoteField(state, action){
            state.quoteDetails[action.payload.name] = action.payload.value;
        },
        removeQuoteField(state, action){
            delete state.quoteDetails[action.payload];
        },
        setCompanyField(state, action){
            state.company[action.payload.name] = action.payload.value;
        },
        removeCompanyField(state, action){
            delete state.company[action.payload];
        },
        setProduct(state, action){
            state.products.push(action.payload)
        },
        removeProduct(state, action){
            state.products.splice(action.payload,1);
        },
        // Table Functions
        createTable(state, action){
            const newTable = {
                name: action.payload.name,
                items: [],
                subtotal: 0,
                discount: null,
                discountedSubtotal: null,
                gst: null,
                total: 0
            }
            state.tables.push(newTable)
        },
        removeTable(state, action){
            state.tables.splice(action.payload, 1);
        },
        updateTable(state, action){
            const currentTable = state.tables[action.payload.index];
            currentTable[action.payload.name] = action.payload.value;
        },
        // Table Item Functions
        addItemToTable(state, action){
            state.tables.forEach((table)=>{
                if(table.name === action.payload.name){
                    table.items.splice(+action.payload.position,0,action.payload.item )
                }
            })
        },
        removeItemFromTable(state, action){
            state.tables.forEach((table)=>{
                if(table.name === action.payload.name){
                    table.items.splice(action.payload.position, 1)
                }
            })
        }
    }
})

export const {setProduct,setCompanyField,removeCompanyField, setQuoteField, removeQuoteField, removeProduct, removeItemFromTable, addItemToTable, createTable, removeTable, updateTable} = quoteSlice.actions; 
export default quoteSlice.reducer;