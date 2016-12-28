import Filelist from '../components/Filelist';
import {connect} from 'react-redux';
import {loadDirectory} from '../actions/filelist';
import {loadSong} from '../actions/control';
import {absolutePathJoin} from '../lib/path';

const mapStateToProps = state => state.filelist;

const mapDispatchToProps = (dispatch) => ({

  onPress(directory, file) {
    const path = absolutePathJoin(directory, file.name);
    console.log("RESULT is ", path);
    if (file.type === 'folder') {
      dispatch(loadDirectory(path));
    } else if (file.type === 'music') {
      dispatch(loadSong(path));
    }
  },

});

const FilelistContainer = connect(mapStateToProps, mapDispatchToProps)(Filelist);
export default FilelistContainer;
