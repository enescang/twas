import React from 'react'
import { Alert, View, Text, Button, ActivityIndicator, StyleSheet, TextInput } from 'react-native'
import firebase from 'react-native-firebase'
import { genericTypeAnnotation } from '@babel/types';


export default class Loading extends React.Component {
  state = { not: '', currentUser : null ,newValue: 'qwertw',
  height: 40}
 
    
      git = () =>{
        const { not } = this.state;

        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
       const mail = currentUser.email;
       const ref ="Users/"+currentUser.uid;
        firebase.database().ref(ref).push({
            mail,
             not
            
        }).then((data)=>{
            //success callback
           alert("Başarılı");
        }).catch((error)=>{
            //error callback
            alert(error);
        })
    }
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


  render() {
    /* Auto change TextInput Size START */
    const {height} = this.state;
    let newStyle = {
      height
    }
    /* Auto change TextInput Size END */
    return (
      <View style={styles.container}>
        <Text>Note Gir</Text>

        <TextInput style={[newStyle]}
        multiline={true}
      placeholder ="Not gir"
        editable = {true}
        maxLength = {500}
        onChangeText={(not) => this.setState({not})}
        onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
      />

        <Button 
        title="Kaydet"
        onPress={this.git}
        />

        <Button
        title="diğeri"
        onPress={this.username}
        />

        
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
    justifyContent: 'center',
    alignItems: 'center',
    
  }
})

