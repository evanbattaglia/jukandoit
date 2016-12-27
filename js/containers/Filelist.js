import Filelist from '../components/Filelist';
import {connect} from 'react-redux';

const mapStateToProps = state => state.filelist;

const mapDispatchToProps = (state) => {
  return {
    onPress: () => { console.log("oops, clicked") },
  };
};

const FilelistContainer = connect(mapStateToProps, mapDispatchToProps)(Filelist);
export default FilelistContainer;
