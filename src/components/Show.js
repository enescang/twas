import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button } from 'react-native-elements';

import InputScrollView from 'react-native-input-scroll-view';

import firebase from 'react-native-firebase';

export default class Show extends React.Component {
  state = { not: this.props.navigation.state.params.data, 
  currentUser : null,
  text: '',
  textareaHeight: null,

}
  update = () =>{
    const { not }       = this.state;
    const { noteTitle } = this.state; /*24.06.2019 eklenme tarihi.*/

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
   const mail = currentUser.email;
   const noteItemKey = this.props.navigation.state.params.notkey;

   const ref ="Users/"+currentUser.uid+"/"+noteItemKey;
    firebase.database().ref(ref).update({
        not:this.state.not
    }).then((data)=>{
        //success callback
       alert("Başarılı");
    }).catch((error)=>{
        //error callback
        alert(error);
    })
}


_onContentSizeChange = ({nativeEvent:event}) => {
  this.setState({ textareaHeight: event.contentSize.height });
};
  render() {
    const { text, textareaHeight } = this.state;
    return (

      <View>
  
           <Text>..{this.props.navigation.state.params.data}....jhgfd</Text>
           <Text>Hello string not key{this.props.navigation.state.params.notkey}</Text>
 
           <TextInput style={styles.notetitle}
        placeholder ="Not Başlığı....."
        editable = {true}
        maxLength = {5000}
        autoFocus = {true}   
        multiline={true}
        onChangeText={(not) => this.setState({not})}
        value={this.state.not}
      />
            <InputScrollView> 
            <View>
            <TextInput style={{ height: textareaHeight, backgroundColor:'#db3434' }}
                       value={text}
                       onChangeText={text => this.setState({ text })}
                       onContentSizeChange={this._onContentSizeChange}
                       multiline={true} />
                       
         
                       </View>

      	</InputScrollView>
        
        <View style={{position: 'absolute', top: 550, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                       <Button 
           title="+"
           onPress={this.update}
           />

                       </View>
<Text>askdas hdıadıasjdıjaısdss</Text>


    
         
      

           </View>
           

    );
  }
}

const styles = StyleSheet.create({
 
});
 
