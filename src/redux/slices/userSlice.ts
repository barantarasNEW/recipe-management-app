import { PayloadAction, createSlice} from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    firstName: "",
    email: "",
    password: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;