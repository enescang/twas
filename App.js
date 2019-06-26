import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
 
import firebase from 'react-native-firebase';

import Loading from './src/screens/Loading'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'
import Main from './src/screens/Main'
import Addnote from './src/screens/Addnote'
import Show from './src/components/Show'
import ItemComponent from './src/components/ItemComponent'

const AppNavigator = createStackNavigator ({
  Loading,
  SignUp,
  Login,
  Main,
  Addnote,
  Show,
  ItemComponent,
},
{
  initialRouteName: 'Loading',
  headerLayoutPreset: 'center'
},

);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
            <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
 
