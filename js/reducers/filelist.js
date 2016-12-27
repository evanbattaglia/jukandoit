import {
  LOAD_DIRECTORY_SUCCESS,
} from '../actions/filelist';

const initialStateFilelist = {
  directory: null,
  files: [
    {name: "loading", type: "dummy"},
  ],
  loading: true,
};

function filelist(state = initialStateFilelist, action) {
  // enter directory...
  switch (action.type) {
    case LOAD_DIRECTORY_SUCCESS:
      return Object.assign({}, state, {files: action.files});
  }
  return state;
}

export default filelist;
