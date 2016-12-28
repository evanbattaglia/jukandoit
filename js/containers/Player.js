import Player from '../components/Player';
import {connect} from 'react-redux';

const mapStateToProps = state => state.player;

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

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player);
export default PlayerContainer;
