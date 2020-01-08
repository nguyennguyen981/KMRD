import React,{Component} from 'react'
import {View,ActivityIndicator,Picker,TouchableOpacity,FlatList,StyleSheet,Image,Dimensions} from 'react-native'
import { Container, Icon, Text,Content,Thumbnail } from 'native-base';
import { category} from '../../src/Data/Category'

const numColumns = 3;

export default class Category extends Component{

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}
      onPress={()=>{this.props.navigation.navigate('Search',{searchvalue:'',category:item.name})}}>
        <Thumbnail square large source={item.image} />
      </TouchableOpacity>
    );
  };

    render(){
      return(
        <View style={{marginTop:10}}>
        <Text style={styles.text}>Category</Text>
        <FlatList
        data={category}
        renderItem={this.renderItem}
        numColumns={numColumns}/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    text:{
      fontFamily:'From Cartoon Blocks',
      textAlign: 'center',
      fontSize:40,
      color:'rgba(163, 11, 11,2)',
      marginBottom:-10,
    },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom:-10,
    height: Dimensions.get('window').width / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
