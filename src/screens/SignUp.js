import React from 'react'
import { StyleSheet, Text,Image,Alert, TextInput,View,Dimensions, Button,TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import * as Progress from 'react-native-progress';
import {strings} from './../components/Localization';

export default class SignUp extends React.Component {
  state = {
    color : 'white'
  };

  constructor(){
    super();

    this.state = {
      kayitolBtn : 
      {
        marginVertical: 15,
        marginTop: 60,
        paddingHorizontal : 45,
        paddingVertical: 20,
        
        backgroundColor : '#8c52ff',
        borderRadius : 10,
        alignItems : 'center',
      },
      kayitolProgress :{
        alignItems : 'center',
        width:0,
        height:0,
      }
    };

  }
  
  state = { email: '', password: '', errorMessage: null }

  makeSignUp=()=>{
    const id =10000;
    const { currentUser } = firebase.auth();
    const refkey= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const ref ="/LastId/"+currentUser.uid;
    const mail = this.state.email;
    firebase.database().ref(ref).set({
      mail, 
      id,
      refkey
    }).then((data)=>{
        //success callback
       this.props.navigation.navigate('Main');
    }).catch((error)=>{
        //error callback
        alert(error);
    })
  }


  handleSignUp = () => {
    if(this.state.email == null  || this.state.email =='' || this.state.email == ' ' || this.state.password =='' || this.state.password ==' ' || this.state.password == null)
    {
      Alert.alert(
        strings.signupJs.errorTitle,
        strings.signupJs.errorDetails,
        [
          {text:  strings.signupJs.errorAction},
        ],
        {cancelable: false},
      );
    }

    else
    {
    this.setState(
      {
        kayitolBtn : {
          display: 'none',
          marginVertical: 15,
          paddingHorizontal : 25,
          paddingVertical: 20,
          backgroundColor : '#8c52ff',
          borderRadius : 10,
          alignItems : 'center',
        },
        kayitolProgress :{   
           width : 40,
           height : 40,
           marginTop : 15,
           marginLeft: 90,
        }
      }
    );

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email.trim(), this.state.password) //trim()  fonksiyonu boşlukları kesiyor.
      .then(this.makeSignUp)
      .catch(error => this.setState(
        { errorMessage: error.message,
          kayitolBtn : {
            marginVertical: 15,
            paddingHorizontal : 25,
            paddingVertical: 20,
            backgroundColor : '#8c52ff',
            borderRadius : 10,
            alignItems : 'center',
          },
          kayitolProgress :{   
             width : 0,
             height : 0,
             marginTop : 15,
             marginLeft: 90,
          }
        
        },
        )
      )
    }//else
      
  }


  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'orange',
    },
    header:null
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
          <Text style = {styles.kayitOl}>{strings.signupJs.signUp}</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
         
        <TextInput
          placeholder={strings.signupJs.email}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          returnKeyType = {"next"}
          onSubmitEditing = {() => this.passwordInput.focus() }
        />

        <TextInput
          secureTextEntry
          placeholder={ strings.signupJs.password}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}       
          returnKeyType = {"go"}
          ref = {(input) => this.passwordInput = input}
        />
        <View>
        
        <TouchableOpacity style = {this.state.kayitolBtn} onPress={this.handleSignUp}>
           <Text style = {{color: 'white'}}>{ strings.signupJs.signUp}</Text>  
        </TouchableOpacity>

        <Progress.Circle style = {this.state.kayitolProgress} size = {30} indeterminate = {true}/>
        </View>  
      </View>

        <View style = {styles.GirisKayitYazi}>
          <Text style = {styles.KayitYazi}>{strings.signupJs.signUp} </Text>

          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Login')}>
          <Text style = {styles.GirisYazi}>{strings.signupJs.logIn}</Text>
          </TouchableOpacity>
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
 
  ImageSosyal : 
  {
   flexDirection: 'row',
   justifyContent: 'space-between',
   bottom: 50,
  },
  imageFacebook : {
   flexDirection: 'row',
    padding : 1,
    width : 60,
    height : 60,
  },
 
  image: {
    width : 500,
    height : 300,
    marginBottom : '50%'
  },

  tiklayazi : {
    fontWeight : '600',
    color : 'white'
  },

  kayitOl : {
    fontWeight :'bold',
    right:30,
    marginBottom:20
  },


  GirisKayitYazi : {
    color : '#f1f1f1',
    flexDirection: "row",
    marginHorizontal:80,
    bottom : '115%',
  },
  GirisYazi: {
    color : '#eee',
    fontSize : 20,
    marginTop:13  
  },

  KayitYazi: {
    color : 'white',
    fontSize : 40,
    marginRight : 55,
    fontWeight : 'bold'
  },
 
  loginArea : {
    marginTop : Dimensions.get('window').width / 2-50 ,
    marginHorizontal : 50,
    marginVertical: 20,
    backgroundColor : 'white',
    padding: 50,
    height : 350,
    width : 350,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowRadius: 3,
    elevation : 4
  },

  background : {
    position : 'absolute',
    top : -100,
    left : 0,
    height : '200%',
    width : '100%',
    backgroundColor : '#f4f1f1',
    paddingVertical : 80,
  },

  bak : {
    position : 'absolute',
    top : 0,
    left : 0,
    width : '100%',
    height : '100%'
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
    left:-30,
    width: 300,
    marginTop: 8
  },
})