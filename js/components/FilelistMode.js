import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const FilelistMode = ({ onPressDropbox, onPressLocal, onPressPlaylist }) => (
  <View style={{flexDirection: 'row'}}>
    <Button title="Dropbox" onPress={onPressDropbox} />
    <Button title="Local" onPress={onPressLocal} />
    <Button title="Playlist" onPress={onPressPlaylist} />
  </View>
);
export default FilelistMode;
