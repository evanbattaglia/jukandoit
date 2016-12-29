import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  LOAD_DIRECTORY_REQUEST, SWITCH_MODE,
  loadDirectoryRequest, loadDirectorySuccess, loadDirectoryFailure,
} from './actions/filelist';
import { listFilesViaMode } from './lib/filesystem';
import { getFilelistMode, getFilelistDirectory } from './reducer';

export function* loadDirectory(action) {
  try {
  const directory = action.directory;
  const mode = yield select(getFilelistMode);

    const files = yield call(listFilesViaMode, directory, mode);
    yield put(loadDirectorySuccess(directory, files));
  } catch (error) {
    console.log(" ERROR -- ", error);
    yield put(loadDirectoryFailure(directory, error));
  }
}

export function *reload() {
  const currentDirectory = yield select(getFilelistDirectory);
  yield put(loadDirectoryRequest(currentDirectory));
}

export default function *sagas() {
  yield takeLatest(SWITCH_MODE, reload);
  yield takeLatest(LOAD_DIRECTORY_REQUEST, loadDirectory);
}
