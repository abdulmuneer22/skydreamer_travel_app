import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtonNext from './ButtonNext';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';

class SetDateSession extends Component {

  constructor(props) {
    super(props);
    this.state = { date: '20/02/2017',
                   dateReturn: '',
                   dateMonth: 'February',
                   dateReturnMonth: '',
                   minDate: '21/02/2017',
                   maxDate: '21/02/2019',
                   monthDeparture: false };
  }


  onNextPress() {
    Actions.setAirportSession();
  }

  renderMiddleContent() {

    const { textValue,
            departureContainer,
            returnContainer } = styles;

    if (this.state.monthDeparture) {
      return (

          <View>
            <View style={departureContainer}>
              <Text style={textValue}>Departure Month:</Text>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.dateMonth}
                mode="date"
                placeholder="Select departure date"
                format="MMMM"
                minDate={this.state.minDate}
                maxDate={this.state.maxDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require('../images/icon-calendar.png')}
                onDateChange={(dateMonth) => this.setState({ dateMonth })}
                customStyles={{
                  dateIcon: {
                    width: 40
                  },
                  dateText: {
                    color: '#fff',
                    fontSize: 25,
                    textAlign: 'left'
                  },
                  dateInput: {
                    borderWidth: 0
                  }
               }}
              />
            </View>

            <View style={returnContainer}>
              <Text style={textValue}>Return Month:</Text>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.dateReturnMonth}
                mode="date"
                placeholder="Select return date"
                format="MMMM"
                minDate={this.state.dateMonth}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require('../images/icon-calendar.png')}
                onDateChange={(dateReturnMonth) => this.setState({ dateReturnMonth })}
                customStyles={{
                  dateIcon: {
                    width: 40
                  },
                  dateText: {
                    color: '#fff',
                    fontSize: 25,
                    textAlign: 'left'
                  },
                  dateInput: {
                    borderWidth: 0
                  }
               }}
              />
            </View>
          </View>
      );
    }

    return (
      <View>
        <View style={departureContainer}>
          <Text style={textValue}>Departure Day:</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date}
            mode="date"
            placeholder="Select departure date"
            format="DD/MM/YYYY"
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../images/icon-calendar.png')}
            onDateChange={(date) => this.setState({ date })}
            customStyles={{
              dateIcon: {
                width: 40
              },
              dateText: {
                color: '#fff',
                fontSize: 25,
                textAlign: 'left'
              },
              dateInput: {
                borderWidth: 0
              }
           }}
          />
        </View>

        <View style={returnContainer}>
          <Text style={textValue}>Return Day:</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.dateReturn}
            mode="date"
            placeholder="Select return date"
            format="DD/MM/YYYY"
            minDate={this.state.date}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../images/icon-calendar.png')}
            onDateChange={(date) => this.setState({ dateReturn: date })}
            customStyles={{
              dateIcon: {
                width: 40
              },
              dateText: {
                color: '#fff',
                fontSize: 25,
                textAlign: 'left'
              },
              dateInput: {
                borderWidth: 0
              }
           }}
          />
        </View>
      </View>
    );
  }

  renderSwitchContent() {

    const { switchContainer,
            textSwitchValue,
            textSwitchSelectedValue } = styles;

    if (this.state.monthDeparture) {
      return (
        <View style={switchContainer}>
          <Text style={textSwitchValue}>Day</Text>
          <Switch
            style={{ marginTop: 10, marginBottom: 10 }}
            onValueChange={(value) => this.setState({ monthDeparture: value })}
            value={this.state.monthDeparture}
          />
          <Text style={textSwitchSelectedValue}>Month</Text>
        </View>
      );
    }

    return (
      <View style={switchContainer}>
        <Text style={textSwitchSelectedValue}>Day</Text>
        <Switch
          style={{ marginTop: 10, marginBottom: 10 }}
          onValueChange={(value) => this.setState({ monthDeparture: value })}
          value={this.state.monthDeparture}
        />
        <Text style={textSwitchValue}>Month</Text>
      </View>
    );
  }

  render() {

    const { linearGradient,
            textTitle } = styles;

    return (
      <LinearGradient
        colors={['#A71FAD', '#350DFE']}
        style={linearGradient}
      >
          <Text style={textTitle}>
            Pick up date of departure and return or a month?
          </Text>

          { this.renderSwitchContent() }

          { this.renderMiddleContent() }

          <ButtonNext onPress={this.onNextPress.bind(this)}>
            Choose the airport
          </ButtonNext>

      </LinearGradient>
    );
  }
}


// Later on in your styles..
const styles = {
  linearGradient: {
    flex: 1,
    width: null,
    height: null
  },
  textValue: {
    color: '#FFF',
    marginTop: 25,
    marginRight: 25,
    marginLeft: 5,
    fontSize: 18,
    fontFamily: 'NotoSans-Regular',
    justifyContent: 'flex-start',
  },
  textSwitchValue: {
    color: '#A173D4',
    marginTop: 8,
    fontSize: 22,
    fontFamily: 'NotoSans-Regular',
    justifyContent: 'flex-start',
  },
  textSwitchSelectedValue: {
    color: '#FFF',
    marginTop: 8,
    fontSize: 25,
    fontFamily: 'NotoSans-Regular',
    justifyContent: 'flex-start',
  },
  textTitle: {
    color: '#FFF',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 25,
    marginLeft: 25,
    fontSize: 35,
    lineHeight: 50,
    fontFamily: 'NotoSans-Regular',
    alignSelf: 'center'
  },
  departureContainer: {
    marginLeft: 25
  },
  returnContainer: {
    marginLeft: 25,
    marginBottom: 25
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#8534DE'
  }
};

export default SetDateSession;
