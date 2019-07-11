import React from 'react'
import { TouchableHighlight, StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'
import {NavigationActions} from 'react-navigation'
import ItemComponent from '../components/ItemComponent'
import {Button} from 'react-native-elements'
import { Icon } from 'react-native-elements'

import SideMenu from 'react-native-side-menu';
import Menu from './../menu/Menu'

const image = require('./../menu/assets/menu.png');

export default class Main extends React.Component {
   // state = {}

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
  
  git = () => {
  
      this.props.navigation.navigate('Addnote', {num:this.state.numChild});
      /*
      {this.state.items.length > 0 ? (
        <ItemComponent items={this.state.items} />
      ) : (
        <Text>No items</Text>
      )}*/

  }


  _onPressButton=(itemq, itemk, itemc, itemt)=>{
      this.props.navigation.navigate('Show', { data: itemq, notkey: itemk, noteBgColor:itemc, noteTitle:itemt});
  }


  componentDidMount() {
    //menünün açılması için Params olarak fonksiyonu tanıtmak gerekiyormuş.
    this.props.navigation.setParams({ toggle: this.toggle });


    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    const referans = "/Users/"+currentUser.uid;
    firebase.database().ref(referans).orderByKey().limitToLast(10000).on('value', snapshot => {

      snapshot.forEach((child) => {

        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });

       //   const numChild = snapshot.numChildren();
        //  this.setState({ numChild });
      //  alert(snapshot.numChildren());

        let key = child.key;
        let son = Object.values(key);
        this.setState({ son });
      })
    });
  }


  cik = () =>{
      firebase.auth().signOut();
  }

  readDataUser = ()=>{
      alert(this.state.son)
  }

/* Menu START*/
toggle() {
  this.setState({
    isOpen: !this.state.isOpen,
  });
}

updateMenuState(isOpen) {
  this.setState({ isOpen });
}

onMenuItemSelected = item =>
  this.setState({
    isOpen: false,
    selectedItem: item,
  });



  static navigationOptions =({ navigation }) => {
    return {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'orange',
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


/*Menu END */
  render() {
      const { currentUser } = this.state
      const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

  return (
    <SideMenu
    menu={menu}
    isOpen={this.state.isOpen}
    onChange={isOpen => this.updateMenuState(isOpen)}
  >
    <View style={styles.container}>
      <ScrollView  style={styles.ScrollContainer} >
        <View style={styles.itemsList}>
          {this.state.items.map((item, index) => {
          
            return (  
              <View  key={index}>
                <TouchableOpacity style={{  margin: 3,
                   width: Dimensions.get('window').width / 2 -10,
                   height: 200,
                   borderWidth: 0.9,
                   borderColor: '#ddd',
                   //shadowColor: 'black',
                   //shadowOpacity: .2,
                  // shadowRadius: 2,
                  borderRadius:10,
                   color:'black',
                   backgroundColor: item.noteBgColor}}  onPress={this._onPressButton.bind(this, item.not, item.yazid, item.noteBgColor, item.noteTitle)} underlayColor="white">
                
                  <Text style={{marginLeft:4, padding:2,marginTop:10, maxHeight:190}}> 
                   <Text style={{fontWeight:'bold', fontSize:18}}>{"  "}{item.noteTitle}{" \n "}</Text>
                  
                   
                  {item.not}</Text>
                </TouchableOpacity>
              </View>
            );
          }
        )
      }
        </View>
      </ScrollView>

      <View style={{flexDirection: 'row', zIndex:50}}>
       <TouchableOpacity style={styles.savebutton  }
       onPress={this.git}>
      <Text>      Not alın...</Text>
       </TouchableOpacity>

        </View>
</View>

      </SideMenu>
    )
  }
}

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
        
    },

  
  ScrollContainer:{
      flex: 1,
      },


  itemsList: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 2,
  },


  savebutton:{
    width:Dimensions.get('window').width / 1-15,
    marginBottom:3, 
    borderColor:'gray', 
    marginBottom:8,
    borderWidth:2,
    paddingVertical:8,
    marginVertical:8,
    borderRadius:15,
  },

  savecontainer:{
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 13,
      width:80,
      marginRight: Dimensions.get('window').width / 1-100,
      
  },
})


//borderWidth:2,
   // width:3,
   // marginRight:90,
   // backgroundColor:'#db3434', 
    //paddingVertical:18,
    //paddingHorizontal:195,
  //  marginVertical:8,
   // borderRadius:15,
   // shadowColor:'purple',
   // shadowOpacity:.8,
   // shadowRadius:3,
   // shadowOffset:{width:0, height:0},
   // elevation:8