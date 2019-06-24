import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button } from 'react-native-elements';
 import firebase from 'react-native-firebase';

export default class Show extends React.Component {
  state = { not: '', 
  currentUser : null}
  update = () =>{
    const { not }       = this.state;
    const { noteTitle } = this.state; /*24.06.2019 eklenme tarihi.*/

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
   const mail = currentUser.email;
   const ref ="Users/"+currentUser.uid;
    firebase.database().ref(ref).update({
        not:'aaaaaaaaaaaa'
    }).then((data)=>{
        //success callback
       alert("Başarılı");
    }).catch((error)=>{
        //error callback
        alert(error);
    })
}



  render() {
    return (
      <View>
  
           <Text>..{this.props.navigation.state.params.data}....jhgfd</Text>

           <Button style={styles.savebutton}
           title="+"
           onPress={this.update}
           />
           </View>

    );
  }
}

const styles = StyleSheet.create({
 
});
 
