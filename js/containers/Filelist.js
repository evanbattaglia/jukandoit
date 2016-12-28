import Filelist from '../components/Filelist';
import {connect} from 'react-redux';
import * as actions from '../actions/filelist';
import {pathJoin} from '../dropbox';

const mapStateToProps = state => state.filelist;

const mapDispatchToProps = (dispatch) => ({

  onPress(directory, file) {
    const path = pathJoin(directory, file.name);
    if (file.type === 'folder') {
      dispatch(actions.loadDirectory(path));
    } else {
    }
  },

});

const FilelistContainer = connect(mapStateToProps, mapDispatchToProps)(Filelist);
export default FilelistContainer;
