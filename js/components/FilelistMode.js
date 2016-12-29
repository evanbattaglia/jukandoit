import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const FilelistMode = ({ mode, onPress }) => (
  <View style={{flexDirection: 'row'}}>
    <Button title="Dropbox" onPress={() => onPress('dropbox')} disabled={mode === 'dropbox'} />
    <Button title="Local" onPress={() => onPress('local')} disabled={mode === 'local'} />
  </View>
  // Button title="Playlist" onPress={() => onPress('playlist')} disabled={mode === 'playlist'} />
);
export default FilelistMode;
