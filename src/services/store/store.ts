import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/session-slice';
import userReducer from './slices/user-slice';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        user: userReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
