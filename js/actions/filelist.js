import {dropboxListFilesWithExistence} from '../lib/filesystem';

// TODO: this is just boilerplate, could simplify maybe.

export const LOAD_DIRECTORY_REQUEST = 'FILELIST_LOAD_DIRECTORY_REQUEST';
export const LOAD_DIRECTORY_SUCCESS = 'FILELIST_LOAD_DIRECTORY_SUCCESS';
export const LOAD_DIRECTORY_ERROR = 'FILELIST_LOAD_DIRECTORY_ERROR';

export const SWITCH_MODE = 'SWITCH_MODE';

export const loadDirectoryRequest = (directory) =>
  ({ type: LOAD_DIRECTORY_REQUEST, directory });
export const loadDirectorySuccess = (directory, files) =>
  ({ type: LOAD_DIRECTORY_SUCCESS, directory, files });
export const loadDirectoryError = (directory) =>
  ({ type: LOAD_DIRECTORY_ERROR, directory, error });

export const switchMode = (mode) => ({ type: SWITCH_MODE, mode });

