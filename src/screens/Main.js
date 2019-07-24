import React from 'react'
import { TouchableHighlight, StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'
import {NavigationActions} from 'react-navigation'
import ItemComponent from '../components/ItemComponent'
import {Button} from 'react-native-elements'
import { Icon } from 'react-native-elements'

import copkutusu from './copkutusu'
import arcieve from './arcieve'
 
import SideMenu from 'react-native-side-menu';
import Menu from './../menu/Menu'
import Modal from "react-native-simple-modal";

import {strings} from './../components/Localization';

<Modal
  animationDuration={2000}
  animationTension={40}
  closeOnTouchOutside={true}
  containerProps={undefined}
  containerStyle={{
    justifyContent: "center"
  }}
  disableOnBackPress={false}
  modalDidClose={() => undefined}
  modalDidOpen={() => undefined}
  modalProps={undefined}
  modalStyle={{
    borderRadius: 2,
    margin: 20,
    padding: 10,
    backgroundColor: "#F5F5F5"
  }}
  offset={0}
  open={false}
  overlayStyle={{
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    flex: 1
  }}
/>;

//import SideMenu from 'react-native-side-menu';
//import Menu from './../menu/Menu';



const image = require('./../menu/assets/menu.png');

export default class Main extends React.Component {
  state = { open: false };

  modalDidOpen = () => console.log("Modal did open.");

  modalDidClose = () => {
    this.setState({ open: false });
    console.log("Modal did close.");
  };

  sil = () => this.props.navigation.navigate('copkutusu');

  arsivle = () => this.props.navigation.navigate('arcieve');

  openModal = (noteKey) => {
    this.setState({ open: true });
    this.setState({noteKey:noteKey})
  }

  gonder = () => this.setState({ open: false });


    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);

      this.state = {
        isOpen: false,
        selectedItem: 'About',
        currentUser: null , 
        items : [], 
        son: [], 
        numChild:null,
        noteKey:null,
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

 updatePlaceId=(placeId)=>{
  const { currentUser } = firebase.auth();
  this.setState({ currentUser });
 const mail = currentUser.email;
 const noteItemKey = this.state.noteKey;

 const ref ="Users/"+currentUser.uid+"/"+noteItemKey;
  firebase.database().ref(ref).update({
     placeId:placeId,
  }).then((data)=>{
      //success callback
    // alert("Başarılı");
   //this.props.navigation.navigate('Arsiv');
  }).catch((error)=>{
      //error callback
      alert(error);
  })

  this.setState({open:false})
 }


  componentDidMount() {
    //menünün açılması için Params olarak fonksiyonu tanıtmak gerekiyormuş.
    this.props.navigation.setParams({ toggle: this.toggle });
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    const referans = "/Users/"+currentUser.uid;
    firebase.database().ref(referans).orderByChild('placeId').equalTo(1).on('value', snapshot => {
      snapshot.forEach((child) => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });
      //  const numChild = snapshot.numChildren();
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
      
  else if (item === 'Ayarlar'){
        this.props.navigation.navigate('Ayarlar');
  } 
  else if (item === 'Profile'){
    this.props.navigation.navigate('Profile');
}
}
 
  static navigationOptions =({ navigation }) => {
    return {
      title: strings.mainJs.title,
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
/*Menu END */


  render() {
      const { currentUser } = this.state
      const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

  return (
    <SideMenu
    menu={menu}
    isOpen={this.state.isOpen}
    onChange={isOpen => this.updateMenuState(isOpen)}>

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

                   backgroundColor: item.noteBgColor}}  onPress={this._onPressButton.bind(this, item.not, item.yazid, item.noteBgColor, item.noteTitle)} underlayColor="white"
                   onLongPress = {this.openModal.bind(this, item.yazid)}>
                   
                  
                  
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
   
      <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={this.modalDidOpen}
          modalDidClose={this.modalDidClose}
          style={{ alignItems: "center" }}>
        
          <View style={{ alignItems: "center" }}>
            <Text style={{margin:10, fontSize:20}}>İşlem Seçin</Text>
          <View style={{flexDirection: 'row', backgroundColor:this.state.noteBgColor, zIndex:50}}>
       <TouchableOpacity style={{width:Dimensions.get('window').width /6-10,  backgroundColor:this.state.noteBgColor, }} 
       onPress={this.updatePlaceId.bind(this, 2)}>
      <Icon
        name="archive"
        type='material'
        color="black"
        size={28}
      />
       </TouchableOpacity>

       <TouchableOpacity style={{width:Dimensions.get('window').width /6-10, backgroundColor:this.state.noteBgColor,marginBottom:2}} 
     onPress={this.updatePlaceId.bind(this, 3)}>
      <Icon
        name='delete'
        type='material'
        color="black"     
        size={23}
      />
       </TouchableOpacity>

       <TouchableOpacity style={{width:Dimensions.get('window').width /6-10, backgroundColor:this.state.noteBgColor,}} 
       onPress={()=>this.setState({open:false})}>
      <Icon
        name="close"
        type='font-awesome'
        color="black"
        size={23}
      />
       </TouchableOpacity>
        </View>
          </View>
        </Modal>

      </View>
   

    <View style={{flexDirection: 'row', zIndex:50}}>
       <TouchableOpacity style={styles.savebutton  }
       onPress={this.git}>
      <Text>      {strings.mainJs.takeNote}</Text>
       </TouchableOpacity>

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
  //width:3,
  //marginRight:90,
  //backgroundColor:'#db3434', 
  //paddingVertical:18,
  //paddingHorizontal:195,
  //marginVertical:8,
  //borderRadius:15,
  //shadowColor:'purple',
  //shadowOpacity:.8,
  //shadowRadius:3,
  //shadowOffset:{width:0, height:0},
  //elevation:8