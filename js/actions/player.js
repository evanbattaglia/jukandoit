import { ensureLocalExists } from '../lib/filesystem';

// TODO -- consider renaming -- load song downloads if necessary then plays
export const LOAD_SONG_REQUEST = 'PLAYER_LOAD_SONG_REQUEST';
export const LOAD_SONG_SUCCESS = 'PLAYER_LOAD_SONG_SUCCESS';
export const LOAD_SONG_ERROR = 'PLAYER_LOAD_SONG_ERROR';

export const loadSongRequest = path => ({ type: LOAD_SONG_REQUEST, path });
export const loadSongSuccess = path => ({ type: LOAD_SONG_SUCCESS, path });
export const loadSongFailure = path => ({ type: LOAD_SONG_FAILURE, path });
