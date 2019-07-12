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
<<<<<<< HEAD
        
        <Image
          style = {{width : 80,height: 80,marginBottom: 50}}
          source={require('../../images/loading_image.png')}
        />
        
        <Text style = {{fontSize : 20,color : 'white',fontWeight : 'bold',marginBottom : 20}}>{" "}Kolaylıkla Not Kaydet {""}</Text>
=======
        <Text>{" "}Sometimes you always wait, and nothing will be happened. Like this...</Text>
>>>>>>> c63ea4ff8dd4d8403e8b412e1602e42f4b910555
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