import React from 'react';
import firebase from 'react-native-firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import InputScrollView from 'react-native-input-scroll-view';
import { Alert, View, Text, Image, TextInput, Dimensions, StyleSheet, ActivityIndicator} from 'react-native'
import SideMenu from 'react-native-side-menu';
import Menu from './../menu/Menu';


const image = require('./../menu/assets/menu.png');

export default class Friday extends React.Component {

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
  
    else if(item === 'About')
    {
        this.props.navigation.navigate('About');
    }
  
    else if (item === 'Friday'){
          this.props.navigation.navigate('Friday');
        }
  }
   
    static navigationOptions =({ navigation }) => {
      return {
      title: 'Friday',
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
        return(
        <View style={styles.container}>
           <Text>Burası Friday</Text>
        </View>
        
        );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })