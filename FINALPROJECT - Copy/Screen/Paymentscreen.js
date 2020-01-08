import React,{Component} from 'react';
import {Text,View,ImageBackground,ScrollView,TextInput,TouchableOpacity,FlatList,ActivityIndicator,Alert} from 'react-native';
import Header from '../components/Payment/Header';
import { connect } from 'react-redux'
import Firebase,{db} from '../Firebase/FirestoreConfig'

function Totalcalculate(cartItems){
  return (cartItems.reduce((total,i,index,cartItems)=>{
    return total+=i.Price*i.number
  },0)).toFixed(2)
}

class App extends Component{
  state = {
    isLoading:false,
      name: '',
      address: '',
      phone: '',
  }
  Sendorder=()=>{
    var data={}
    data.uid=this.props.userData.uid
    if(this.state.name!='')
    {data.name=this.state.name}
    else {
      data.name=this.props.userData.name
    }
    if(this.state.address!='')
    {data.address=this.state.address}
    else {
      data.address=this.props.userData.address
    }
    if(this.state.phone!='')
    {data.phone=this.state.phone}
    else {
      data.phone=this.props.userData.phone
    }
    data.total=Totalcalculate(this.props.cartItems)
    data.status='DELIVERY'
    data.detail=[]
    for(let i of this.props.cartItems)
    {
      var temp={}
      temp.Id=i.Id
      temp.Price=i.Price
      temp.Number=i.number
      data.detail.push(temp)
    }
    try {
        const user =db
            .collection('Order')
            .add(data)
      Alert.alert(
      '',
      'Success!',
      [
        {text: 'OK', onPress: () => {this.props.Clearcart()
        this.props.navigation.pop()}},
      ],
      {cancelable: false},
    );
    } catch (e) {
        alert(e)
    }
    this.setState({isLoading:false})
  }
  render(){
    return(
      <ImageBackground
      source={require('../src/Image/BackGround.jpg')}
      style={{width: '100%', height: '100%',resize:'contain'}}>
      {this.state.isLoading?
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="small" color="#00ff00" />
        </View>
      :
      <View style={{flex:1}}>
      <Header navigation={this.props.navigation}/>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Text style={{flex:4,textAlign:'center'}}>Reciver's Name</Text>
      <TextInput
          style={{flex:16}}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder={this.props.userData.name}
      />
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Text style={{flex:4,textAlign:'center'}}>Reciver's Phone</Text>
      <TextInput
        style={{flex:16}}
        value={this.state.phone}
        onChangeText={phone => this.setState({ phone })}
        placeholder={this.props.userData.phone}
        autoCapitalize='none'
      />
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Text style={{flex:4,textAlign:'center'}}>Reciver's Address</Text>
      <TextInput
        style={{flex:16}}
        value={this.state.address}
        onChangeText={address => this.setState({ address })}
        placeholder={this.props.userData.address}
        autoCapitalize='none'
      />
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Text style={{flex:4,textAlign:'center'}}>Name</Text>
      <Text style={{flex:4,textAlign:'center'}}>Price</Text>
      <Text style={{flex:4,textAlign:'center'}}>Number</Text>
      <Text style={{flex:4,textAlign:'center'}}>Total</Text>
      </View>
      <ScrollView>
      <FlatList
        data={this.props.cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
        <View style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
        <Text style={{flex:4,textAlign:'center'}}>{item.Name}</Text>
        <Text style={{flex:4,textAlign:'center'}}>{item.Price}</Text>
        <Text style={{flex:4,textAlign:'center'}}>{item.number}</Text>
        <Text style={{flex:4,textAlign:'center'}}>{item.number*item.Price}</Text>
        </View>
      }
      />
      <Text style={{textAlign:'right'}}>{'TOTAL :'+Totalcalculate(this.props.cartItems)}</Text>
      </ScrollView>
      <TouchableOpacity style={{
          marginTop: 30,
          marginBottom: 20,
          paddingVertical: 5,
          alignItems: 'center',
          backgroundColor: '#FFA611',
          borderColor: '#FFA611',
          borderRadius: 5,
      }}
      onPress={()=>{this.setState({isLoading:true}),this.Sendorder()}}>
          <Text >PAY</Text>
      </TouchableOpacity>
      </View>}
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Clearcart: () => dispatch({ type: 'CLEAR_CART'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
