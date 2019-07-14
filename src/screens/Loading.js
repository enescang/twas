import React from 'react'
import { View, Text, ActivityIndicator,Image, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'


export default class Loading extends React.Component {
  static navigationOptions = {
    headerTransparent : true
  }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
      }

  render() {
    return (
      <View style={styles.container}>
        
        <Image
          style = {{width : 80,height: 80,marginBottom: 50}}
          source={require('../../images/loading_image.png')}
        />
        
        <Text style = {{fontSize : 20,color : 'white',fontWeight : 'bold',marginBottom : 20}}>{" "}Kolaylıkla Not Kaydet {""}</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#8c52ff'
  }
})