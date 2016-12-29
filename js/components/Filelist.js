import React, { Component } from 'react';
import {
  Button,
  Text,
  ListView,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ICON_COLORS_BY_LOCAL = {
  false: {
    folder: "#060",
    music: "#69f",
    file: "#ddd",
  },
  true: {
    music: "#01b",
  },
};

const ICON_COLORS_LOCAL = {
}

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
   if (nextProps.files !== this.props.files) {
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(nextProps.files)
     });
   }
 }

  render() {
    return (
      // TODO: do we really want enableEmpySections? makes a warning go away
      // mayble we action want sections
        <ListView
          initialListSize={10}
          pageSize={10}
          enableEmptySections={true}
          style={{flex: 1}}
          dataSource={this.state.dataSource}
          renderRow={(data, secID, rowID, highlightRow) => (
            <TouchableHighlight onPress={() => this.props.onPress(this.props.directory, data)}>
              <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                <Icon name={data.type} size={30}
                  color={ICON_COLORS_BY_LOCAL[!!data.local][data.type]} />
                <View>
                  <Text>
                    {data.name}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
    );
  }
}


