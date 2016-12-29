import Player from '../components/Player';
import {connect} from 'react-redux';
import { STATUS_PLAYING, STATUS_PAUSED, STATUS_LOADED } from '../reducers/player';
import { pauseSong, playSong, stopSong } from '../actions/player';

const mapStateToProps = state => ({
  canStop: state.player.status == STATUS_PLAYING || state.player.status == STATUS_PAUSED,
  canPlay: state.player.status == STATUS_LOADED || state.player.status == STATUS_PAUSED,
  canPause: state.player.status == STATUS_PLAYING,

  path: state.player.path,
  duration: state.player.duration,

});

const mapDispatchToProps = (dispatch) => ({
  onPlay: () => dispatch(playSong()),
  onStop: () => dispatch(stopSong()),
  onPause: () => dispatch(pauseSong()),
});

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player);
export default PlayerContainer;
