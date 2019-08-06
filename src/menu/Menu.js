import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import firebase from 'react-native-firebase'

import {strings} from './../components/Localization';
const window = Dimensions.get('window');
var uri = 'http://fridayteam23.com/images/user%20avatar.png';



//const {currentUser} = firebase.auth();
//var ref =  firebase.auth().onAuthStateChanged(user => {if(user){firebase.storage().ref(currentUser.uid+'/profile');}})

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 8,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 15,
    fontSize: 15,
  },
  item: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 35,
    
  },
});

const functiona=firebase.auth().onAuthStateChanged(user => {
  if(user)
  {
    const {currentUser} = firebase.auth();
    var dataimage= firebase.storage().ref(currentUser.uid+'/profile').getDownloadURL().then((url) => {
      uri = url;
    //  alert(currentUser.uid)
  }).catch((error)=>{
   //alert(currentUser.uid+"hhjk")
   uri="http://fridayteam23.com/images/user%20avatar.png";
   });
  
  }
  else{
   //something went wrong
  }
})





export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <Text style={{fontSize: 25, fontWeight: 'bold', color: '#8c52ff', paddingBottom: 8, }}>
        TWAS
      </Text>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri }}
        />
        <Text style={styles.name}>{strings.menuJs.sayHello}</Text>
      </View>

      <Text 
        onPress={() => onItemSelected('Ana Sayfa')}
        style={styles.item}>
        {strings.menuJs.notes}
      </Text>

      <Text
        onPress={() => onItemSelected('Arsiv')}
        style={styles.item}>
        {strings.menuJs.archive}
      </Text>

      <Text
        onPress={() => onItemSelected('Trash')}
        style={styles.item}>
        {strings.menuJs.trash}
      </Text>

      <Text
        onPress={() => onItemSelected('About')}
        style={styles.item}>
        {strings.menuJs.aboutUs}
      </Text>

      <Text
        onPress={() => onItemSelected('Profile')}
        style={styles.item}>
       {strings.menuJs.profile}
      </Text>
      
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};