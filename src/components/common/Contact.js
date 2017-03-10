import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { contactsChecked, contactsUnchecked } from '../../actions';

class Contact extends Component {
  state = { check: !this.props.selected };
  onContactCheck(contact) {
    const check = this.state.check;
    this.setState({ check: this.props.selected });
    // Call the redux action
    if (!check) this.props.contactsChecked(contact);
    else this.props.contactsUnchecked(contact);
  }

  render() {
    return (
      <ListItem onPress={() => this.onContactCheck(this.props.contacts)}>
        <Body>
          <Text>{this.props.givenName} {this.props.middleName} {this.props.familyName}</Text>
        </Body>
        <CheckBox
          checked={this.state.check}
          onPress={() => this.onContactCheck(this.props.contacts)}
        />
      </ListItem>
    );
  }
}

const mapStateToProps = state => ({ contacts: state.picker.contacts });

export default connect(mapStateToProps, { contactsChecked, contactsUnchecked })(Contact);
