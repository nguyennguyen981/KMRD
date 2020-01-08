import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
  ,Alert
} from 'react-native';
import { connect } from 'react-redux'
import AuthenConnect from '../Firebase/FirestoreConfig'

class Profile extends Component {
  componentDidMount(){
      try {
    const user = AuthenConnect.firestore()
        .collection('User')
        .doc(this.props.userData.uid)
        .onSnapshot(querySnapshot=>{
          this.props.userlogin(querySnapshot.data().Name,querySnapshot.data().Phone,
        querySnapshot.data().Address,)
        })
} catch (e) {
    alert(e)
}}
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{'Name:'+this.props.userData.name}</Text>
              <Text style={styles.info}>{'Address:'+this.props.userData.address}</Text>
              <Text style={styles.description}>{'Phone:'+this.props.userData.phone}</Text>


              <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.props.navigation.navigate('History')}}>
                <Text>ORDER HISTORY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.props.userlogout(),this.props.navigation.navigate('Authentication')}}>
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userlogin:(name,phone,address) =>dispatch({ type: 'USER_LOGIN', name:name,phone:phone,address:address }),
        userlogout:() =>dispatch({ type: 'USER_LOGOUT'}),
    }
}

const mapStateToProps = (state) => {
    return {
        userData:state.userData,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
    textAlign:'center',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
