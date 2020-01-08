import React,{Component} from 'react';
import {View,ImageBackground,ActivityIndicator,Picker,TouchableOpacity,ScrollView,Image,Dimensions,Alert} from 'react-native';
import { Container, Header, Item, Input, Icon, Text,Content } from 'native-base';

function check(searchvalue,category)
{
  if (searchvalue==''&&category=='ALL') {
    return false
  } else {
    return true
  }
}

export default class SearchHeader extends Component{
  constructor(props) {
  super(props);
  this.state = ({
    searchvalue:'',
    category:'ALL'
    });
  }

  onTextChange = (value) => {this.setState({ searchvalue:value })}
  
  render(){
    return(
      <Header searchBar style={{backgroundColor:'transparent'}}>
        <Item style={{flex:16,borderRadius:12}}>
          <Icon name="ios-search" />
          <Input placeholder="Search"
          value={ this.state.value }
          onChangeText={ this.onTextChange }/>
          <Picker
            mode='dropdown'
            selectedValue={this.state.category}
            style={{height: '100%', width: '30%'}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({category: itemValue})
            }>
            <Picker.Item label="ALL" value="ALL" />
            <Picker.Item label="CPU" value="CPU" />
            <Picker.Item label="RAM" value="RAM" />
            <Picker.Item label="MAIN" value="MAIN" />
            <Picker.Item label="PSU" value="PSU" />
            <Picker.Item label="VGA" value="VGA" />
            <Picker.Item label="SSD" value="SSD" />
          </Picker>
        </Item>
        <TouchableOpacity style={{flex:4,justifyContent: 'center',alignItems: 'center',borderRadius:12,backgroundColor:'#4ddbff',
        height:'70%',marginTop:8,marginLeft:10}}
        onPress={()=>{check(this.state.searchvalue,this.state.category)?
          this.props.navigation.navigate('Search',{searchvalue:this.state.searchvalue,category:this.state.category})
        :Alert.alert(
          'Select category or input search'
        )}}
        >
          <Text style={{ fontSize: 18 }}>Search</Text>
        </TouchableOpacity>
      </Header>
    );
  }
}
