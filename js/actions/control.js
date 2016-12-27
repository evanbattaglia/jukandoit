export LOAD_SONG = 'CONTROL_LOAD_SONG';

export function loadSong(song) {
  return { type: LOAD_SONG, song };
}

