import { ensureLocalExists } from '../lib/filesystem';

// TODO -- consider renaming -- load song downloads if necessary then plays
export const LOAD_SONG_REQUEST = 'PLAYER_LOAD_SONG_REQUEST';
export const LOAD_SONG_SUCCESS = 'PLAYER_LOAD_SONG_SUCCESS';
export const LOAD_SONG_ERROR = 'PLAYER_LOAD_SONG_ERROR';

// TODO: extract this boilerplate
export const loadSong = (path) => (dispatch) => {
  dispatch(loadSongRequest(path));

  ensureLocalExists(path)
    .then(() => {
      dispatch(loadSongSuccess(path))
    })
    .catch(error => {
      console.log("LOAD SONG ERROR", error);
      dispatch(loadSongFailure(path))
    });
};

const loadSongRequest = path => ({ type: LOAD_SONG_REQUEST, path });
const loadSongSuccess = path => ({ type: LOAD_SONG_SUCCESS, path });
const loadSongFailure = path => ({ type: LOAD_SONG_FAILURE, path });
