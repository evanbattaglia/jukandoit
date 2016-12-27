// dummy
const serverFetchDirectory = (directory) => new Promise((res, rej) => {
  console.log("here we go");
  setTimeout(() => {
  console.log("here we goagain");
    res([ { name: 'foo', type: 'bar' } ]);
  }, 1000);
});


export const LOAD_DIRECTORY_REQUEST = 'LOAD_DIRECTORY_REQUEST';
export const LOAD_DIRECTORY_SUCCESS = 'LOAD_DIRECTORY_SUCCESS';
export const LOAD_DIRECTORY_ERROR = 'LOAD_DIRECTORY_ERROR';

export const loadDirectory = (directory) => (dispatch) => {
  dispatch(loadDirectoryRequest(directory));
  serverFetchDirectory(directory)
    .then(files => dispatch(loadDirectorySuccess(directory, files)))
    .catch(error => dispatch(loadDirectoryFailure(directory, error)));
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


