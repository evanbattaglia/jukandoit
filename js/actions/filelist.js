import * as dropbox from '../lib/dropbox';

export const LOAD_DIRECTORY_REQUEST = 'FILELIST_LOAD_DIRECTORY_REQUEST';
export const LOAD_DIRECTORY_SUCCESS = 'FILELIST_LOAD_DIRECTORY_SUCCESS';
export const LOAD_DIRECTORY_ERROR = 'FILELIST_LOAD_DIRECTORY_ERROR';

export const loadDirectory = (directory) => (dispatch) => {
  dispatch(loadDirectoryRequest(directory));
  dropbox.listFiles(directory)
    .then(files => dispatch(loadDirectorySuccess(directory, files)))
    .catch(error => {
      console.log("DOWNLOAD ERROR", error);
      dispatch(loadDirectoryFailure(directory, error))
    });
};

// NOTE: this won't change current directory or files.
function loadDirectoryRequest(directory) {
  return { type: LOAD_DIRECTORY_REQUEST, directory };
}

function loadDirectorySuccess(directory, files) {
  return { type: LOAD_DIRECTORY_SUCCESS, directory, files };
}

// TODO: not sure about this
function loadDirectoryFailure(directory, error) {
  return { type: LOAD_DIRECTORY_ERROR, directory, error };
}


