import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const fetchMentors =createAsyncThunk(
    "mentors/fetchMentors",
    async ()=>{
        const res=await fetch("http://localhost:5000/api/mentors");
        const data=await res.json();

        return data.mentors;
    }
);


const mentorSlice = createSlice({
    name:"mentors",
    initialState:{
        list:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMentors.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchMentors.fulfilled,(state,action)=>{
            state.loading = false;
            state.list =action.payload;
        })
        .addCase(fetchMentors.rejected, (state,action)=>{
            state.loading = false;
            state.error =action.error.message;
        })
    }

})

export default mentorSlice.reducer;