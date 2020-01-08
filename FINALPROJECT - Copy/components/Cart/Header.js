import React,{Component} from 'react'
import {Text,View} from 'react-native'

export default class App extends Component{
  render(){
    return(
      <View style={{weight:'100%',height:30,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
        <Text style={{textalgin:'center'}}>
          CART
        </Text>
      </View>
    );
  }
}
