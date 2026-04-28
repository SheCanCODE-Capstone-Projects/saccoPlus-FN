import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  activeModal:  string | null;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { sidebarOpen: true, activeModal: null } as UIState,
  reducers: {
    toggleSidebar: (state)                             => { state.sidebarOpen = !state.sidebarOpen; },
    openModal:     (state, { payload }: PayloadAction<string>) => { state.activeModal = payload; },
    closeModal:    (state)                             => { state.activeModal = null; },
  },
});

export const { toggleSidebar, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
