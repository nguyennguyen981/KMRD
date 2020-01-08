import React,{Component} from 'react'
import {View,ImageBackground,ActivityIndicator,Picker,TouchableOpacity,ScrollView,Dimensions,Text,Image} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import SearchHeader from '../components/Home/SearchHeader';
import HotProduct from '../components/Home/HotProduct';
import Category from '../components/Home/Category';

export default class Homescreen extends Component{


  render(){
    return(
      <ImageBackground
      source={require('../src/Image/BackGround.jpg')}
      style={{width: '100%', height: '100%',resize:'contain'}}>
      <SearchHeader navigation={this.props.navigation}/>
      <ScrollView>
        <HotProduct navigation={this.props.navigation}/>
        <Category navigation={this.props.navigation}/>
      </ScrollView>
      </ImageBackground>
    );
  }
}
