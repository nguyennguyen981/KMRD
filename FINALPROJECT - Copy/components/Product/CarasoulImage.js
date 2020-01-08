import React,{Component} from 'react';
import {Text,View,TouchableOpacity,Image,Dimensions,  StyleSheet,ScrollView,ImageBackground} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Container, Header, Left, Body, Right, Title,Button,Icon } from 'native-base';
import FastImage from 'react-native-fast-image'

const { width: screenWidth } = Dimensions.get('window')

export default class MainScreen extends Component{

  _renderItem ({item, index}) {
      return (
          <View style={styles.item}>
          <FastImage source={{uri: item,headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,}} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
          </View>
      );
  }

  render(){
    return(
    <Carousel
    sliderWidth={screenWidth}
    itemWidth={screenWidth - 60}
    data={this.props.data}
    renderItem={this._renderItem}
    />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 80,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    flex: 1,

  },
  image: {
      flex:1,
      ...StyleSheet.absoluteFillObject,
        resizeMode: 'center',
        width:'100%',
        height:'100%',
        backgroundColor: 'transparent',
        borderRadius: 8,
  },
})
