import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUserProfile} from '../../types/types.ts';
import { Store } from '..';

const initialState: IUserProfile = {
	name: '',
	picture: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserAuthInfo(state, action: PayloadAction<IUserProfile>) {
			state.name = action.payload.name;
			state.picture = action.payload.picture;
		},
	},
});

export const selectName = (store: Store) => store.user.name;
export const selectPicture = (store: Store) => store.user.picture;

export const { setUserAuthInfo } = userSlice.actions;
export default userSlice.reducer;
