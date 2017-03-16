/**
 * @Class:             ChatList.js
 * @Parent:            Friend.js
 * @Description:       Render the chat list from Redux
 * @Author:            Guilherme Borges Bastos      @Date: 02/03/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    12/03/2017  eslint, removed useless actions, removed
 *                                 useless componentWillMount, fixed typo
 * Guilherme Bastos    16/03/2017  Added chatMessagesFetch from Firebase
 */

import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { chatMessagesFetch } from '../../../../../actions';
import lodash from 'lodash';

import {
  // HolderDateSeparator,
  HolderOtherText,
  HolderSelfText,
} from '../ViewHolder';

export const addNewMessage = (text) => {
  console.log('export const addNewMessage', text);
};

class ChatList extends Component {

  static propTypes = {
    chats: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      chatRows: props.chats.data,
      listHeight: 0,
      scrollViewHeight: 0,
    };

    this.props.chatMessagesFetch();

    console.log('############# ChatList() componentWillMount ##############');
    console.log('props', this.props);

  }


  componentWillReceiveProps(nextProps) { // nextProps
    this.setState({
      chatRows: this.props.chats.data,
    });
  }

  componentDidUpdate() {
    this.scrollView.scrollToEnd({ animated: true });
  }


  renderRow = (chat, rowId, chatRows) => {
    let hiddenProfile = false;
    let moreSpace = false;
    let squareCorner = false;
    let semiSquareCornerUp = false;
    let semiSquareCornerDown = false;

    const previus = chatRows[Number(rowId) - 1];
    const current = chatRows[Number(rowId)];
    const next = chatRows[Number(rowId) + 1];

    if (previus && next) {
      // semiSquareCornerDown valiations
      if ((current.user.userid !== previus.user.userid) &&
          (current.user.userid === next.user.userid)) {
        semiSquareCornerDown = true;
      } else if ((current.user.userid === previus.user.userid) &&
                 (current.user.userid === next.user.userid)) {
        squareCorner = true;
      } else if ((current.user.userid === previus.user.userid) &&
                 (current.user.userid !== next.user.userid)) {
        semiSquareCornerUp = true;
      }

      if (current.user.userid !== previus.user.userid) {
        moreSpace = true;
      }
    }

    if (previus) {
      if (current.user.userid === previus.user.userid) {
        hiddenProfile = true;
      }

      if (!next) {
        if (current.user.userid === previus.user.userid) {
          semiSquareCornerUp = true;
        }
      }
    } else if (next) {
      if (current.user.userid === next.user.userid) {
        semiSquareCornerDown = true;
      }
    }

    if (!next) {
      if (current.user.userid !== previus.user.userid) {
        moreSpace = true;
      }
    }

    const { id, type, text, user, timestamp } = chat;

    switch (type) {
      case 'DateSeparator':
        return (
          <HolderOtherText
            id={id}
            photoSrc={user.photoSrc}
            timestamp={timestamp}
            text={text}
            hiddenProfile={hiddenProfile}
            moreSpace={moreSpace}
            squareCorner={squareCorner}
            semiSquareCornerUp={semiSquareCornerUp}
            semiSquareCornerDown={semiSquareCornerDown}
            key={rowId}
          />
        );
      case 'OtherText':
        return (
          <HolderOtherText
            id={id}
            photoSrc={user.photoSrc}
            timestamp={timestamp}
            text={text}
            hiddenProfile={hiddenProfile}
            moreSpace={moreSpace}
            squareCorner={squareCorner}
            semiSquareCornerUp={semiSquareCornerUp}
            semiSquareCornerDown={semiSquareCornerDown}
            key={rowId}
          />
        );
      case 'SelfText':
        return (
          <HolderSelfText
            id={id}
            photoSrc={user.photoSrc}
            timestamp={timestamp}
            text={text}
            hiddenProfile={hiddenProfile}
            moreSpace={moreSpace}
            squareCorner={squareCorner}
            semiSquareCornerUp={semiSquareCornerUp}
            semiSquareCornerDown={semiSquareCornerDown}
            key={rowId}
          />
        );
      default:
        return (<Text>Not defined</Text>);
    }
  }

  render() {
    const { chatRows } = this.state;
    const { chats } = this.props;
    // keyboardDismissMode="on-drag"
    return (
      <ScrollView
        ref={(component) => { this.scrollView = component; }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.setState({
            listHeight: contentHeight,
          });
        }}
        onLayout={(e) => {
          const height = e.nativeEvent.layout.height;
          this.setState({
            scrollViewHeight: height,
          });
        }}
      >
        {chats.data.map((chat, i) => this.renderRow(chat, i, chatRows))}
      </ScrollView>
    );
  }

}


const mapStateToProps = state => {
  const chats = lodash.map(state.chats, (val, uid) => {
    return { ...val, uid };
  });

  return { chats };
};

export default connect(mapStateToProps, { chatMessagesFetch })(ChatList);
