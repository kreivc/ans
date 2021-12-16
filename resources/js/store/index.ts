import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import user, { User } from "./UserSlice";

export interface UserState {
  user: { data: User };
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const store = configureStore({
  reducer: { user },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export const saveState = (state: UserState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("user", serializedState);
  } catch {
    console.log("error");
  }
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
