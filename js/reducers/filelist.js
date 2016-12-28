import {
  LOAD_DIRECTORY_SUCCESS,
} from '../actions/filelist';

const initialStateFilelist = {
  directory: null,
  files: [
    {name: "loading", type: "hourglass-1"},
  ],
  loading: true,
};

function filelist(state = initialStateFilelist, action) {
  // enter directory...
  switch (action.type) {
    case LOAD_DIRECTORY_SUCCESS:
      return Object.assign({}, state, {files: action.files, directory: action.directory });
  }
  return state;
}

export default filelist;
