export const ADD_TO_PLAYLIST = 'PLAYLIST_ADD_TO_PLAYLIST';

export function addToPlaylist(song) {
  return { type: ADD_TO_PLAYLIST, song };
}


