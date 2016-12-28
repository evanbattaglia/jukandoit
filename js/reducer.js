import { combineReducers } from 'redux'
import player from './reducers/player';
import filelist from './reducers/filelist';
import playlist from './reducers/playlist';
const reducer = combineReducers({
  player, filelist, playlist
});
export default reducer;
