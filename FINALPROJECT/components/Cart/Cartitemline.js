import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import NumericInput from 'react-native-numeric-input'

 class Temp extends React.Component{
  constructor(props) {
  super(props);
  this.state = ({
    value:this.props.data.number,
    });
  }
  render(){
    return(

      <View
      style={{
      height:70,
      weight:'100%',
      flex:1,
      flexDirection:'row',
      borderWidth: 2,
      marginVertical: 8,
      marginHorizontal: 16,
      justifyContent:'center',
        }}
      >
      <FastImage source={{uri: this.props.data.ImageUrl[0],headers: { Authorization: 'someAuthToken' },
      priority: FastImage.priority.normal,}} style={{flex:4,marginLeft:1}} resizeMode={FastImage.resizeMode.contain} />
      <View style={{flex:9,justifyContent:'space-around'}}>
      <Text style={{textAlign:'center' }} numberOfLines={2}>{'Name: '+this.props.data.Name+this.props.data.number}</Text>
      <Text style={{textAlign:'center'}} >{'Price: '+this.props.data.Price}</Text>
      </View>
      <View style={{flex:7,alignItems:'stretch',justifyContent:'space-around'}}>
      <NumericInput
          value={this.state.value}
          onChange={value => {
            this.props.ChangeItemNumber(this.props.data,value)
            this.setState({value:value})}}
          onLimitReached={(isMax,msg) => console.log(isMax,msg)}
          iconSize={25}
          minValue={1}
          totalWeight={100}
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70' containerStyle={{flex:7,marginVertical:3}}/>
      <TouchableOpacity
      style={{flex:3,height:'50%',alignItems:'center',justifyContent:'center',backgroundColor:'red',marginRight:8,marginLeft:1,marginBottom:2}}
      onPress={()=>{this.props.RemoveItem(this.props.data)}}>
      <Text >DELETE</Text>
      </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        RemoveItem: (product) => dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: product }),
        ChangeItemNumber: (product,value) => dispatch({ type: 'CHANGE_ITEMNUMBER', payload: product,number:value })
    }
}

export default connect(null,mapDispatchToProps)(Temp);
