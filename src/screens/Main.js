import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'
import {NavigationActions} from 'react-navigation'
import ItemComponent from '../components/ItemComponent'


export default class Main extends React.Component {
  state = { currentUser: null , items : [], son: []}


  
yonlendir = () =>{
    this.props.navigation.navigate('Addnote');
    /*
    {this.state.items.length > 0 ? (
      <ItemComponent items={this.state.items} />
    ) : (
      <Text>No items</Text>
    )}*/

}


_onPressButton=(itemq)=>{
  /*alert(itemq)*/
this.props.navigation.navigate('Show', { data: itemq });
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    const referans = "/Users/"+currentUser.uid;
    firebase.database().ref(referans).limitToFirst(1000).on('value', snapshot => {
      snapshot.forEach((child) => {

        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });

        let key = child.key;
        let son = Object.values(key);
        this.setState({ son });
      })

   
    });
  
}

cik = () =>{
  firebase.auth().signOut();
}

readDataUser = ()=>{
  alert(this.state.son)
}


render() {
    const { currentUser } = this.state
return (
  
      <View style={styles.container}>

<ScrollView  style={styles.ScrollContainer} >
      <View style={styles.itemsList}>
        {this.state.items.map((item, index) => { 
           
          return (
              
            <View key={index}>

     <TouchableOpacity  onPress={this._onPressButton.bind(this, item.not)} underlayColor="white">
        
            <Text style={styles.itemtext}>{item.not}</Text>
           
        </TouchableOpacity>
        
            </View>
          );
        
        })}
      </View>
 </ScrollView>






        <Text>
          Hi WE ARE FRİDAY TEAM {currentUser && currentUser.email}!
        </Text>

        <Button 
        title="Ekle"
        onPress={this.yonlendir}
        />

        <Button 
        title="Çıkış"
        onPress={this.cik}
        />    

        <Button 
        title="Göster"
        onPress={this.readDataUser}
        />

        

      

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    
  },

  
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
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

