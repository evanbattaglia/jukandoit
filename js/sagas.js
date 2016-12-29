import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as filelistActions from './actions/filelist';
import * as playerActions from './actions/player';
import { listFilesViaMode, ensureLocalExists } from './lib/filesystem';
import { getFilelistMode, getFilelistDirectory } from './reducer';
import * as sound from './lib/sound';

////////////////////////////////////////////////////

export function* loadDirectory(action) {
  const directory = action.directory;
  const mode = yield select(getFilelistMode);

  try {
    const files = yield call(listFilesViaMode, directory, mode);
    yield put(filelistActions.loadDirectorySuccess(directory, files));
  } catch (error) {
    console.log(" ERROR -- ", error);
    yield put(filelistAction.loadDirectoryFailure(directory, error));
  }
}

export function *reload() {
  const currentDirectory = yield select(getFilelistDirectory);
  yield put(filelistActions.loadDirectoryRequest(currentDirectory));
}

/////////////

export function *loadSong(action) {
  try {
    yield call(ensureLocalExists, action.path);
    yield put(playerActions.loadSongSuccess(action.path));
  } catch (error) {
    console.log("LOAD SONG ERROR", error);
    yield put(playerActions.loadSongFailure(action.path));
  }
}

/////////////////////////////////////////////////////

export default function *sagas() {
  yield takeLatest(filelistActions.SWITCH_MODE, reload);
  yield takeLatest(filelistActions.LOAD_DIRECTORY_REQUEST, loadDirectory);
  yield takeLatest(playerActions.LOAD_SONG_REQUEST, loadSong);
}
