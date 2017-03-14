import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// missing import of Boody, ListItem, and CheckBox
import { pickerActions } from 'skydreamer/actions';

class Contact extends Component {

  static propTypes = {
    selected: PropTypes.bool.isRequired,
    pickerActions: PropTypes.object.isRequired,
    givenName: PropTypes.string.isRequired,
    middleName: PropTypes.string.isRequired,
    familyName: PropTypes.string.isRequired,
    contacts: PropTypes.array.isRequired,
  };

  state = {
    check: !this.props.selected,
  };

  onContactCheck = (contact) => {
    const {
      selected,
      pickerActions,
    } = this.props;
    const {
      contactsChecked,
      contactsUnchecked,
    } = pickerActions;

    const { check } = this.state;
    this.setState({
      check: selected,
    });
    // Call the redux action
    if (!check) {
      contactsChecked(contact);
    } else {
      contactsUnchecked(contact);
    }
  }

  render() {
    const {
      contacts,
      givenName,
      middleName,
      familyName,
    } = this.props;
    return (
      <ListItem onPress={this.onContactCheck(contacts)}>
        <Body>
          <Text>{givenName} {middleName} {familyName}</Text>
        </Body>
        <CheckBox
          checked={this.state.check}
          onPress={this.onContactCheck(contacts)}
        />
      </ListItem>
    );
  }
}

const mapStateToProps = ({ picker }) => ({
  contacts: picker.contacts,
});

const mapDispatchToProps = dispatch => ({
  pickerActions: bindActionCreators(pickerActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
