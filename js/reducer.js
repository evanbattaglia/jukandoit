import { combineReducers } from 'redux'
import player from './reducers/player';
import filelist, * as fromFilelist from './reducers/filelist';
import playlist from './reducers/playlist';
const reducer = combineReducers({
  player, filelist, playlist
});
export default reducer;

export const getFilelistMode = state => fromFilelist.getFilelistMode(state.filelist);
export const getFilelistDirectory = state => fromFilelist.getFilelistDirectory(state.filelist);
