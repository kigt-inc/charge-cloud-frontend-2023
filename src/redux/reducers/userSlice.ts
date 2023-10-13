import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user_id: number;
  merchant_id: null | number;
  user_status: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  type: null | string;
  reset_link_token: null | string;
  exp_date: null;
  online_access: string;
  cust_admin: string;
  deleted_timestamp: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date;
  role: string;
  token: string;
}
const userSlice = createSlice({
  name: "user",
  initialState: {} as UserState,
  reducers: {
    SET_USER: (state, action) => {
      return action.payload;
    },
    REMOVE_USER: (state, action) => {
      return {} as UserState;
    },
  },
});

export const { SET_USER, REMOVE_USER } = userSlice.actions;
export default userSlice.reducer;
