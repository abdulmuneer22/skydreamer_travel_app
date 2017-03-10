import React, { Component } from 'react';
import { ScrollView, View, Platform, TextInput, Text } from 'react-native';
import Contact from './common/Contact';
import { connect } from 'react-redux';
import { contactsSelected, searchQuery, contactsLoaded, contactsSearch } from '../actions';
import { Input, Card, Spinner, CardSection } from './common';
import ButtonNext from './ButtonNext';
import LinearGradient from 'react-native-linear-gradient';

class ContactPicker extends Component {
  componentWillMount() {
        // Get contacts

    const Contacts = require('react-native-contacts');
    const filteredList = [];
        /*
        Contacts.getAll((err, contacts) => {
            if (err && err.type === 'permissionDenied') {
                //Open modal to ask for permission
            } else {
                //Create filtered list
                _.forEach(contacts, function(value) {
                    value.selected='false';
                    filteredList.push(_.pick(value, ['givenName', 'familyName', 'phoneNumbers', 'emailAddresses', 'recordID','selected']));
                });
            }
        })

        this.props.contactsLoaded(filteredList);
        this.props.contactsSearch(filteredList);*/
  }

  onButtonPress() {
    this.props.contactsSelected();
  }

  renderList() {
    if (this.props.searchResults.length == 0) {
      return (<Text> No contacts found</Text>);
    }
    return this.props.searchResults.map(contact => (
      <Contact key={contact.key} contact={contact} givenName={contact.givenName} selected={contact.selected} middleName={contact.middleName} familyName={contact.familyName} />
      ));
  }

  onSearch(searchQuery) {
    this.props.searchQuery(searchQuery);
    let searchResults = [];
    if (!searchQuery) {
      this.props.contactsSearch(this.props.contacts);
    } else {
      searchResults = _.filter(this.props.contacts, item => _.some(item.givenName, name => _.includes(name, searchQuery)));
      this.props.contactsSearch(searchResults);
    }
  }

  render() {
    const { viewPagerContainer } = styles;
    return (
      <View style={viewPagerContainer}>
        <CardSection>
          <Input
            placeholder="search"
            onChangeText={this.onSearch.bind(this)}
            value={this.props.query}
          />
        </CardSection>

        <ScrollView>
          {this.renderList()}
        </ScrollView>
        <ButtonNext onPress={this.onButtonPress.bind(this)}>
                Next
            </ButtonNext>
      </View>
    );
  }
}

const styles = {

  viewPagerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4578A3',
  },
};


const mapStateToProps = ({ picker }) => {
  console.log(picker);
  const { contacts, query, searchResults } = picker;
  return { contacts, query, searchResults };
};

// export default connect(mapStateToProps, {contactsSelected, contactsLoaded, contactsSearch, searchQuery})(ContactPicker);
