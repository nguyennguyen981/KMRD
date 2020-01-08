import React,{Component} from 'react'
import {Text,View,ScrollView,FlatList} from 'react-native'
import { connect } from 'react-redux'
import Firebase,{db} from '../Firebase/FirestoreConfig'
import {Header,Left,Button,Body,Right,Icon,Title } from 'native-base'

function Item1({ title }) {
  return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <Text style={{flex:8,textAlign:'center'}}>{title.Id}</Text>
      <Text style={{flex:4,textAlign:'center'}}>{title.Number}</Text>
      <Text style={{flex:4,textAlign:'center'}}>{title.Price}</Text>
    </View>
  );
}

function Item({ title,tui }) {
  return (
    <View style={{marginVertical:10,borderWidth: 2}}>
      <Text >{"Order Number: "+title.Id}</Text>
      <Text>Detail:</Text>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{flex:8,textAlign:'center'}}>Item code</Text>
        <Text style={{flex:4,textAlign:'center'}}>Number</Text>
        <Text style={{flex:4,textAlign:'center'}}>Price</Text>
      </View>
      <FlatList
        data={title.data.detail}
        renderItem={({ item }) => <Item1 title={item} />}
        keyExtractor={item => item.Id}
      />
      <Text style={{textAlign:'right'}}>{'TOTAL: '+title.data.total+'$'}</Text>

    </View>
  );
}

class App extends Component{
  state = {
    data:[],
    tui:true,
  }
  Getdata = async ()=>
  {
    await db.collection('Order')
    .where('uid','==',this.props.uid)
    .onSnapshot(querySnapshot=>{
      let dataArray = [];
      querySnapshot.forEach(doc=>{
          dataArray.push({Id:doc.id,data:doc.data()});
      });
      //console.log(dataArray);
      this.setState({data:dataArray})
  })
}
  render(){
    return(
      <View>
      <Header searchBar style={{backgroundColor:'#00BFFF',justifyContent:'center',}}>
        <Left >
          <Button iconLeft transparent>
            <Icon name='arrow-back' onPress={()=>{this.props.navigation.goBack()}}/>
          </Button>
        </Left>
        <Body>
          <Title style={{textAlign:'center'}}>HISTORY</Title>
        </Body>
      </Header>
      <ScrollView>
      <FlatList
      data={this.state.data}
      keyExtractor={item => item.Id}
      renderItem={({ item }) => <Item title={item} />
      }
      />
      </ScrollView>
      </View>
    );
  }

componentDidMount()
{
  this.Getdata()
}

}

const mapStateToProps = (state) => {
    return {
        uid: state.userData.uid
    }
}

export default connect(mapStateToProps)(App);
