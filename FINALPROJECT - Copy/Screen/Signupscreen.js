import React from 'react'
import { ScrollView, TextInput, StyleSheet, TouchableOpacity, Text,Alert,ActivityIndicator,View } from 'react-native'
import AuthenConnect from '../Firebase/FirestoreConfig'

function errorMsg(error)
{
  console.log(error);
  Alert.alert('Some thing wrong',error.message);
}

class Signup extends React.Component {
    state = {
      isLoading:false,
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
    }
    check=()=>{if(this.state.isLoading) return true; else return false;}
    handleSignUp = async(errorMsg) => {
        const { email, password } = this.state
        const response = await AuthenConnect.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {errorMsg(error)})
          //console.log(response)
        if(response)
        {
          const user ={
                    Address:this.state.address,
                    Phone:this.state.phone,
                    Name:this.state.name,
                  }
          AuthenConnect.firestore().collection('User')
          .doc(response.user.uid)
          .set(user)
          Alert.alert('','Create success\nLogin for shopping',[{text: 'OK', onPress: () => this.props.navigation.navigate('Login')}]);
        }
        this.setState({isLoading:false})

    }

    render() {
        return (
          this.state.isLoading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="small" color="#00ff00" />
            </View>:
            <View style={styles.container}>
                <TextInput
                  style={styles.inputBox}
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                  placeholder='Email'
                  autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    placeholder='Full Name'
                />
                <TextInput
                  style={styles.inputBox}
                  value={this.state.phone}
                  onChangeText={phone => this.setState({ phone })}
                  placeholder='Phone'
                  autoCapitalize='none'
                />
                <TextInput
                  style={styles.inputBox}
                  value={this.state.address}
                  onChangeText={address => this.setState({ address })}
                  placeholder='Address'
                  autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isLoading:true}),this.handleSignUp(errorMsg)}}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default Signup
