import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { STATUS_PLAYING } from '../reducers/player'

let sound;

const Player = ({
  onStop, onPlay, onPause,
  canStop, canPlay, canPause,
  path, duration
}) => (
  <View>
    <View style={{flexDirection: 'row'}}>
      <Text>{duration}</Text>
      <Button
        title={canPause ? 'Pause' : 'Play' }
        disabled={!canPlay && !canPause}
        onPress={canPause ? onPause : onPlay}

        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        title="Stop"
        disabled={!canStop}
        onPress={onStop}
      />
    </View>
    <Text>loaded: {path}</Text>
  </View>
);

export default Player;
