import type {CaseReducerActions, PayloadAction, UnknownAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {sendTweetEmailNotification, uniqBy} from "../../utils";

export interface ITweetState {
  tweetsState: any[];
}

const initialState: ITweetState = {
  tweetsState: [],
};

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addTweet: (state, action: PayloadAction<any>): void => {

      sendTweetEmailNotification(action.payload);

      state.tweetsState = uniqBy([...state.tweetsState, ...action.payload], 'id').sort(function (a, b) {
        return (new Date(a.created_at) > new Date(b.created_at)) ? 1 : ((new Date(b.created_at) > new Date(a.created_at)) ? -1 : 0);
      }).reverse();
    },
    resetTweets: (state, action: PayloadAction<boolean>): void => {
      // @ts-expect-error we do not have an iterator here
      state.tweetsState = [...action.payload];
    }
  },
});

export const {addTweet, resetTweets}: CaseReducerActions<{
  addTweet: (state: any, action: PayloadAction<any>) => void,
  resetTweets: (state: any, action: PayloadAction<any>) => void,
}, string> = tweetsSlice.actions;
export const tweetsReducer: (state: (ITweetState | undefined), action: UnknownAction) => ITweetState = tweetsSlice.reducer;
