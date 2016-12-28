import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { fullLocalPathFor } from '../lib/filesystem';
import Sound from 'react-native-sound';

export default class Player extends Component {
  constructor() {
    super();
    this.state = {};
  }

  load(path) {
    const s = new Sound(fullLocalPathFor(path), '/', (e) => {
      if (e) {
        console.log('error', e);
      } else {
        this.setState({ duration: s.getDuration() });
        s.play();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.path !== this.props.path) this.load(nextProps.path);
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text>{this.state.duration}</Text>
          <Button
            onPress={() => {}}
            title="Play"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button onPress={() => {}} title="Stop" />
          <Button onPress={() => {}} title="Next" />
          <Button onPress={() => {}} title="Pause" />
        </View>
        <Text>{this.props.state}: {this.props.path}</Text>
      </View>
    );
  }
}


