import * as playlistActions from '../actions/playlist';

const initialStatePlaylist = {
  // later: playlist name
  songs: [],
}
function playlist(state = initialStatePlaylist, action) {
  switch (action) {
    case playlistActions.ADD_TO_PLAYLIST:
      return { ...state, songs: [...state.songs, action.song] };
  }
  return state;
}

export default playlist;
