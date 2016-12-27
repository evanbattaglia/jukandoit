import React, { Component } from 'react';
import {
  Text,
  ListView,
} from 'react-native';

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


