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
import Hyperlink from 'react-native-hyperlink'
import {strings} from './../components/Localization';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const image = require('./../menu/assets/menu.png');

export default class About extends React.Component {

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
    
      else if (item === 'Trash'){
        this.props.navigation.navigate('Trash');
      }
          
      else if (item === 'Profile'){
        this.props.navigation.navigate('Profile');
      }
  }
   
    static navigationOptions =({ navigation }) => {
      return {
      title: strings.aboutJs.title,
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
        <Text style={{fontSize: 50, fontWeight: 'bold', color: '#8c52ff',}}>
          TWAS
        </Text>

        <Text style={{color: 'blue'}}>
          Think!
          <Text style={{color: 'green'}}> Write!</Text>
          <Text style={{color: 'red'}}> Access!</Text>
        </Text>
        </View>

      <View style={styles.thirdrow}>
          <Text>
        {strings.aboutJs.text}
          </Text>
          <Text style={{fontSize: 25, color: '#8c52ff', fontWeight: 'bold' }}>
            <Text style={{color: 'black', fontSize: 15}}>{strings.aboutJs.takeNote} {""}
            </Text>
            TWAS 
            <Text style={{color: 'black', fontSize: 15}}> {""} {strings.aboutJs.thankYou}.</Text>
          </Text>
      </View>

      <View style={styles.fourthrow}>
          <Text style={{fontSize: 20, fontWeight: 'bold',}}>
          {strings.aboutJs.support}
          </Text>
          <Text>
          {strings.aboutJs.sendMessage}
            {"\n"}
          </Text>

          <Hyperlink
    linkStyle={ { color: '#2980b9', fontSize: 18 } }
    linkDefault={true}
    linkText={ url => url === '  http://www.fridayteam23.com' ? 'Friday Team' : url }
   >
  
    <Text style={{fontSize:18, marginTop:10, textAlign:'center'}}>
      http://www.fridayteam23.com
    </Text>
  </Hyperlink>

  <Hyperlink
    linkStyle={ { color: '#2980b9', fontSize: 18 } }
    linkDefault={true}
    linkText={ url => url === 'https://www.instagram.com/fridayteam23' ? '@fridayteam23' : url }
   >
    <Text style={{fontSize:18, marginTop:10, textAlign:'center'}}>
      https://www.instagram.com/fridayteam23
    </Text>
  </Hyperlink>

     
          
          <Text>

          </Text>
          
      </View>


        </SideMenu>
        );
}
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      //justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor:'white',
      top: 28,
      
    }, 

    thirdrow:{
      textAlign: 'center',
      width: 390,
      left: 15,
      backgroundColor:'white',
      color: 'black'
    },

    fourthrow: {
      flex: 1,
      backgroundColor:'white',
      justifyContent: 'flex-end',
      left: 15,
    },
  })