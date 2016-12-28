import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Player from '../containers/Player';
import Filelist from '../containers/Filelist';

export default class JukandoitApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Filelist />
        <Player />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});



