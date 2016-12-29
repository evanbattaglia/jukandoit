import FilelistMode from '../components/FilelistMode';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => ({
  onPressDropbox() {},
  onPressLocal() {},
  onPressPlaylist() {},
});

const FilelistModeContainer = connect(mapStateToProps, mapDispatchToProps)(FilelistMode);
export default FilelistModeContainer;
