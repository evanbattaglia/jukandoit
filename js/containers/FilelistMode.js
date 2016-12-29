import FilelistMode from '../components/FilelistMode';
import {connect} from 'react-redux';
import {switchMode} from '../actions/filelist';

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => ({
  onPressDropbox() { dispatch(switchMode('dropbox')) },
  onPressLocal() { dispatch(switchMode('local')) },
  onPressPlaylist() {},
});

const FilelistModeContainer = connect(mapStateToProps, mapDispatchToProps)(FilelistMode);
export default FilelistModeContainer;
