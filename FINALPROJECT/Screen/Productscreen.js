import React,{Component} from 'react';
import {View,ImageBackground,TouchableOpacity,ScrollView,Dimensions,Text,Image} from 'react-native'
import HeaderBar from '../components/Product/HeaderBar';
import CarasoulImage from '../components/Product/CarasoulImage';
import {Content,Body,Right,Item} from 'native-base'
import Icon from 'react-native-vector-icons/Fontisto';

export default class Productscreen extends Component{
  constructor(props) {
    super(props);
    this.state={data:(this.props.navigation.getParam('data')),
  }
  }

  render(){
    return(
      <ImageBackground
      source={require('../src/Image/BackGround.jpg')}
      style={{width: '100%', height: '100%',resize:'contain'}}>
      <ScrollView style={{flex:1}}>
      <HeaderBar navigation={this.props.navigation} name={this.state.data.Name}/>
      <CarasoulImage data={this.state.data.ImageUrl}/>
      <Text style={{textAlign:'center',}}>{this.state.data.Name}</Text>
      <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-around',alignItems:'center'}}>
          <Text >{'Price: '+this.state.data.Price+'$'}</Text>
            <Icon.Button name="shopping-basket-remove" size={40} onPress={()=>console.log('nhan duoc ')}/>
      </View>
      <Text>{'       Mo ta:\n       '+this.state.data.Content}</Text>
      </ScrollView>
      </ImageBackground>
    );
  }
}
