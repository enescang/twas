import React from 'react';
import {Platform, View} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';

import Loading from './src/screens/Loading'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'
import Main from './src/screens/Main'
import Addnote from './src/screens/Addnote'
import Show from './src/components/Show'
import ItemComponent from './src/components/ItemComponent'
import Forgotpassword from './src/screens/Forgotpassword'
import Profile from './src/components/Profile';
import Menu from'./src/menu/Menu';
import Trash from './src/screens/Trash'
import About from './src/screens/About'
import Arsiv from './src/screens/Arsiv'
import Ayarlar from './src/screens/Ayarlar'


const AppNavigator = createStackNavigator ({
  Loading,
  SignUp,
  Login,
  Main,
  Addnote,
  Show,
  ItemComponent,
  Forgotpassword,
  Menu,
  Trash,
  About,
  Arsiv,
  Ayarlar,
  Profile,
},
{
  initialRouteName: 'Loading',
  headerLayoutPreset: 'center'
},

);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
            <AppContainer/>
    );
  }
}

