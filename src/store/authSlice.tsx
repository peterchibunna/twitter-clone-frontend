import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

export interface IAuthState {
    authState: boolean;
}

const initialState: IAuthState = {
    authState: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<boolean>): void => {
            state.authState = action.payload;
        }
    },
});

export const {setAuthState} = authSlice.actions;
export const authReducer = authSlice.reducer;
