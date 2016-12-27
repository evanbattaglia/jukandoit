import { combineReducers } from 'redux'
import control from './reducers/control';
import filelist from './reducers/filelist';
import playlist from './reducers/playlist';
const reducer = combineReducers({
  control, filelist, playlist
});
export default reducer;
