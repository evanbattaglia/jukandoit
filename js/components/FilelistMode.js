import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const FilelistMode = ({ mode, onPress }) => (
  <View style={{flexDirection: 'row'}}>
    <Button title="Dropbox" onPress={() => onPress('dropbox')} disabled={mode === 'dropbox'} />
    <Button title="Local" onPress={() => onPress('local')} disabled={mode === 'local'} />
    <Button title="Playlist" onPress={() => onPress('playlist')} disabled={mode === 'playlist'} />
  </View>
);
export default FilelistMode;
