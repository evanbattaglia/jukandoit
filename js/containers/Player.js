import Player from '../components/Player';
import {connect} from 'react-redux';

const mapStateToProps = state => state.player;

const mapDispatchToProps = (dispatch) => ({
});

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player);
export default PlayerContainer;
