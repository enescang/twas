import React from 'react'
import { StyleSheet, Text, TextInput, View, Button,TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase'


export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'orange',
    },
    

  /* render function, etc */
}
render() {
    return (
      <View style={styles.container}>
        <View style = {styles.background}/>
        
        <View>
          <Text style = {styles.logo}>Friday Team</Text>
          <Text style = {styles.logoDescription}>Friday Team Twas Application</Text>
        </View>
       
        
          <View style = {styles.loginArea}>
          <Text style = {styles.kayitOl}>Kayıt Ol</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Mail Adresi"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          returnKeyType = {"next"}
          onSubmitEditing = {() => this.passwordInput.focus() }
        />
        <TextInput
          secureTextEntry
          placeholder="Şifre"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          
          returnKeyType = {"go"}
          ref = {(input) => this.passwordInput = input}
        />
        <View>
        <TouchableOpacity style = {styles.butonlar1} onPress={this.handleSignUp}>
          <Text style = {this.tiklayazi}>Tıkla</Text>
        </TouchableOpacity>
        
        </View>
        
        
        
      </View>
      <Text>Henüz Hesabın Yok mu?</Text>
      <TouchableOpacity style = {styles.butonlar2} onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Kayıt Ol</Text>
        </TouchableOpacity>
        
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
  },
  tiklayazi : {
    fontWeight : '600'
  },
  kayitOl : {
    fontWeight :'600'
  },
  butonlar1 : 
  {
    marginVertical: 15,
    paddingHorizontal : 25,
    paddingVertical: 20,
    backgroundColor : 'orange',
    borderRadius : 10,
    alignItems : 'center',
    
  },
  butonlar2 : {
    color : '#999'
  },
  loginArea : {
    marginTop : 10,
    marginHorizontal : 50,
    marginVertical: 40,
    backgroundColor : 'white',
    padding: 30,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowRadius: 3,
    
    elevation : 4
  },
  background : {
    position : 'absolute',
    top : 0,
    left : 0,
    height : 250,
    width : '100%',
    backgroundColor : 'orange',
    paddingVertical : 80
  },
  logo : {
  
    textAlign : 'center',
    paddingBottom: 50,
    fontSize : 40,
    fontWeight: 'bold',
    color : 'white'
  },
  logoDescription : {
    
    fontSize : 15,
    position : 'absolute',
    top : 60,
    left : 12,
    textAlign : 'center',
    color :'#999'
  },
  textInput: {
    height: 40,
    paddingHorizontal: 5,
    borderWidth : 2,
    borderRadius : 8,
    borderColor : '#f1f1f1',
    color : '#999',
    fontSize :14,
    fontWeight :'600',
    
    width: 220,
    marginTop: 8
  }
})