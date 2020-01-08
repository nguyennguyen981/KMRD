import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    ImageBackground

} from "react-native";
import { connect } from 'react-redux'
import NumericInput from 'react-native-numeric-input'
import Cartitemline from '../components/Cart/Cartitemline'
import Total from '../components/Cart/Total'
import Header from '../components/Cart/Header'


class Temp extends React.Component{
  constructor(props) {
  super(props);
  this.state = ({
    value:1,
    });
  }
  render(){
    return(
      <ImageBackground
      source={require('../src/Image/BackGround.jpg')}
      style={{width: '100%', height: '100%',resize:'contain'}}>
      <ScrollView>
      {
        this.props.cartItems.length > 0 ?
        <FlatList
          data={this.props.cartItems}
          renderItem={({ item }) => <Cartitemline data={item}/>}
          keyExtractor={item => item.id}
        />
        : <Text>No items in your cart</Text>
      }
    </ScrollView>
    <Total navigation={this.props.navigation}/>
    </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems
    }
}

export default connect(mapStateToProps)(Temp);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
