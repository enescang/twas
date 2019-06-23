import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import {NavigationActions} from 'react-navigation'
import Show from './Show'



export default class ItemComponent extends Component {
    state = {select: 'eeeeee'}


  _onPressButton=()=>{
    const navigateAction = NavigationActions.navigate({
        routeName: 'Show'
    });
    this.props.navigation.dispatch(navigateAction);

    }
  
  render() {

    return (
        <ScrollView  style={styles.ScrollContainer} >
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => { 
           
          return (
              
            <View key={index}>

     <TouchableOpacity  onPress={this._onPressButton} underlayColor="white">
        
            <Text style={styles.itemtext}>{item.not}</Text>
           
        </TouchableOpacity>
        
            </View>
          );
        
        })}
      </View>
      

      </ScrollView>
      
    );
  }
}
 
const styles = StyleSheet.create({

    ScrollContainer:{
    flex: 1,
    },

  itemsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  itemtext: {
    
    margin: 2,
    width: Dimensions.get('window').width / 4 -6,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1c40f'
  }
});

