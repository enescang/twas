import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button } from 'react-native-elements';
 import firebase from 'react-native-firebase';

export default class Show extends React.Component {
  state = { not: this.props.navigation.state.params.data, 
  currentUser : null}
  update = () =>{
    const { not }       = this.state;
    const { noteTitle } = this.state; /*24.06.2019 eklenme tarihi.*/

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
   const mail = currentUser.email;
   const noteItemKey = this.props.navigation.state.params.notkey;

   const ref ="Users/"+currentUser.uid+"/"+noteItemKey;
    firebase.database().ref(ref).update({
        not:this.state.not
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
           <Text>Hello string not key{this.props.navigation.state.params.notkey}</Text>
 
           <TextInput style={styles.notetitle}
        placeholder ="Not Başlığı....."
        editable = {true}
        maxLength = {50}
        autoFocus = {true}   
        multiline={true}
        onChangeText={(not) => this.setState({not})}
        value={this.state.not}
       
      />


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
 
