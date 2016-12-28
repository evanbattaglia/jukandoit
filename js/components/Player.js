import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { fullLocalPathFor } from '../lib/filesystem';
import Sound from 'react-native-sound';

export default class Player extends Component {
  constructor() {
    super();
    this.state = { playing: false };
  }

  load(path) {
    if (this.sound) this.sound.release();
    // TODO: maybe put sound in state???
    this.sound = new Sound(fullLocalPathFor(path), '/', (e) => {
      if (e) {
        console.log('error', e);
      } else {
        this.setState({ loaded: true, duration: this.sound.getDuration() });
        this.play();
      }
    });
  }

  stop() {
    this.sound.stop();
    this.setState({ playing: false });
  }
  play() {
    this.sound.play();
    this.setState({ playing: true });
  }
  pause() {
    this.sound.pause();
    this.setState({ playing: false });
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
            title={this.state.playing ? 'Pause' : 'Play' }
            disabled={!this.sound}
            onPress={() => this.state.playing ? this.pause() : this.play()}

            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            title="Stop"
            disabled={!this.sound || !this.state.playing}
            onPress={() => this.stop()}
          />
        </View>
        <Text>{this.props.state}: {this.props.path}</Text>
      </View>
    );
  }
}


