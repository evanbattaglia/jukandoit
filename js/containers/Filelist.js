import Filelist from '../components/Filelist';
import {connect} from 'react-redux';
import {loadDirectory} from '../actions/filelist';
import {loadSong} from '../actions/control';
import {pathJoin} from '../lib/dropbox';

const mapStateToProps = state => state.filelist;

const mapDispatchToProps = (dispatch) => ({

  onPress(directory, file) {
    const path = pathJoin(directory, file.name);
    if (file.type === 'folder') {
      dispatch(loadDirectory(path));
    } else {
      dispatch(loadSong(path));
    }
  },

});

const FilelistContainer = connect(mapStateToProps, mapDispatchToProps)(Filelist);
export default FilelistContainer;
