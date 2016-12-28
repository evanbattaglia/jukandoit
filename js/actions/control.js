export const LOAD_SONG = 'CONTROL_LOAD_SONG';

export function loadSong(path) {
  return { type: LOAD_SONG, path };
}

