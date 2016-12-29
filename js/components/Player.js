import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

let sound;

export default class Player extends Component {
  constructor() {
    super();
    this.state = { playing: false };
  }

  load(path) {
    if (sound) sound.release();
    // TODO: maybe put sound in state???
  }

  stop() {
    sound.stop();
    this.setState({ playing: false });
  }
  play() {
    sound.play();
    this.setState({ playing: true });
  }
  pause() {
    sound.pause();
    this.setState({ playing: false });
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text>{this.state.duration}</Text>
          <Button
            title={this.state.playing ? 'Pause' : 'Play' }
            disabled={!sound}
            onPress={() => this.state.playing ? this.pause() : this.play()}

            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            title="Stop"
            disabled={!sound || !this.state.playing}
            onPress={() => this.stop()}
          />
        </View>
        <Text>{this.props.state}: {this.props.path}</Text>
      </View>
    );
  }
}


