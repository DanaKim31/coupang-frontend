import { configureStore } from "@reduxjs/toolkit"; // toolkit
import user from "./user";

const store = configureStore({
  reducer: { user: user.reducer },
});

export default store;
