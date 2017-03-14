import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  Text,
} from 'react-native';
import { some, includes } from 'lodash';
// import Contacts from 'react-native-contacts';
// import { connect } from 'react-redux';
// import { contactsSelected, searchQuery, contactsLoaded, contactsSearch } from '../actions';
import {
  Input,
  Contact,
  /* Card,
  Spinner,*/
  CardSection,
} from 'skydreamer/common';
import ButtonNext from './ButtonNext';

const styles = {
  viewPagerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4578A3',
  },
};

export default class ContactPicker extends Component {

  static propTypes = {
    contactsSelected: PropTypes.func.isRequired,
    searchQuery: PropTypes.func.isRequired,
    contactsSearch: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired,
    searchResults: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
  };

  componentWillMount() {
        // Get contacts
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

  onButtonPress = () => {
    this.props.contactsSelected();
  }

  renderList() {
    if (this.props.searchResults.length === 0) {
      return (<Text> No contacts found</Text>);
    }
    return this.props.searchResults.map(contact => (
      <Contact
        key={contact.key}
        contact={contact}
        givenName={contact.givenName}
        selected={contact.selected}
        middleName={contact.middleName}
        familyName={contact.familyName}
      />
    ));
  }

  onSearch = (searchQuery) => {
    const {
      /**
       * you shouldn't put a reference to a prop that has the same name of the
       * argument passed to the method.
       */
      searchQuery,
      contactsSearch,
      contacts,
    } = this.props;
    searchQuery(searchQuery);
    let searchResults = [];
    if (!searchQuery) {
      contactsSearch(contacts);
    } else {
      searchResults = contacts.filter(item =>
        item => some(item.givenName, name => includes(name, searchQuery)),
      );
      contactsSearch(searchResults);
    }
  }

  render() {
    const { viewPagerContainer } = styles;
    return (
      <View style={viewPagerContainer}>
        <CardSection>
          <Input
            placeholder="search"
            onChangeText={this.onSearch}
            value={this.props.query}
          />
        </CardSection>

        <ScrollView>
          {this.renderList()}
        </ScrollView>
        <ButtonNext onPress={this.onButtonPress}>
          Next
        </ButtonNext>
      </View>
    );
  }
}

/*
const mapStateToProps = ({ picker }) => {
  console.log(picker);
  const { contacts, query, searchResults } = picker;
  return { contacts, query, searchResults };
};
*/
// export default connect(mapStateToProps, {contactsSelected, contactsLoaded, contactsSearch, searchQuery})(ContactPicker);
