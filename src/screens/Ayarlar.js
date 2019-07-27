import React from 'react'
import { TouchableHighlight, StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'
import {NavigationActions} from 'react-navigation'
import ItemComponent from '../components/ItemComponent'
import {Button} from 'react-native-elements'
import { Icon } from 'react-native-elements'
import SideMenu from 'react-native-side-menu';
import Menu from './../menu/Menu';


const image = require('./../menu/assets/menu.png');

export default class Ayarlar extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    
    this.state = {
      isOpen: false,
      selectedItem: 'About',
      currentUser: null , 
      items : [], 
      son: [], 
      numChild:null
    };
  }


  componentDidMount() {
    //menünün açılması için Params olarak fonksiyonu tanıtmak gerekiyormuş.
    this.props.navigation.setParams({ toggle: this.toggle });
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  
  onMenuItemSelected= (item) =>{
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  
        if(item === 'Ana Sayfa'){
        this.props.navigation.navigate('Main');
        }

        else if(item === 'Arsiv')
        {
            this.props.navigation.navigate('Arsiv');
        }
    
        else if(item === 'About')
        {
            this.props.navigation.navigate('About');
        }
    
        else if (item === 'Friday'){
            this.props.navigation.navigate('Friday');
            }

        else if (item === 'Ayarlar'){
            this.props.navigation.navigate('Ayarlar');
            }
            else if (item === 'Profile'){
              this.props.navigation.navigate('Profile');
          }
        }
  

static navigationOptions =({ navigation }) => {

      return {
        title: 'Ayarlar',
        headerStyle: {
            backgroundColor: '#8c52ff',
        },

        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },

      headerLeft: (
       <TouchableOpacity style={{marginLeft: 10 }} onPress={navigation.getParam('toggle')}>
            <Image
              source={image}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
      )
      }
}

   render(){

    const { currentUser } = this.state
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

        return(
        <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            onChange={isOpen => this.updateMenuState(isOpen)}>

        <View style={styles.container}>
           <Text>Burası Ayarlar Sayfası</Text>
        </View>
        </SideMenu>
        );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white',
    },
    ScrollContainer:{
        flex: 1,
        },

        savecontainer:{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 13,
            width:80,
            marginRight: Dimensions.get('window').width / 1-100,
            
        },
  })