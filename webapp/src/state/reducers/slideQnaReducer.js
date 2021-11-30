import { createSlice } from "@reduxjs/toolkit";

const slideQnaSlice = createSlice({
  name: "slideQna",
  initialState: {
    qna: {},
    response: {},
  },
  reducers: {
    updateResponse: (state, action) => {
      state.response[action.payload.id] = action.payload.value;
      state.qna[action.payload.id] = action.payload.choiceText;
    },
    resetResponse: (state) => {
      state.response = {};
      state.qna = {};
    },
  },
});

export const { updateResponse, resetResponse } = slideQnaSlice.actions;

export default slideQnaSlice.reducer;
