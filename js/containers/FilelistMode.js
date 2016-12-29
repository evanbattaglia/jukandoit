import FilelistMode from '../components/FilelistMode';
import {connect} from 'react-redux';
import {switchMode} from '../actions/filelist';
import {getFilelistMode} from '../reducer';

const mapStateToProps = state => ({ mode: getFilelistMode(state) });

const mapDispatchToProps = (dispatch) => ({
  onPress(mode) { dispatch(switchMode(mode)) },
});

const FilelistModeContainer = connect(mapStateToProps, mapDispatchToProps)(FilelistMode);
export default FilelistModeContainer;
