import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './root_reducers';
import { MediaMediaLocalUrl } from '../models/media_media_local_url';

interface MediaState {
  media: MediaMediaLocalUrl[];
  loading: boolean;
  error: string | null;
}

const initialState: MediaState = {
  media: [],
  loading: false,
  error: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    // get medias
    getMediaStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMediaSuccess: (state, action: PayloadAction<MediaMediaLocalUrl[]>) => {
      state.media = action.payload;
      state.loading = false;
      state.error = null;
    },
    getMediaFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add media
    addMediaStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addMediaSuccess: (state, action: PayloadAction<MediaMediaLocalUrl>) => {
      state.media.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addMediaFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getMediaStart,
  getMediaSuccess,
  getMediaFailure,
  addMediaStart,
  addMediaSuccess,
  addMediaFailure,
} = mediaSlice.actions;

export const mediaSelector = (state: RootState) => state.media;

export default mediaSlice.reducer;