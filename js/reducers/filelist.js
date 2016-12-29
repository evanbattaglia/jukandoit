import {
  LOAD_DIRECTORY_SUCCESS,
  SWITCH_MODE,
} from '../actions/filelist';

const initialStateFilelist = {
  directory: null,
  mode: 'local',
  files: [
    {name: "loading", type: "hourglass-1"},
  ],
  loading: true,
};

export default function reducer(state = initialStateFilelist, action) {
  // enter directory...
  switch (action.type) {
    case LOAD_DIRECTORY_SUCCESS:
      return {...state, files: action.files, directory: action.directory };
    case SWITCH_MODE:
      return {...state, mode: action.mode};
  }
  return state;
}

export const getFilelistMode = state => state.mode;
export const getFilelistDirectory = state => state.directory;

