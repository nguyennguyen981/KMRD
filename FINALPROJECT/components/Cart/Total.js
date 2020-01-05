import React,{Component} from 'react'
import {View,TouchableOpacity,Text} from 'react-native'
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
  render(){
    return(
      <TouchableOpacity style={{weight:'100%',height:30,justifyContent:'center',alignItems:'center',backgroundColor:'blue'}}>
        <Text>{"TOTAL PAYMENT : "+Totalcalculate(this.props.cartItems)}</Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

export default connect(mapStateToProps)(App);
