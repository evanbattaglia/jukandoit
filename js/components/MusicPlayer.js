// TODO: lots of work here. change into container / dumb component, but
// will be more compilcated with music playback.

import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { playSongFromDropbox } from '../lib/music_control';


export default class MusicPlayer extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text>1:23</Text>
        <Button
          onPress={playSongFromDropbox}
          title="Play"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button onPress={() => {}} title="Stop" />
        <Button onPress={() => {}} title="Next" />
        <Button onPress={() => {}} title="Pause" />
      </View>
    );
  }
}


