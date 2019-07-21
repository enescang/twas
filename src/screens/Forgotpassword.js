import React from 'react'
import { View, Text, Button,Image,Dimensions,TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native'
import firebase from 'react-native-firebase'

export default class Forgotpassword extends React.Component {

  static navigationOptions = {
    title : 'Şifre Yenileme',
    
      headerTransparent: true
    
  }
    
    state={eposta:''}

    resetMyPassword = () => {
      //sanki tamam alerti düzeltcem bi deniyorum o zaman konsolu kapatıp
      const{eposta} = this.state
  if (eposta == null || eposta == '' || eposta == ' ')
  {
    Alert.alert(
      'Hata',
      'Email Kısmını Doldurunuz',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }
  else {
        firebase.auth().sendPasswordResetEmail(this.state.eposta)
          .then(function (user) {
            alert('Please check your email...')
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
            <Text style = {{fontWeight : 'bold',marginBottom:40}}>Şifrenizi Sıfırlayabilirsiniz</Text>

            <TextInput style={styles.notetitle}
        placeholder ="Eposta adresinizi yazın"
        editable = {true}
        maxLength = {50}
        autoFocus = {true}   
        onChangeText={(eposta) => this.setState({eposta})}
      />
      <TouchableOpacity onPress={this.resetMyPassword}>
      
      <Text style = {{color : '#8c52ff'}}> Sıfırla </Text> 
      
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