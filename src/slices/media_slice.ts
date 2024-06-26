import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './root_reducers';
import { MediaMediaLocalUrl } from '../models/media_media_local_url';
import { MediaLocalUrl } from '../models/media_local_url';
import { Media } from '../models/media';

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
      console.log(action.payload);
      state.loading = false;
      state.error = null;
    },
    addMediaFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete media
    deleteMediaStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteMediaSuccess: (state, action: PayloadAction<Media>) => {
      const index = state.media.findIndex((media) => media.media?.media_id === action.payload?.media_id);
      state.media.splice(index, 1);
      state.loading = false;
      state.error = null;
    },
    deleteMediaFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // download media
    downloadMediaStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    downloadMediaSuccess: (state, action: PayloadAction<MediaLocalUrl>) => {
      const index = state.media.findIndex((media) => media.media?.media_id === action.payload?.media_id);
      state.media[index].media_local_url = action.payload;
      state.loading = false;
      state.error = null;
    },
    downloadMediaFailure: (state, action: PayloadAction<string>) => {
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
  deleteMediaStart,
  deleteMediaSuccess,
  deleteMediaFailure,

  downloadMediaStart,
  downloadMediaSuccess,
  downloadMediaFailure,
} = mediaSlice.actions;

export const mediaSelector = (state: RootState) => state.media;

export default mediaSlice.reducer;