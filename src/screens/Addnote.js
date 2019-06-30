import React from 'react'
import { Alert, View, Text, Button, ActivityIndicator, StyleSheet, TextInput, Image, Dimensions } from 'react-native'
import firebase from 'react-native-firebase'
import { genericTypeAnnotation } from '@babel/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

export default class Loading extends React.Component {
  state = { not: '', 
  currentUser : null,
  newValue: 'qwertw',
  height: 10,
  noteTitle:''}

  /* Gelen verileri firebase'e kaydetme START */
       git = () =>{
        const { not }       = this.state;
        const { noteTitle } = this.state; /*24.06.2019 eklenme tarihi.*/

       const { currentUser } = firebase.auth();
       this.setState({ currentUser });
       const mail = currentUser.email;
       const refkey= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
       const ref ="/Users/"+currentUser.uid+"/"+refkey;
      
        firebase.database().ref(ref).set({
            mail,
            noteTitle,
            not,
            refkey
        }).then((data)=>{
            //success callback
           //alert("Başarılı");
           this.props.navigation.navigate('Main');
        }).catch((error)=>{
            //error callback
            alert(error);
        })
    }
  /* Gelen verileri firebase'e kaydetme END */



      username = () =>{
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })

        alert(currentUser.uid);
      }
      /*Auto Growing Text Input START */
      updateSize = (height) => {
        this.setState({
          height
        });
      }
       /* Auto Growing TextInput END */

       static navigationOptions = {
        title: 'Yeni Not Ekle',
        headerStyle: {
        backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
       /* header: null*/
      };

  render() {

    /* Auto change TextInput Size START */
    const {height} = this.state;
    let newStyle = {
      height,
      backgroundColor: 'white',
      fontSize:18,
      marginLeft:7
    }
    /* Auto change TextInput Size END */

    return (
      <View style={styles.container}>
        <TextInput style={styles.notetitle}
        placeholder ="Not Başlığı....."
        editable = {true}
        maxLength = {50}
        returnKeyType={"next"}
        onSubmitEditing={() => { this.not.focus(); }}
        autoFocus = {true}   
        onChangeText={(noteTitle) => this.setState({noteTitle})}
      />
  <View style={{borderBottomColor:'gray',
  borderBottomWidth:1,}} />
        <TextInput style={[newStyle]}
        ref={(input) => { this.not = input; }}
        multiline={true}
        placeholder ="Not gir"
        editable = {true}
        maxLength = {500}
        onChangeText={(not) => this.setState({not})}
        onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
      />

      <View style={styles.savecontainer}>
       <TouchableOpacity style={styles.savebutton} onPress={this.git}>
      <Icon
        name="check"
        color="#db3434"
        size={25}
      />
       </TouchableOpacity>
        </View>


</View>
    )
  }
}



const styles = StyleSheet.create({
  noteTexta: {
   /* textAlignVertical: 'top',*/
    flex: 1, padding: 4, 
    marginRight: 1, 
    marginTop: 5, 
    fontSize: 18, 
    borderWidth: 1, 
    borderRadius: 4, 
    borderColor: 'white', 
    backgroundColor: '#db3434',
   
    height: 150,
    width :280
     
  },
  container: {
    flex: 1,
  },

  notetitle:{
    fontSize:30,
    marginLeft:10,
    fontWeight: 'bold'
  },
  
  savecontainer:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    width:80,
    marginLeft: Dimensions.get('window').width / 2-40 ,

  },

  savebutton:{
    borderWidth:2,
    width:80,
    marginRight:90,
    backgroundColor:'#fff', 
    paddingVertical:15,
    paddingHorizontal:20,
    marginVertical:18,
    borderRadius:15,
    shadowColor:'black',
    shadowOpacity:.8,
    shadowRadius:3,
    shadowOffset:{width:0, height:2},
    elevation:4
    

  }
})

