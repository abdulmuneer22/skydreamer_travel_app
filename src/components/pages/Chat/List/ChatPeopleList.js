/**
 * @Class:             ChatPeopleList.js
 * @Description:       Render the people list from Redux
 * @Author:            Guilherme Borges Bastos      @Date: 27/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    12/03/2017  eslint, slightly refactored
 */
import React, { Component, PropTypes } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';

import ChatPeopleListItem from './ChatPeopleListItem';

const styles = {
  container: {
    flex: 1,
  },
};

class ChatPeopleList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(props.friends);
  }

  renderRow = friend => (
    <ChatPeopleListItem chat={friend} />
  );

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <ListView
          style={container}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends,
});

export default connect(mapStateToProps, null)(ChatPeopleList);
