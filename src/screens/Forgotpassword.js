import React from 'react'
import { View, Text, Button, StyleSheet, TextInput,} from 'react-native'
import firebase from 'react-native-firebase'

export default class Forgotpassword extends React.Component {
    
    state={eposta:''}


    resetMyPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.state.eposta)
          .then(function (user) {
            alert('Please check your email...')
          }).catch(function (e) {
           alert(e);
          })
      }


  render() {
    return (
      <View>
            <Text>Şifrenizi Sıfırlayabilirsiniz</Text>

            <TextInput style={styles.notetitle}
        placeholder ="Eposta adresinizi yazın"
        editable = {true}
        maxLength = {50}
        autoFocus = {true}   
        onChangeText={(eposta) => this.setState({eposta})}
      />
      
      <Button
        title="Sıfırla"
        onPress={this.resetMyPassword}
      />

        </View>
    )
  }
}



const styles = StyleSheet.create({
 
})

