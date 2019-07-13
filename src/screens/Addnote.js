import React from 'react'
import { Alert, View, Text, Button, ActivityIndicator, StyleSheet, TextInput, Image, BackHandler, Dimensions, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'
import { genericTypeAnnotation } from '@babel/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import InputScrollView from 'react-native-input-scroll-view';

export default class Loading extends React.Component {
  state = { not: '', 
  currentUser : null,
  textareaHeight:null,
  height: 10,
  noteTitle:'',
  date:'',
  id:1,
  lastId:1,
  items:[],
  howmany:5,
  noteBgColor:'white'}



//
componentDidMount=()=>{
 BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  const { currentUser } = firebase.auth();
  this.setState({ currentUser });
  const updateref= "/LastId/"+currentUser.uid;

  firebase.database().ref(updateref).on('value', snapshot => {
    snapshot.forEach((child) => {
  //    let data = snapshot.val();
    //  let items = Object.values(data);
    //  this.setState({ items });

        const howmany = snapshot.val().id;
        this.setState({ howmany });
    ///  alert(snapshot.val().id);
  })
  });

//alert(this.state.howmany)
}

///


  /* Gelen verileri firebase'e kaydetme START */
       git = () =>{
        const { not }       = this.state;
        const { noteTitle } = this.state; /*24.06.2019 eklenme tarihi.*/

       const { currentUser } = firebase.auth();
       this.setState({ currentUser });
       const mail = currentUser.email;
       const random= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
       const refkey =this.state.howmany-1;
       const ref ="/Users/"+currentUser.uid+"/"+refkey;
       const tarih =firebase.database.ServerValue.TIMESTAMP;
       const noteBgColor = this.state.noteBgColor;

      //  const referans ="/LastId/"+currentUser.uid;
      //  const yazid = 0;
    
          //Notları listelemek için tuttuğumuz LastId için ref
        const updateref= "/LastId/"+currentUser.uid;
    
      const yazid = this.state.howmany-1;
        firebase.database().ref(ref).set({
            mail,
            noteTitle,
            not,
            noteBgColor,
            yazid,
        }).then((data)=>{

          //Eğer notu kaydederse notu listelemek için firebase üzerinde LastId ile
          //id tutup teker teker azaltıyoruz
         firebase.database().ref(updateref).update({
            id:this.state.howmany-1
        }).then((data)=>{
          //if it is success
        }).catch((error)=>{
            //error callback
            console.log(error);
        })
           this.props.navigation.navigate('Main');
        }).catch((error)=>{
            //error callback
            console.log(error);
        })
    }
  /* Gelen verileri firebase'e kaydetme END */




      /*Auto Growing Text Input START */
      updateSize = (height) => {
        this.setState({
          height
        });
      }
       /* Auto Growing TextInput END */
       

       //Header START
       static navigationOptions = {  
        title: 'Yeni Not Ekle',
        headerStyle: {
        backgroundColor: '#8c52ff'
        },
        headerTintColor: '#fff',
       /* header: null*/
      };
      //Header END


        //TextInput'un uzun metinlerde aşağı doğru kayması START
      _onContentSizeChange = ({nativeEvent:event}) => {
        this.setState({ textareaHeight: event.contentSize.height });
      };
       //TextInput'un uzun metinlerde aşağı doğru kayması END





//Geri Tuşuna Basınca da Kayıt Etme Özelliği START
      onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        //navigate('NewScreen');
      }
      
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
    
      handleBackButton = () => {
        var app = {
          backButtonDialog: this.props.navigation.state.routeName
      };
        if(app.backButtonDialog === 'Addnote')
        {
          this.git();
         // alert("Addnote içinde" +this.props.navigation.state.routeName);
        }
        else{
          alert("Different Addnote");
        }
        //BackHandler.exitApp();
       } 
       //Geri Tuşuna Basınca da Kayıt Etme Özelliği END




  render() {
    const { text, textareaHeight } = this.state;
    /* Auto change TextInput Size START */
    const {height} = this.state;
    let newStyle = {
      height,
     // backgroundColor: 'white',
      fontSize:18,
      marginLeft:7
    }
    /* Auto change TextInput Size END */

    return (
      <View style={{  flex: 1,
        backgroundColor:this.state.noteBgColor}}>
        
        <TextInput style={styles.notetitle}
        placeholder ="Başlık"
        editable = {true}
        maxLength = {50}
        returnKeyType={"next"}
        onSubmitEditing={() => { this.not.focus(); }}
     //   autoFocus = {true}   
        onChangeText={(noteTitle) => this.setState({noteTitle})}
      />
  <View style={{borderBottomColor:'gray',
  borderBottomWidth:1,}} />

   

<ScrollView>
            <InputScrollView>        
            <TextInput style={{ height: textareaHeight, backgroundColor:this.state.noteBgColor, maxHeight:500, fontSize:20 }}
                       value={this.state.not}
                       placeholder={"Not"}
                       autoFocus={true}
                       ref={(input) => { this.not = input; }}
                       onChangeText={not => this.setState({ not })}
                       onContentSizeChange={this._onContentSizeChange}
                       multiline={true} />
      	</InputScrollView>
        </ScrollView>

      <View style={styles.savecontainer}>
       <TouchableOpacity style={styles.savebutton} onPress={this.git}>
      <Icon
        name="create"
        type='material'
        color="purple"
        size={25}
      />
       </TouchableOpacity>

        </View>

        <View style={{ flexDirection: 'row', backgroundColor:'white', borderColor:'white', borderWidth:2, zIndex:50}}>
          {/*
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#e38923'}) } ><View style={{borderRadius:600,width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#e38923'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#72e0d9'}) } ><View style={{borderRadius:600, width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#72e0d9'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#ffffb3'}) } ><View style={{borderRadius:600,width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#ffffb3'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#f9ddd6'}) } ><View style={{borderRadius:600,width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#f9ddd6'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#92374d'}) } ><View style={{borderRadius:600,width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#92374d'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#f6aa1c'}) } ><View style={{borderRadius:600,width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#f6aa1c'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#14e2af'}) } ><View style={{borderRadius:600,width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#14e2af'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#dabfff'}) } ><View style={{borderRadius:600,width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#dabfff'}} /></TouchableOpacity>
          */}

      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#f6aa1c'}) } ><View style={{width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#f6aa1c'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#72e0d9'}) } ><View style={{ width: Dimensions.get('window').width / 8, height: 50, backgroundColor:'#72e0d9'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#ffffb3'}) } ><View style={{width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#ffffb3'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#f9ddd6'}) } ><View style={{width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#f9ddd6'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#92374d'}) } ><View style={{width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#92374d'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#fff'}) } ><View style={{width: Dimensions.get('window').width / 8, height: 50,    backgroundColor: '#fff'   }} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#14e2af'}) } ><View style={{width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#14e2af'}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({ noteBgColor:'#dabfff'}) } ><View style={{width: Dimensions.get('window').width / 8, height: 50, backgroundColor: '#dabfff'}} /></TouchableOpacity>

    
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


  notetitle:{
    fontSize:30,
    marginLeft:10,
    fontWeight: 'bold'
  },
  
  savecontainer:{
    marginBottom: 1,
    width:80,
    marginLeft: Dimensions.get('window').width / 2-40 ,

  },

  savebutton:{
    borderWidth:2,
    width:80,
    marginRight:90,
    backgroundColor:'#fff', 
    paddingVertical:15,
    paddingHorizontal:20,
    marginVertical:18,
    borderRadius:15,
    shadowColor:'black',
    shadowOpacity:.8,
    shadowRadius:3,
    shadowOffset:{width:0, height:2},
    elevation:4
  }
})

