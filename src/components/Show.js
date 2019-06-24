import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
 

export default class Show extends React.Component {
  render() {
    return (
           <Text>..{this.props.navigation.state.params.data}....jhgfd</Text>
    );
  }
}

const styles = StyleSheet.create({
 
});
 
