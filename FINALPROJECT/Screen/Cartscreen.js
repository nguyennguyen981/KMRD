import * as React from 'react';
import { Button, View, Text,Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input'

export default class Temp extends React.Component{
  constructor(props) {
  super(props);
  this.state = ({
    value:1,
    });
  }
  render(){
    return(
      <NumericInput
          value={this.state.value}
          onChange={value => this.setState({value})}
          onLimitReached={(isMax,msg) => console.log(isMax,msg)}
          totalWidth={100}
          totalHeight={70}
          iconSize={25}
          minValue={1}
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
    );
  }
}
