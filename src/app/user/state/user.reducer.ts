import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserActions, MaskUserName, UserActionTypes } from "./user.actions";

export interface UserState{
  maskUserName: boolean;
  currentUser: string;
}

const initialState:UserState = {
  maskUserName: false,
  currentUser: null
}

export function reducer(state: UserState = initialState,action : UserActions) : UserState {

  switch(action.type){
    case UserActionTypes.MaskUserName:
    return {
      ...state,
      maskUserName:action.payload
    }

    default:
    return state;
  }
}

const getUserFeatureSelector = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(getUserFeatureSelector,state => state.maskUserName);

export const getCurrentUser = createSelector(getUserFeatureSelector,state => state.currentUser);
