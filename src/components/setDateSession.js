/**
 * @Class:             SetDateSession.js
 * @Description:       Render Data of departure and return Page
 * @Author:            Guilherme Borges Bastos      @Date: 21/02/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 * Alberto Schiabel    11/03/2017  Refactored and split code
 */
import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

import { TripMonthSelection, TripDaySelection } from './SetDateSessionElements';
import ButtonNext from './ButtonNext';
import IconCalendar from '../images/icon-calendar.png';

// Later on in your styles..
const styles = {
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
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
    alignSelf: 'center',
  },
  departureContainer: {
    marginLeft: 25,
  },
  returnContainer: {
    marginLeft: 25,
    marginBottom: 25,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#8534DE',
  },
};

export default class SetDateSession extends Component {

  state = {
    date: '20/02/2017',
    dateReturn: '',
    dateMonth: 'February',
    dateReturnMonth: '',
    minDate: '21/02/2017',
    maxDate: '21/02/2019',
    monthDeparture: false,
  };

  onNextPress = () => {
    Actions.SetAirportSession();
  }

  updateDateMonth = (dateMonth) => {
    this.setState({
      dateMonth,
    });
  }

  updateDateReturnMonth = (dateReturnMonth) => {
    this.setState({
      dateReturnMonth,
    });
  }

  updateDate = (date) => {
    this.setState({
      date,
    });
  }

  updateDateReturn = (dateReturn) => {
    this.setState({
      dateReturn,
    });
  }

  renderMiddleContent = () => {
    const {
      dateMonth,
      dateReturnMonth,
      date,
      dateReturn,
      minDate,
      maxDate,
      monthDeparture,
    } = this.state;
    return (
      monthDeparture ?
        <TripMonthSelection
          dateMonth={dateMonth}
          dateReturnMonth={dateReturnMonth}
          minDate={minDate}
          maxDate={maxDate}
          updateDateMonth={this.updateDateMonth}
          updateDateReturnMonth={this.updateDateReturnMonth}
          iconCalendar={IconCalendar}
        /> :
        <TripDaySelection
          date={date}
          dateReturn={dateReturn}
          minDate={minDate}
          maxDate={maxDate}
          updateDate={this.updateDate}
          updateDateReturn={this.updateDateReturn}
          iconCalendar={IconCalendar}
        />
    );
  }

  renderSwitchContent() {
    const {
      switchContainer,
      textSwitchValue,
      textSwitchSelectedValue,
    } = styles;
    const { monthDeparture } = this.state;

    return (
      <View style={switchContainer}>
        <Text style={monthDeparture ? textSwitchValue : textSwitchSelectedValue}>Day</Text>
        <Switch
          style={{ marginTop: 10, marginBottom: 10 }}
          value={monthDeparture}
          onValueChange={newMonthDeparture =>
            this.setState({ monthDeparture: newMonthDeparture })
          }
        />
        <Text
          style={monthDeparture ?
            textSwitchSelectedValue :
            textSwitchValue
          }
        >
          Month
        </Text>
      </View>
    );
  }

  render() {
    const {
      linearGradient,
      textTitle,
    } = styles;

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

        <ButtonNext onPress={this.onNextPress}>
          Choose the airport
        </ButtonNext>
      </LinearGradient>
    );
  }
}
