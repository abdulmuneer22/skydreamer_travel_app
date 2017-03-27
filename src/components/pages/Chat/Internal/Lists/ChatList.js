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
// import { chatActions } from 'skydreamer/actions';
import { bindActionCreators } from 'redux';
import { Spinner } from '../../../../common';

import {
         // HolderDateSeparator,
         HolderOtherText,
         HolderSelfText,
       } from '../ViewHolder';


class ChatList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rendered: false,
      chatRows: [],
      listHeight: 0,
      scrollViewHeight: 0,
    };

    // chatActions.chatMessagesFetch('E0GX1LyX9GVv3kjzMgOsOeoKmLC3');
  }

  componentDidMount() {
    this.setState({ rendered: true });
  }

  componentWillReceiveProps(nextProps) { // nextProps
    console.log('Aquii ChatList L 42:::', nextProps);
    this.setState({ chatRows: nextProps.messages });
  }

  componentDidUpdate() {
    if(this.scrollView) {
      this.scrollView.scrollToEnd({ animated: this.state.rendered });
    }
  }

  componentWillUnmount() {
    this.setState({ rendered: true });
  }

  renderRow(message, index, currentKey, keys) {

    const { chatRows } = this.state;

    console.log('renderRow: message:::', message);
    console.log('renderRow: index:::', index);
    console.log('renderRow: chatRows:::', chatRows);

    let hiddenProfile = false;
    let moreSpace = false;
    let squareCorner = false;
    let semiSquareCornerUp = false;
    let semiSquareCornerDown = false;

    const loc = keys.indexOf(currentKey);
    console.log('renderRow: loc:::', loc);

    // const previus = chatRows[Number(index) - 1];
    const previus = chatRows[keys[loc-1]];
    // const current = chatRows[Number(index)];
    const current =  chatRows[keys[loc]];
    // const next = chatRows[Number(index) + 1];
    const next =  chatRows[keys[loc+1]];;

    console.log('renderRow: previus:::', previus);
    console.log('renderRow: current:::', current);
    console.log('renderRow: next:::', next);

    if (previus !== undefined && next !== undefined) {
      //semiSquareCornerDown valiations
      if ((current.userid !== previus.userid) && (current.userid === next.userid)) {
        semiSquareCornerDown = true;
      } else if ((current.userid === previus.userid) && (current.userid === next.userid)) {
        squareCorner = true;
      } else if ((current.userid === previus.userid) && (current.userid !== next.userid)) {
        semiSquareCornerUp = true;
      }

      if (current.userid !== previus.userid) {
        moreSpace = true;
      }
    }

    if (previus !== undefined) {
      if (current.userid === previus.userid) {
        hiddenProfile = true;
      }

      if (next === undefined) {
        if (current.userid === previus.userid) {
          semiSquareCornerUp = true;
        }
      }
    } else if (next !== undefined) {
      if (current.userid === next.userid) {
        semiSquareCornerDown = true;
      }
    }

    if (next === undefined) {
      if (current.userid !== previus.userid) {
        moreSpace = true;
      }
    }

    const { objData, timestamp, photo } = message;
    const { type, value } = objData;
    const id = index;

    //TODO: conpare the senderId with the auth user id to put ( OtherText or SelfText)
    console.log('General data 2 ...');
    console.log('type: ', type);
    console.log('timestamp: ', timestamp);
    console.log('photo: ', photo);
    console.log('value: ', value);
    console.log('');

    const typeMesssage = 'SelfText';

    switch (typeMesssage) {
      case 'DateSeparator':
        return (
          <HolderOtherText
            id={id}
            photoSrc={photo}
            timestamp={timestamp}
            text={value}
            hiddenProfile={hiddenProfile}
            moreSpace={moreSpace}
            squareCorner={squareCorner}
            semiSquareCornerUp={semiSquareCornerUp}
            semiSquareCornerDown={semiSquareCornerDown}
            key={index}
          />
        );
      case 'OtherText':
        return (
          <HolderOtherText
            id={id}
            photoSrc={photo}
            timestamp={timestamp}
            text={value}
            hiddenProfile={hiddenProfile}
            moreSpace={moreSpace}
            squareCorner={squareCorner}
            semiSquareCornerUp={semiSquareCornerUp}
            semiSquareCornerDown={semiSquareCornerDown}
            key={index}
          />
        );
      case 'SelfText':
        return (
          <HolderSelfText
            id={id}
            photoSrc={photo}
            timestamp={timestamp}
            text={value}
            hiddenProfile={hiddenProfile}
            moreSpace={moreSpace}
            squareCorner={squareCorner}
            semiSquareCornerUp={semiSquareCornerUp}
            semiSquareCornerDown={semiSquareCornerDown}
            key={index}
          />
        );
      default:
        return {};
    }
    //*/
  }

  render() {
    // const { chatRows } = this.state;
    const { isLoadingMessages, messages } = this.props;
    const messageLenght = Object.keys(messages).length;
    const keys = Object.keys(messages).sort();

    console.log('this.props.internalChats::::', messages);
    console.log('this.props.internalChats LENGHT::::', Object.keys(messages).length);
    console.log('this.props.internalChats:::: isLoadingMessages', isLoadingMessages);
    // console.log('this.props.internalChats:::: chatRows', chatRows);
    //*/

    if(isLoadingMessages) {
      return (
        <Spinner />
      );
    } else if(messageLenght > 0) {
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
          {Object.keys(messages).map((key, index) => this.renderRow(messages[key], index, key, keys))}
        </ScrollView>
      );
    } else {
      // Fix the duplicated code
      return (
        <Spinner />
      );
    }
  }

}

/*
const mapDispatchToProps = dispatch => ({
  chatActions: bindActionCreators(chatActions, dispatch)
});
*/

const mapStateToProps = ({ internalChats }) => ({
    messages: internalChats.messages,
    isLoadingMessages: internalChats.isLoadingMessages
});

// export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
export default connect(mapStateToProps)(ChatList);
