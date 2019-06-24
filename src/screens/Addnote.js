import React from 'react'
import { Alert, View, Text, Button, ActivityIndicator, StyleSheet, TextInput, Image, Dimensions } from 'react-native'
import firebase from 'react-native-firebase'
import { genericTypeAnnotation } from '@babel/types';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
       const ref ="Users/"+currentUser.uid;
        firebase.database().ref(ref).push({
            mail,
            noteTitle,
            not
        }).then((data)=>{
            //success callback
           alert("Başarılı");
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
        backgroundColor: '#f4511e', 
        },
        headerTintColor: '#fff',
       
      };

  render() {

    /* Auto change TextInput Size START */
    const {height} = this.state;
    let newStyle = {
      height,
      backgroundColor: 'purple',
    }
    /* Auto change TextInput Size END */

    return (
      <View style={styles.container}>
        <Text>Note Gir</Text>
        
        <TextInput style={styles.notetitle}
        placeholder ="Not Başlığı....."
        editable = {true}
        maxLength = {50}
        onChangeText={(noteTitle) => this.setState({noteTitle})}
      />

        <TextInput style={[newStyle]}
        multiline={true}
        placeholder ="Not gir"
        editable = {true}
        maxLength = {500}
        onChangeText={(not) => this.setState({not})}
        onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
      />

      <View style={styles.savecontainer}>
        <Button style={styles.savebutton}
        title="+"
        onPress={this.git}
        />

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
    fontSize:38
  },
  
  savecontainer:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    width:80,
    marginLeft: Dimensions.get('window').width / 2-40 ,

  },

  savebutton:{
    width:50,
    marginRight:90
  }
})

