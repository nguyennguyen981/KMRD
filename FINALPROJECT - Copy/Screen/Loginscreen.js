import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button,ActivityIndicator,Alert } from 'react-native'
import AuthenConnect from '../Firebase/FirestoreConfig'
import { connect } from 'react-redux'

function errorMsg(error)
{
  console.log(error);
  Alert.alert('Some thing wrong',error.message);
}

class Login extends React.Component {
    state = {
        isLoading:false,
        email: '',
        password: ''
    }

    handleLogin = async(errorMsg) => {
        const { email, password } = this.state
        const response = await AuthenConnect.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {errorMsg(error)})
          //console.log(response)
        if(response)
        {
          console.log(response.user.uid);
          this.props.Setuid(response.user.uid);
        }
        this.setState({isLoading:false})

    }

    render() {
        return (
          this.props.uid?this.props.navigation.navigate('Profile'):null,
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
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isLoading:true}),this.handleLogin(errorMsg)}}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Button title="Don't have an account yet? Sign up" onPress={()=>this.props.navigation.navigate('Signup')}/>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Setuid: (product) => dispatch({ type: 'SET_UID', uid: product }),
    }
}

const mapStateToProps = (state) => {
    return {
        uid:state.userData.uid,
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
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);
