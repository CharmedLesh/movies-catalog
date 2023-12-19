import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getAccountDetails } from '../async-thunks/user-async-thunks';

interface IUser {
    avatar: {
        gravatar: {
            hash: string;
        };
        tmbd: {
            avatar_path: null | string;
        };
    };
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
}

// interface for the slice state
export interface IUserState {
    user: IUser | null;
    status: null | 'pending' | 'resolved' | 'rejected';
    error: null | string;
}

// interface for initial state
const initialState: IUserState = {
    user: null,
    status: null,
    error: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUserStatus: (state) => {
            state.status = null;
        },
        removeUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        // get account cases
        builder.addCase(getAccountDetails.pending, (state) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(getAccountDetails.fulfilled, (state, action) => {
            state.status = 'resolved';
            if (action.payload) {
                state.user = action.payload;
            }
        });
        builder.addCase(getAccountDetails.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload as string;
        });
    }
});

export const { removeUserStatus, removeUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
