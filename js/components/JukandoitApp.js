import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Player from '../containers/Player';
import Filelist from '../containers/Filelist';
import FilelistMode from '../containers/FilelistMode';

const JukandoitApp = () => (
  <View style={styles.container}>
    <FilelistMode />
    <Filelist />
    <Player />
  </View>
);
export default JukandoitApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});



