import React,{Component} from 'react';
import {Header,Left,Button,Body,Right,Icon,Title } from 'native-base'

export default class HeaderBar extends Component{
  constructor(props) {
  super(props);
}
  render(){
    return(
      <Header searchBar style={{backgroundColor:'transparent',justifyContent:'center',}}>
        <Left >
          <Button iconLeft transparent>
            <Icon name='arrow-back' onPress={()=>{this.props.navigation.goBack()}}/>
          </Button>
        </Left>
        <Body>
          <Title style={{textAlign:'center'}}>PAYMENT</Title>
        </Body>
      </Header>
    );
  }
}
