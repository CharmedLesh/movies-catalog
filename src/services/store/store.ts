import { configureStore } from '@reduxjs/toolkit';
import sessionIdReducer from './slices/session-id-slice';
import userReducer from './slices/user-slice';

export const store = configureStore({
    reducer: {
        sessionId: sessionIdReducer,
        user: userReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
