// /-----------------------------------------------------------------
// /   Class:          FriendList.js
// /   Description:    Render the chat list from Redux
// /   Author:         Guilherme Borges Bastos       Date: 02/03/2017
// /   Notes:
// /   Revision History:
// /   Name:           Date:        Description:
// /-----------------------------------------------------------------
import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../../../../actions';

import {
         // HolderDateSeparator,
         HolderOtherText,
         HolderSelfText,
       } from '../ViewHolder';

export const addNewMessage = (text) => {
  console.log('export const addNewMessage', text);
};

class ChatList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rendered: false,
      chatRows: null,
      listHeight: 0,
      scrollViewHeight: 0,
    };
  }

  componentWillMount() {
    this.setState({ chatRows: this.props.messages });
  }

  componentDidMount() {
    this.setState({ rendered: true });
  }

  componentWillReceiveProps() { // nextProps
    this.setState({ chatRows: this.props.messages });
  }

  componentDidUpdate() {
    this.scrollView.scrollToEnd({ animated: this.state.rendered });
  }

  componentWillUnmount() {
    this.setState({ rendered: true });
  }

  renderRow(chat, rowId, chatRows) {
    let hiddenProfile = false;
    let moreSpace = false;
    let squareCorner = false;
    let semiSquareCornerUp = false;
    let semiSquareCornerDown = false;

    const previus = chatRows[Number(rowId) - 1];
    const current = chatRows[Number(rowId)];
    const next = chatRows[Number(rowId) + 1];

    if (previus && next) {
      //semiSquareCornerDown valiations
      if ((current.user.userid !== previus.user.userid) && (current.user.userid === next.user.userid)) {
        semiSquareCornerDown = true;
      } else if ((current.user.userid === previus.user.userid) && (current.user.userid === next.user.userid)) {
        squareCorner = true;
      } else if ((current.user.userid === previus.user.userid) && (current.user.userid !== next.user.userid)) {
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
        return {};
    }
  }


  render() {
    const { messages } = this.props;
    console.log('messages', messages);
    // keyboardDismissMode="on-drag"
    return (
      <ScrollView
        ref={component => this.scrollView = component}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.setState({ listHeight: contentHeight });
        }}
        onLayout={(e) => {
          const height = e.nativeEvent.layout.height;
          this.setState({ scrollViewHeight: height });
        }}
      >
        {messages.map((chat, i) => this.renderRow(chat, i, messages))}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
    messages: state.chats.messages
});

export default connect(mapStateToProps, actions)(ChatList);
