import React, { Component } from 'react';
import {
  Text,
  ListView,
  View,
  TouchableHighlight,
} from 'react-native';

export default class FileList extends Component {
  // We put dataSource in state so we can only update it when "files" has changed.
  componentWillMount() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(this.props.files),
    });
  }

 componentWillReceiveProps(nextProps) {
   // Only update the datasource if the files have changed.
   // TODO IMPORTANT TEST
   console.log('--update');
   console.log(nextProps);
   console.log('--update--');
   if (nextProps.files !== this.props.files) {
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(nextProps.files)
     });
   }
 }

  render() {
    console.log("wtf");
    return (
      // TODO: do we really want enableEmpySecionts? makes a warning go away
      <ListView
        enableEmptySections={true}
        style={{flex: 1}}
        dataSource={this.state.dataSource}
        renderRow={(data, secID, rowID, highlightRow) => (
          <TouchableHighlight onPress={this.props.onPress}>
            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
              <View>
                <Text>
                  {data.name}
                </Text>
                <Text>{data.type}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}


