import React from 'react'
import { StyleSheet, Text,Image,setTimeout, TextInput,ActivityIndicator,Linking, View,Dimensions, Button,TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase';
import * as Progress from 'react-native-progress';

export default class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      kayitolBtn : 
      {
        marginVertical: 15,
        paddingHorizontal : 25,
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
        alert("url açılamıyor.");
      }
    });
  }
  //Url açma fonksiyonu

 

  
  state = { email: 'ml', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
   
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
  }
  static navigationOptions = {
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
        <View style = {styles.background}/>
        <View >

          <Image
        style= {styles.image}
          source={require('../../images/twas3.png')}
        /> 
     </View>
       
       
        
          <View style = {styles.loginArea}>
          <Text style = {styles.kayitOl}>Giriş Yap</Text>
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
        <TouchableOpacity style = {this.state.kayitolBtn} onPress={this.handleLogin}>
    <Text style = {{color: 'white'}}>Giriş</Text>
          
        </TouchableOpacity>
          <Button
            title="Şifremi Unuttum"
            onPress={()=> this.props.navigation.navigate('Forgotpassword')}
            style={styles.forgetpassword}
          />
    <Progress.Circle style = {this.state.kayitolProgress} size = {30} indeterminate = {true}/> 
        </View>

        
      </View>

      <Text>Hesabın Yokmu?</Text>
      <TouchableOpacity style = {styles.butonlar2} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text>Kayıt Ol</Text>
        </TouchableOpacity>
        <View style= {styles.imageFacebook1}>

          <TouchableOpacity onPress={this.openUrl.bind(this, "https://facebook.com/fridayteam23")}>
        <Image
        style= {styles.imageFacebook}
          source={require('../../images/facebook.png')}
        /> 
        </TouchableOpacity>

        <TouchableOpacity onPress={this.openUrl.bind(this, "https://twitter.com/fridayteam23")}>
        <Image
        style= {styles.imageFacebook2}
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
  imageFacebook1 : 
  {
    
   
   flexDirection: 'row',
   justifyContent: 'space-between',
  },
  imageFacebook : {
   // marginRight: 120,
   
   flexDirection: 'row',
   
   padding : 1,
    width : 40,
    height : 40, 
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
    fontWeight :'600'
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
  butonlar2 : {
    color : '#999'
  },
  loginArea : {
    
    marginTop : Dimensions.get('window').width / 2-450 ,
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
    
    width: 220,
    marginTop: 8
  },

  forgetpassword:{
    alignItems:'center',
    marginLeft:55,
  }
})