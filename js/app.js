import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';
import MusicPlayer from './components/MusicPlayer';
//import MusicPlayer from './components/FileList';

class FileList extends Component {
  renderRow(data, secID, rowID, highlightRow) {
    return (
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
  }
  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    ds = ds.cloneWithRows([ { name: "myfile", type: "music" } ]);

    return (
      <ListView
        style={{flex: 1}}
        dataSource={ds}
        renderRow={this.renderRow}
      />
    );
  }
}

export default class jukandoit extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FileList />
        <MusicPlayer />
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
});



