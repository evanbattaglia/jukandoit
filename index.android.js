/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  TouchableHighlight
} from 'react-native';
const Sound = require('react-native-sound');
const config = require('./config.js');
var RNFS = require('react-native-fs');

var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: config.accessToken });
var b64 = require('base-64');


function base64ArrayBuffer(arrayBuffer) {
  var base64    = ''
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  var bytes         = new Uint8Array(arrayBuffer)
  var byteLength    = bytes.byteLength
  var byteRemainder = byteLength % 3
  var mainLength    = byteLength - byteRemainder

  var a, b, c, d
  var chunk

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63               // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength]

    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3)   << 4 // 3   = 2^2 - 1

    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

    base64 += encodings[a] + encodings[b] + encodings[c] + '='
  }
  
  return base64
}

export default class jukandoit extends Component {
  onPressPlay() {
    const dest = RNFS.DocumentDirectoryPath + '/play.mp3';
    console.log("downloading... to ", dest);
    dbx.filesDownload({path: config.testSong })
    .then(function(resp) {
      console.log("writing the base64");
      const str = base64ArrayBuffer(resp.fileArrayBuffer);
      console.log(typeof resp.fileArrayBuffer);
      console.log("wtf moment ok?", str.substr(0, 100));
console.log("writing to " + dest);
      return RNFS.writeFile(dest, str, 'base64');
    }).then(() => {
      console.log("done writing");
      return RNFS.exists(dest);
    }).then(exists => {
      console.log("does it exist ", exists);
			return RNFS.readFile(RNFS.DocumentDirectoryPath + '/play.txt', 'base64');
		}).then(read => {
      console.log("read", read);
      const s = new Sound(dest, '/', (e) => {
        if (e) {
          console.log('error', e);
        } else {
          console.log('duration', s.getDuration());
          s.play();
        }
      });
    }).catch(function(e) { console.log("shucks howdy:", e); });
    // then later, need to release
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    ds = ds.cloneWithRows([ { name: "myfile", type: "music" } ]);
    const renderRow = (data, secID, rowID, highlightRow) => (
      <TouchableHighlight onPress={() => {
        console.warn("clicked");
          //this._pressRow(rowID);
        //highlightRow(secID, rowID);
      }}>
        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
          <View>
            <Text>
              {data.name}
            </Text>
            <Text>{data.type}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );

    return (
      <View style={styles.container}>
        <ListView
          style={{flex: 1}}
          dataSource={ds}
          renderRow={renderRow}
        />


      <View style={{flexDirection: 'row'}}>
        <Text>1:23</Text>
        <Button
          onPress={this.onPressPlay.bind(this)}
          title="Play"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button onPress={() => {}} title="Stop" />
        <Button onPress={() => {}} title="Next" />
        <Button onPress={() => {}} title="Pause" />
      </View>

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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('jukandoit', () => jukandoit);
