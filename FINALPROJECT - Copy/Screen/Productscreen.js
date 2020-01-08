import React,{Component} from 'react';
import {View,ImageBackground,TouchableOpacity,ScrollView,Dimensions,Text,Image,ToastAndroid} from 'react-native'
import HeaderBar from '../components/Product/HeaderBar';
import CarasoulImage from '../components/Product/CarasoulImage';
import {Content,Body,Right,Item} from 'native-base'
import Icon from 'react-native-vector-icons/Fontisto';
import { connect } from 'react-redux'

function IsInCart(cartItems,item)
{
  for(let i of cartItems)
  {
    if(i.Id===item.Id)
    return true;
  }
  return false;
}

function Rightwaytoshowtoast(somefunction,item,sometoast)
{
  somefunction(item);
  ToastAndroid.show(sometoast, ToastAndroid.SHORT)
}

class Productscreen extends Component{
  constructor(props) {
    super(props);
    this.state={
      data:(this.props.navigation.getParam('data')),
      itemcart:'',
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
          {
            IsInCart(this.props.cartItems,this.state.data)?
            <Icon.Button name='shopping-basket-remove' size={40}
            iconStyle={{marginHorizontal: 10}}
            onPress={()=>Rightwaytoshowtoast(this.props.RemoveItem,this.state.data,'Item remove success !')}/>
            :<Icon.Button name='shopping-basket' size={40}
            iconStyle={{marginHorizontal: 10}}
            onPress={()=>Rightwaytoshowtoast(this.props.AddItem,this.state.data,'Item add success !')}/>
          }
      </View>
      <Text>{'       Mo ta:\n       '+this.state.data.Content}</Text>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AddItem: (product) => dispatch({ type: 'ADD_ITEM_TO_CART', payload: product }),
        RemoveItem: (product) => dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: product })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Productscreen);
