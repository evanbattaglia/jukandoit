import { ensureLocalExists } from '../lib/filesystem';

// TODO -- consider renaming -- load song downloads if necessary then plays

// TODO: this is all boilerplate... all actions are really...
export const LOAD_SONG_REQUEST = 'PLAYER_LOAD_SONG_REQUEST';
export const LOAD_SONG_SUCCESS = 'PLAYER_LOAD_SONG_SUCCESS';
export const LOAD_SONG_ERROR = 'PLAYER_LOAD_SONG_ERROR';

export const PAUSE_SONG = 'PLAYER_PAUSE_SONG';
export const STOP_SONG = 'PLAYER_STOP_SONG';
export const PLAY_SONG = 'PLAYER_PLAY_SONG';

export const loadSongRequest = path => ({ type: LOAD_SONG_REQUEST, path });
export const loadSongSuccess = path => ({ type: LOAD_SONG_SUCCESS, path });
export const loadSongFailure = path => ({ type: LOAD_SONG_FAILURE, path });

export const pauseSong = () => ({ type: PAUSE_SONG });
export const playSong = () => ({ type: PLAY_SONG });
export const stopSong = () => ({ type: STOP_SONG });

