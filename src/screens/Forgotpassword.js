import React from 'react'
import { View, Text, Button,Image,Dimensions,TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native'
import firebase from 'react-native-firebase'
import {strings} from './../components/Localization';

export default class Forgotpassword extends React.Component {
  static navigationOptions = {
    title : strings.forgotpasswordJs.title,
    headerTintColor: '#fff',
      headerTransparent: true  
  }
    
    state={eposta:''}

    resetMyPassword = () => {
      const{eposta} = this.state;
  if (eposta == null || eposta == '' || eposta == ' ')
  {
    Alert.alert(
      strings.forgotpasswordJs.errorTitle,
      strings.forgotpasswordJs.errorDetails,
      [
        {text: strings.forgotpasswordJs.errorAction},
      ],
      {cancelable: false},
    );
  }
  else {
        firebase.auth().sendPasswordResetEmail(this.state.eposta.trim())
          .then(function (user) {
            alert(strings.forgotpasswordJs.checkYourEmail)
          }).catch(function (e) {
           alert(e);
          })
      }
    }

  render() {
    return (
      <View style={styles.container}>
          <View style = {styles.background}>
        <Image
        style= {styles.bak}
          source={require('../../images/bak.png')}
        /> 
        </View>
        <View style = {styles.loginArea}>
      <View>
            <Text style = {{fontWeight : 'bold',marginBottom:40}}>{strings.forgotpasswordJs.youCanReset}</Text>

            <TextInput style={styles.notetitle}
        placeholder ={strings.forgotpasswordJs.email}
        editable = {true}
        maxLength = {50}
        autoFocus = {true}   
        onChangeText={(eposta) => this.setState({eposta})}
      />

      <TouchableOpacity onPress={this.resetMyPassword}>    
      <Text style = {{color : '#8c52ff'}}> {strings.forgotpasswordJs.sendPasswordEmail} </Text>     
      </TouchableOpacity>
           </View>
         </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    backgroundColor : '#FBFBFB'
  },

  background : {
    
    position : 'absolute',
    top : -100,
    left : -10,
    height : '200%',
    width : '100%',
    backgroundColor : '#f4f1f1',
    paddingVertical : 80,
  },

  loginArea : {
    
    marginTop : Dimensions.get('window').width / 2-200 ,
    marginHorizontal : 20,
    marginVertical: 20,
    backgroundColor : 'white',
    padding: 20,
    height : 200,
    width : 350,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowRadius: 3,
    elevation : 4
  },

  notetitle : {
  borderWidth : 1,
  borderColor: '#eee',
  borderRadius : 8,
  marginBottom:20,
},
})