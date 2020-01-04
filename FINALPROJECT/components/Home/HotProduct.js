import React,{Component} from 'react'
import Firestore from '../../Firebase/FirestoreConfig'
import {View,ImageBackground,ActivityIndicator,Picker,TouchableOpacity,ScrollView,Dimensions,StyleSheet,Image,Toast} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { Container, Header, Item, Input, Icon, Text,Content} from 'native-base';
import FastImage from 'react-native-fast-image'

const { width: screenWidth } = Dimensions.get('window')

function GetData(SomeFunction){
  Firestore.collection('Products')
  .where('Hot','==',true)
  .onSnapshot(querySnapshot=>{
    let dataArray = [];
    querySnapshot.forEach(doc=>{
        dataArray.push({Name:doc.data().Name,
          Id:doc.id,
          Price:doc.data().Price,
          Content:doc.data().Content,
          ImageUrl:doc.data().ImageUrl});
    });
    SomeFunction(dataArray);
  });
}


export default class HotProduct extends Component{
  constructor(props) {
  super(props);
  this.state = ({
      HotItem:[],
      IsLoading:true,
  });  }

  _renderItem = ({item, index}) => {
    //console.log(item.ImageUrl[0])
      return (
          <TouchableOpacity style={styles.item}
          onPress={() => this.props.navigation.navigate('Product',{data:item})}>
            <FastImage source={{uri: item.ImageUrl[0],headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,}} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
            <Text style={styles.name}>{item.Name}</Text>
          </TouchableOpacity>
      );
  }

  SetHotItemData=dataArray=> {
        this.setState({HotItem: dataArray,IsLoading:false});
        //console.log(this.state.HotItem)
      }

  componentDidMount(){
    //console.log(this.props)
    GetData(this.SetHotItemData);

  }

  render(){
    return(
      <Content style={{flex: 1,marginTop:10}}>
      <Text style={styles.text}>
      What hot??
      </Text>
      {this.state.IsLoading ?
      <View style={{width: '100%', height: '100%',justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="small" color="#0000ff" style={{marginBottom:20}}/>
      </View>
      :
      <View style={{marginTop:-20}}>
      <Carousel
            data={this.state.HotItem}
            renderItem={this._renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth-60}
          />
      </View>}
      </Content>
    );
  }

}

const styles = StyleSheet.create({
  text:{
    fontFamily:'From Cartoon Blocks',
    textAlign: 'center',
    fontSize:40,
    color:'rgba(163, 11, 11,2)'
  },
  name:{
    marginTop:250,
    textAlign: 'center',
    fontFamily:'GeForce-Bold',
    color:'rgba(0,0,0,0.7)',
    fontSize:20,
    fontWeight: 'bold',
  },
  item: {
    flex:1,
    width: screenWidth - 60,
    height: screenWidth - 80,
  },
  image: {
      flex:1,
      ...StyleSheet.absoluteFillObject,
        resizeMode: 'center',
        width:'100%',
        height:'100%',
        backgroundColor: 'transparent',
        borderRadius: 8,
  },
})
