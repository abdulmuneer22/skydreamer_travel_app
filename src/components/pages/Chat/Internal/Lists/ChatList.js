// /-----------------------------------------------------------------
// /   Class:          FriendList.js
// /   Description:    Render the chat list from Redux
// /   Author:         Guilherme Borges Bastos       Date: 02/03/2017
// /   Notes:
// /   Revision History:
// /   Name:           Date:        Description:
// /-----------------------------------------------------------------
import React from 'react';
import { ListView } from 'react-native';
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

  static addNewMessage = (type, text, props) => {
    props.addNewMessage(type, text);
  }

  constructor(props) {
    super(props);
    this.state = { number: 0, chatRows: null };
    this.ds = null;
  }

  componentWillMount() {
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.setState({ chatRows: this.props.chats.data });
    this.dataSource = this.ds.cloneWithRows(this.props.chats.data);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    this.setState({ chatRows: this.props.chats.data });
    this.dataSource = this.ds.cloneWithRows(this.props.chats.data);
  }

  renderRow(chat, sectionId, rowId, chatRows) {
    /*
    console.log(' ---------------- AQUI -------------------');
    console.log('previus', chatRows[Number(rowId) - 1]);
    console.log('current', chatRows[Number(rowId)]);
    console.log('next', chatRows[Number(rowId) + 1]);
    console.log('rowId', Number(rowId));
    console.log('NextRowId', (Number(rowId) + 1));
    console.log(' ------------- FIM AQUI ------------------');
    console.log();
    // */
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
          />
        );
      default:
        return {};
    }
  }

  render() {
    const { chatRows } = this.state;
    return (
      <ListView
        style={{ flex: 1 }}
        dataSource={this.dataSource}
        renderRow={(chat, sectionId, rowId) => this.renderRow(chat, sectionId, rowId, chatRows)}
      />
    );
  }

}

const mapStateToProps = (state) => {
  console.log('mapStateToProps of ChatList.js');
  console.log(state);
  return { chats: state.chats };
};

export default connect(mapStateToProps, actions)(ChatList);
