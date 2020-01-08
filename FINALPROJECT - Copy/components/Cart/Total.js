import React,{Component} from 'react'
import {View,TouchableOpacity,Text,ToastAndroid} from 'react-native'
import { connect } from 'react-redux'

function Totalcalculate(cartItems){
  return (cartItems.reduce((total,i,index,cartItems)=>{
    return total+=i.Price*i.number
  },0)).toFixed(2)
}

class App extends Component{
  constructor(props) {
  super(props);
  this.state = ({
    value:Totalcalculate(this.props.cartItems)
    });
  }
  Handleclick=()=>{
    if(this.props.cartItems.length<=0)
    {
      ToastAndroid.show('Nothing in cart', ToastAndroid.SHORT)
      return
    }
    if (this.props.uid==='') {
      ToastAndroid.show('Login for continues', ToastAndroid.SHORT)
      return
    }
    else this.props.navigation.navigate('Payment')
  }
  render(){
    return(
      <TouchableOpacity style={{weight:'100%',height:30,justifyContent:'center',alignItems:'center',backgroundColor:'blue'}}
      onPress={()=>{this.Handleclick()}}>
        <Text>{"TOTAL PAYMENT : "+Totalcalculate(this.props.cartItems)}</Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
        uid:state.userData.uid,
    }
}

export default connect(mapStateToProps)(App);
