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
// npm i -S react-native-invertible-scroll-view

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
      chatRows: null,
      listHeight: 0,
      scrollViewHeight: 0,
    };
  }

  componentWillMount() {
    this.setState({ chatRows: this.props.chats.data });
  }

  componentWillReceiveProps() { // nextProps
    this.setState({ chatRows: this.props.chats.data });
  }

  componentDidUpdate() {
    this.scrollView.scrollToEnd({ animated: true });
  }

  renderRow(chat, rowId, chatRows) {
    let hiddenProfile = false;
    let moreSpace = false;
    let squareCorner = false;
    let semiSquareCorner = false;

    const previus = chatRows[Number(rowId) - 1];
    const current = chatRows[Number(rowId)];
    const next = chatRows[Number(rowId) + 1];

    if (previus) {
      if (current.user.userid === previus.user.userid) {
        squareCorner = true;
        hiddenProfile = true;
      } else {
        moreSpace = true;
      }

      if (next) {
        if (current.user.userid !== next.user.userid) {
          semiSquareCorner = true;
        }
      }
    }
    /*
    console.log('semiSquareCorner', semiSquareCorner);
    console.log('rowId', rowId);
    */
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
            semiSquareCorner={semiSquareCorner}
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
            semiSquareCorner={semiSquareCorner}
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
            semiSquareCorner={semiSquareCorner}
            key={rowId}
          />
        );
      default:
        return {};
    }
  }


  render() {
    const { chatRows } = this.state;
    return (
      <ScrollView
        keyboardDismissMode="on-drag"
        ref={component => this.scrollView = component}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.setState({ listHeight: contentHeight });
        }}
        onLayout={(e) => {
          const height = e.nativeEvent.layout.heigh;
          this.setState({ scrollViewHeight: height });
        }}
      >
        {this.props.chats.data.map((chat, i) => this.renderRow(chat, i, chatRows))}
      </ScrollView>
    );
  }

}

const mapStateToProps = state =>
  /* console.log('mapStateToProps of ChatList.js');
  console.log(state);*/
   ({ chats: state.chats });

export default connect(mapStateToProps, actions)(ChatList);
