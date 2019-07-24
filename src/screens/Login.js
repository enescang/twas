import React from 'react'
import { StyleSheet, Text,Image,setTimeout, Alert,TextInput,ActivityIndicator,Linking, View,Dimensions, Button,TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase';
import * as Progress from 'react-native-progress';
import {strings} from './../components/Localization';

export default class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      kayitolBtn : 
      {
        marginVertical: 15,
        paddingHorizontal : 25,
        marginTop: 60,
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

  //Url açma fonksiyonu
  openUrl = (url) =>{
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert(strings.loginJs.urlError);
      }
    });
  }
  //Url açma fonksiyonu


  state = { email: 'ml', password: '', errorMessage: null }

  
  handleLogin = () => {
    const { email, password } = this.state

    if(email == null  || email =='' || email == ' ' || password =='' || password ==' ' || password == null)
    {
      Alert.alert(
        strings.loginJs.errorTitle,
        strings.loginJs.errorDetails,
        [
          {text: strings.loginJs.errorAction},
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
        },
        text:'',
        visible:false,
      }
    );
   
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password) //trim() fonksiyonu email için boşluk oluştuğunda onu kesiyor. @canesnet
      .then(() => this.props.navigation.navigate('Main'))
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
        
        }
        )
      )
    }//else

  }//function

  static navigationOptions = { //dayı sanki ben bu header kısmını değiştirmiştim. ben buralara hiç karışmadım hata yoksa dokunmayak zaten null vemişriz sorun yok
    title: 'Home',
    headerStyle: {
      backgroundColor: 'orange',
    },
    header:null

  /* render function, etc */
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
          <Text style = {styles.kayitOl}>{strings.loginJs.logIn}</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder={strings.loginJs.email}
          autoCapitalize="none"
          style={styles.textInput} 
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          returnKeyType = {"next"}
          onSubmitEditing = {() => this.passwordInput.focus() }
        />
        <TextInput
          secureTextEntry
          placeholder={strings.loginJs.password}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          
          returnKeyType = {"go"}
          ref = {(input) => this.passwordInput = input}
        />
       
        <View>
        <TouchableOpacity style = {this.state.kayitolBtn} onPress={this.handleLogin}>
    <Text style = {{color: 'white'}}>{strings.loginJs.logIn}</Text>
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgetpassword} onPress={()=> this.props.navigation.navigate('Forgotpassword')}>
          <Text style = {{color: '#8c52ff'}}>
          {strings.loginJs.forgotPassword}
            </Text>
          </TouchableOpacity>
    <Progress.Circle style = {this.state.kayitolProgress} size = {30} indeterminate = {true}/> 
        </View>

        
      </View>

      <View style = {styles.GirisKayitYazi}>
      
          <Text style = {styles.KayitYazi}>{strings.loginJs.logIn} </Text>

          <TouchableOpacity  onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style = {styles.GirisYazi}>{strings.loginJs.signUp}</Text>
          </TouchableOpacity>
          </View>

        <View style= {styles.ImageSosyal}>

          <TouchableOpacity onPress={this.openUrl.bind(this, "https://facebook.com/fridayteam23")}>
        <Image
        style= {styles.imageFacebook}
          source={require('../../images/facebook.png')}
        /> 
        </TouchableOpacity>

        <TouchableOpacity onPress={this.openUrl.bind(this, "https://twitter.com/fridayteam23")}>
        <Image
        style= {styles.imageFacebook}
          source={require('../../images/twitter.png')}
        />  
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this.openUrl.bind(this, "https://instagram.com/fridayteam23")}>
        <Image
         style= {styles.imageFacebook}
        source={require('../../images/instagram.png')}
      />  
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
    // marginRight: 120,
    
    flexDirection: 'row',
    
    padding : 1,
     width : 60,
     height : 60,
   },
  imageFacebook2 : {
    width : 45,
    height : 45,
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
  butonlar1 : 
  {
    marginVertical: 15,
    paddingHorizontal : 25,
    paddingVertical: 20,
    backgroundColor : '#8c52ff',
    borderRadius : 10,
    alignItems : 'center',
    
  },
   GirisKayitYazi : {
    color : '#f1f1f1',
    flexDirection: "row",
    marginHorizontal:80,
    bottom : '115%',
    //right : '-8%',
    

   
    

    
  },
  GirisYazi: {
    color : '#eee',
    fontSize : 20,
    marginTop:15
 
    
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
    left : -100,
    height : '300%',
    width : '100%',
    backgroundColor : '#f4f1f1',
    paddingVertical : 80,
    
  },
 
  logoDescription : {
    
    fontSize : 15,
    position : 'absolute',
    top : 60,
    left : 12,
    textAlign : 'center',
    color :'#999',
    marginTop : Dimensions.get('window').width / 2-248 
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

  forgetpassword:{
    alignItems:'center',
    marginLeft:5,
    backgroundColor: 'white'
  }
})