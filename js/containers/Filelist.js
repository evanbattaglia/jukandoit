import Filelist from '../components/Filelist';
import {connect} from 'react-redux';
import {loadDirectoryRequest} from '../actions/filelist';
import {loadSongRequest} from '../actions/player';
import {absolutePathJoin} from '../lib/path';

const mapStateToProps = state => state.filelist;

const mapDispatchToProps = (dispatch) => ({

  onPress(directory, file) {
    const path = absolutePathJoin(directory, file.name);
    console.log("RESULT is ", path);
    if (file.type === 'folder') {
      dispatch(loadDirectoryRequest(path));
    } else if (file.type === 'music') {
      dispatch(loadSongRequest(path));
    }
  },

});

const FilelistContainer = connect(mapStateToProps, mapDispatchToProps)(Filelist);
export default FilelistContainer;
