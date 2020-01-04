import React,{Component} from 'react';
import {View,ImageBackground,ActivityIndicator,Picker,TouchableOpacity,ScrollView,Image,Dimensions,FlatList,Alert} from 'react-native';
import { Container, Header, Content, Thumbnail, Text, Left, Body, Right, Button,Icon,Input,Item } from 'native-base';
import Firestore from '../Firebase/FirestoreConfig'
import FastImage from 'react-native-fast-image'
import Icon1 from 'react-native-vector-icons/Fontisto';

const { width: screenWidth } = Dimensions.get('window')

function GetData(SomeFunction,setLoading,searchvalue,category){
  var array=searchvalue.toUpperCase().split(' ');
  array=array.filter(item=>
    { return item!=''
  });
  var firestore=Firestore.collection('Products');
  var s='';
  if(category!='ALL')
  {
    firestore=firestore.where('Category', '==', category);
  }
  else if (searchvalue==='') {
    console.log('da qua day');
    setLoading();
    return Alert.alert(
      'Select category or input search'
    );
  }
  for(let i=0;i<array.length;i++)
  {
    s ='Search.'+array[i];
    firestore=firestore.where(s, '==', true);
  }
  firestore
  .get()
  .then(querySnapshot=>{
    let dataArray = [];
    querySnapshot.forEach(doc=>{
        dataArray.push({Name:doc.data().Name,
          Id:doc.id,
          Price:doc.data().Price,
          Content:doc.data().Content,
          ImageUrl:doc.data().ImageUrl});
    });
    setLoading();
    SomeFunction(dataArray);
  });
}


export default class SearchHeader extends Component{
  constructor(props) {
  super(props);
  this.state = ({
    IsLoading:true,
    data:[],
    searchvalue:this.props.navigation.getParam('searchvalue'),
    category:this.props.navigation.getParam('category'),
    });
  }

  setLoading=()=>{this.setState({IsLoading:false})}

  onTextChange = (value) => {this.setState({ searchvalue:value })}

  SetHotItemData=dataArray=> {
        this.setState({data: dataArray});

      }

  componentDidMount(){
    //console.log(this.props)
    GetData(this.SetHotItemData,this.setLoading,this.state.searchvalue,this.state.category);

  }

  render(){
    return(
      <ImageBackground
      source={require('../src/Image/BackGround.jpg')}
      style={{width: '100%', height: '100%',resize:'contain'}}>
      <Header searchBar style={{backgroundColor:'transparent'}}>
        <Button iconLeft transparent style={{flex:2,marginLeft:-5}}>
          <Icon name='arrow-back' onPress={()=>{this.props.navigation.goBack()}}/>
        </Button>
        <Item style={{flex:14,borderRadius:12}}>
          <Icon name="ios-search" />
          <Input placeholder="Search"
          value={ this.state.searchvalue }
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
        onPress={()=>{{this.setState({IsLoading:true});GetData(this.SetHotItemData,this.setLoading,this.state.searchvalue,this.state.category);}}}
        >
          <Text style={{ fontSize: 18 }}>Search</Text>
        </TouchableOpacity>
      </Header>
      {this.state.IsLoading ?
      <View style={{width: '100%', height: '100%',justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="small" color="#0000ff" style={{marginBottom:20}}/>
      </View>
      :
      <ScrollView>
      {this.state.data.length!=0? <FlatList
      data={this.state.data}
      renderItem={({ item }) => (
        <View
        style={{
        marginVertical: 8,
        marginHorizontal: 16,
        height:70,
        flex:1,
        flexDirection:'row',
        borderWidth: 2,
      }}
    >
    <TouchableOpacity style={{flex:16,flexDirection:'row'}} onPress={() => this.props.navigation.navigate('Product',{data:item})}>
    <FastImage source={{uri: item.ImageUrl[0],headers: { Authorization: 'someAuthToken' },
    priority: FastImage.priority.normal,}} style={{flex:4}} resizeMode={FastImage.resizeMode.contain} />
    <View style={{flex:12,justifyContent:'space-around'}}>
    <Text style={{textAlign:'center' }} numberOfLines={2}>{'Name: '+item.Name}</Text>
    <Text style={{textAlign:'center'}} >{'Price: '+item.Price}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity style={{flex:4,justifyContent:'center',alignItems:'center'}}>
      <Icon1.Button name="shopping-basket-remove" size={30} onPress={()=>console.log('nhan duoc ')}/>
    </TouchableOpacity>
    </View>
      )}
      keyExtractor={item => item.id}
    />:
    <View style={{width: '100%', height: '100%',alignItems:'center'}}>
      <Text>
      No matching found
      </Text>
    </View>
    }
        </ScrollView>}
      </ImageBackground>
    );
  }


}
