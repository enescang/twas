import React from 'react';
import { View, Text, Image, Button, Platform, StyleSheet, Dimensions, BackHandler, TextInput, ScrollView  } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from 'react-native-firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Icon, Tooltip, Badge} from 'react-native-elements';


///

const getPhoto=(image)=>{
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path
      let uploadBlob = null
      const imageRef = firebase.storage().ref(currentUser.uid).child("profile")
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        const mime ='image/jpg';
        return Blob.build(data,   { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
     //   this.setState({photo:response});
        this.setState({image:image.path})
        return imageRef.put(image.path, { contentType: 'image/jpg' })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        alert(error)
      })
  })


}
export default class Profile extends React.Component {
  state = {
    photo: null,
    currentUser:null,
    image:'file:///sdcard/Android/data/com.friday.twas/movietwas/.tt.png',
    imageMenu:false,
    noteValue:0,
    noteDeletedValue:0,
    main:0,
    archive:0,
    recycle:0,
    accountStatus:'',
    captcha:null,
    kral:null,
    oldPassword:null,
    newPassword:null,
    newEmail:null,
    oldPassword2:null,
    oldPassword3:null,
  };

   replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

  getHowManyData(id, place){
    const { currentUser } = firebase.auth();
    this.setState({ currentUser: currentUser });
    const referans = "/Users/"+currentUser.uid;

    firebase.database().ref(referans).orderByChild('placeId').equalTo(id).on('value', snapshot=>{
      snapshot.forEach((child)=>{
        const numChild = snapshot.numChildren();
        this.setState({ numChild });
        this.setState({noteValue:numChild})

        if(place ==='main')
        {
         this.setState({main:numChild})
        }
        if(place === 'archive')
        {
         this.setState({archive:numChild})
        }
        if(place === 'recycle')
        {
          this.setState({recycle:numChild})
        }

      })
    })
  }


  componentDidMount=async()=>{
   const code = Math.random().toString(36).substring(2, 15);
   this.setState({kral:code})
    const { currentUser } = firebase.auth();
    this.setState({ currentUser: currentUser });
    const referans = "/Users/"+currentUser.uid;

    const saybak =0;

    this.getHowManyData(1, 'main');
    this.getHowManyData(2, 'archive');
    this.getHowManyData(3, 'recycle');


  firebase.database().ref(referans).limitToFirst(1).on('value', snapshot => {
    snapshot.forEach((child) => {
      let data = snapshot.val();
      let items = Object.values(data);

      let key = child.key;
      let son = Object.values(key);
      this.setState({ son });

      var not = son.toString();
      not = this.replaceAll(not, ',', '')

      this.setState({noteDeletedValue:10000-not})
    })
  });

  const ref = firebase.storage().ref(currentUser.uid+'/profile');
    ref.getDownloadURL()
   .then((url) => {
   // this.setState({image:url})
    // alert(url)
   });

  }

  handlePhotoWithCamera =()=>{
    ImagePicker.openCamera( {
    width:1080,
      height:1080,
      cropping:true,
    }).then(image=>{
      this.setState({image:image.path})

        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob

RNFetchBlob.fs.mkdir("/sdcard/Android/data/com.friday.twas/movietwas")
.then(() => { alert("dfsd") })
.catch((err) => { alert("noo") })

RNFetchBlob.fs.cp(image.path, "/sdcard/Android/data/com.friday.twas/movietwas/.tt.png")
.then(() => { alert("copy") })
.catch((error) => { alert("no copy"+error) })

const { currentUser } = firebase.auth();
this.setState({ currentUser });

return new Promise((resolve, reject) => {
const uploadUri = Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path
  let uploadBlob = null
  const imageRef = firebase.storage().ref(currentUser.uid).child("profile")
  fs.readFile(uploadUri, 'base64')
  .then((data) => {
    const mime ='image/jpg';
    return Blob.build(data,   { type: `${mime};BASE64` })
  })
  .then((blob) => {
    uploadBlob = blob
 //   this.setState({photo:response});
    this.setState({image:image.path})
    return imageRef.put(image.path, { contentType: 'image/jpg' })
  })
  .then(() => {
    uploadBlob.close()
    return imageRef.getDownloadURL()
  })
  .then((url) => {
    resolve(url)
  })
  .catch((error) => {
    alert(error)
  })
})

})
}


handlePhotoWithGallery =()=>{
      ImagePicker.openPicker( {
        width:1080,
        height:1080,
        cropping:true,
      }).then(image=>{
        this.setState({image:image.path})

          const Blob = RNFetchBlob.polyfill.Blob
          const fs = RNFetchBlob.fs
          window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
          window.Blob = Blob

RNFetchBlob.fs.mkdir("/sdcard/Android/data/com.friday.twas/movietwas")
.then(() => { alert("dfsd") })
.catch((err) => { alert("noo") })

RNFetchBlob.fs.cp(image.path, "/sdcard/Android/data/com.friday.twas/movietwas/.tt.png")
.then(() => { alert("copy") })
.catch((error) => { alert("no copy"+error) })

const { currentUser } = firebase.auth();
  this.setState({ currentUser });

return new Promise((resolve, reject) => {
  const uploadUri = Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path
    let uploadBlob = null
    const imageRef = firebase.storage().ref(currentUser.uid).child("profile")
    fs.readFile(uploadUri, 'base64')
    .then((data) => {
      const mime ='image/jpg';
      return Blob.build(data,   { type: `${mime};BASE64` })
    })
    .then((blob) => {
      uploadBlob = blob
   //   this.setState({photo:response});
      this.setState({image:image.path})
      return imageRef.put(image.path, { contentType: 'image/jpg' })
    })
    .then(() => {
      uploadBlob.close()
      return imageRef.getDownloadURL()
    })
    .then((url) => {
      resolve(url)
    })
    .catch((error) => {
      alert(error)
    })
})

})
}
        

    

    /*
  handleChoosePhotox = () => {
   // alert("ajsd")
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };*/

  signOut = () =>{
    alert("j")
   // firebase.auth().signOut();
}

closeToApp=()=>{
  BackHandler.exitApp();
}


  showChangeImageMenu=()=>{
    if(this.state.imageMenu)
    {
      return(
<View style={{ flexDirection: 'row', backgroundColor:'#00BFFF',  zIndex:50}}>
   <TouchableOpacity style={{ width:Dimensions.get('window').width /3}}  onPress={this.handlePhotoWithCamera}>
      <Icon
        name="add-a-photo"
        type='material'
        color="white"
        size={30}
      />
       </TouchableOpacity>
       <TouchableOpacity style={{ width:Dimensions.get('window').width /3}}  onPress={this.handlePhotoWithGallery}>
      <Icon
        name="collections"
        type='material'
        color="white"
        size={30}
      />
       </TouchableOpacity>
       <TouchableOpacity style={{ width:Dimensions.get('window').width /3}}  onPress={()=>this.setState({imageMenu:false})}>
      <Icon
        name="close"
        type='material'
        color="black"
        size={30}
      />
       </TouchableOpacity>
     </View>
      )
    }
    else {
      return(
        <TouchableOpacity onPress={()=>this.setState({imageMenu:true})}>
<Text style={styles.name}>Change Profil</Text>
</TouchableOpacity>
      )
    }
  } /*showChangeImageMenu*/ 

  deleteAccount=()=>{
    if(this.state.kral === this.state.captcha)
    {
      var user = firebase.auth().currentUser;
      var currentPassword = this.state.oldPassword3;

      this.reauthenticate(currentPassword).then(()=>{
        user.delete().then(function() {
          alert("hesabınız silindi")
        }, function(error) {
          alert(error)
        });
      }).catch((error) => { alert(error) });

    
   //   alert("hesap silinebilir")
    }
    else
    {
      alert("Güvenlik kodu yanlış");
    }

  }

  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  changePassword=()=>{
    const currentPassword = this.state.oldPassword;
    const newPassword = this.state.newPassword;
      this.reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(() => {
         alert("we changed your passw")
        }).catch((error) => { alert(error)});
      }).catch((error) => { alert(error) });
  }

  changeEmail=()=>{
    const currentPassword = this.state.oldPassword2;
    const newEmail = this.state.newEmail;
  this.reauthenticate(currentPassword).then(() => {
    var user = firebase.auth().currentUser;
    user.updateEmail(newEmail).then(() => {
     alert("email değiştirildi")
    }).catch((error) => { alert(error) });
  }).catch((error) => { alert(error); });
  }



  accountSettings=()=>{
    if(this.state.accountStatus === 'deleteAccount')
    {
      return(
        <View>
          <Text style={{textAlign:'center', fontWeight:'bold'}}>{this.state.kral}</Text>

        <TextInput style={styles.textInput}
        placeholder ="Şifreniz"
        editable = {true}
        maxLength = {40}
        value={this.state.oldPassword3}
        returnKeyType={"next"}
       // onSubmitEditing={() => { this.not.focus(); }}
     //   autoFocus = {true}   
        onChangeText={(oldPassword3) => this.setState({oldPassword3})}
      />

<TextInput style={styles.textInput}
        placeholder ="Captcha"
        editable = {true}
        maxLength = {15}
        value={this.state.captcha}
        returnKeyType={"next"}
       // onSubmitEditing={() => { this.not.focus(); }}
     //   autoFocus = {true}   
        onChangeText={(captcha) => this.setState({captcha})}
      />

<View style={{ flexDirection: 'row', backgroundColor:'white',  zIndex:50}}>
   <TouchableOpacity style={{ width:Dimensions.get('window').width /2}}  onPress={this.deleteAccount}>
      <Icon
        name="sentiment-dissatisfied"
        type='material'
        color="black"
        size={30}
      />
       </TouchableOpacity>
       <TouchableOpacity style={{ width:Dimensions.get('window').width /2}}  onPress={()=>this.setState({accountStatus:false})}>
      <Icon
        name="close"
        type='material'
        color="black"
        size={30}
      />
       </TouchableOpacity>
     </View>
      </View>

      )
        alert('are you sure to delete your account')
    }

    if(this.state.accountStatus === 'changePassword')
    {
      return (
      <View>
      <TextInput style={styles.textInput}
      placeholder ="Eski Şifre"
      editable = {true}
      maxLength = {40}
      value={this.state.oldPassword}
      returnKeyType={"next"}
   //   onSubmitEditing={() => { this.not.focus(); }}
   //   autoFocus = {true}   
      onChangeText={(oldPassword) => this.setState({oldPassword})}
    />

    <TextInput style={styles.textInput}
    placeholder ="Yeni Şifre"
    editable = {true}
    maxLength = {40}
    value={this.state.newPassword}
    returnKeyType={"next"}
    //onSubmitEditing={() => { this.not.focus(); }}
 //   autoFocus = {true}   
    onChangeText={(newPassword) => this.setState({newPassword})}
  />

<View style={{ flexDirection: 'row', backgroundColor:'white',  zIndex:50}}>
   <TouchableOpacity style={{ width:Dimensions.get('window').width /2}}  onPress={this.changePassword}>
      <Icon
        name="lock"
        type='material'
        color="black"
        size={30}
      />
       </TouchableOpacity>
       <TouchableOpacity style={{ width:Dimensions.get('window').width /2}}  onPress={()=>this.setState({accountStatus:false})}>
      <Icon
        name="close"
        type='material'
        color="black"
        size={30}
      />
       </TouchableOpacity>
     </View>

    </View>
      );

      alert("do yu want to change your password")
    }


    if(this.state.accountStatus === 'changeEmail')
    {
      return(
        <View>
           <TextInput style={styles.textInput}
    placeholder ="Mevcut Şifreniz"
    editable = {true}
    maxLength = {40}
    value={this.state.oldPassword2}
    returnKeyType={"next"}
    //onSubmitEditing={() => { this.not.focus(); }}
 //   autoFocus = {true}   
    onChangeText={(oldPassword2) => this.setState({oldPassword2})}
  />

             <TextInput style={styles.textInput}
    placeholder ="Yeni Email"
    editable = {true}
    maxLength = {30}
    value={this.state.newEmail}
    returnKeyType={"next"}
    //onSubmitEditing={() => { this.not.focus(); }}
 //   autoFocus = {true}   
    onChangeText={(newEmail) => this.setState({newEmail})}
  />

<View style={{ flexDirection: 'row', backgroundColor:'white',  zIndex:50}}>
   <TouchableOpacity style={{ width:Dimensions.get('window').width /2}}  onPress={this.changeEmail}>
      <Icon
        name="merge-type"
        type='material'
        color="black"
        size={30}
      />
       </TouchableOpacity>
       <TouchableOpacity style={{ width:Dimensions.get('window').width /2}}  onPress={()=>this.setState({accountStatus:false})}>
      <Icon
        name="close"
        type='material'
        color="black"
        size={30}
      />
       </TouchableOpacity>
     </View>

        </View>
      )
    }

  }

  render() {
    const { currentUser } = firebase.auth();
    const { photo, image, noteDeletedValue} = this.state;
    const { main, archive, recycle} = this.state;

    return (
      <ScrollView>
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: image}}/>


             {this.showChangeImageMenu()}



                <Text style={styles.name}>
                  {currentUser.email}
                </Text>

            </View>
          </View>

          <View style={styles.body}>
     
          {this.accountSettings()}


            <View style={styles.bodyContent}>
              <View style={styles.menuBox}>
                <Tooltip height={40} popover={<Text>Not Sayısı</Text>}>
                    <Icon
                     name="trending-up"
                     type='material'
                     color="black"
                     size={30}
                       />         
                  </Tooltip>
                  <Badge badgeStyle={{height:22}}  textStyle={{  fontSize:18 }} value={main} status="success" />
              </View>

              <View style={styles.menuBox}>
                  <Tooltip height={40} popover={<Text>Arşiv Kutusu</Text>}>
                   <Icon
                    name="archive"
                    type='material'
                    color="black"
                    size={30}
                     />         
                  </Tooltip>
                  <Badge badgeStyle={{height:23}}  textStyle={{  fontSize:18 }} value={archive} status="success" />
             </View> 

             <View style={styles.menuBox}>
                 <Tooltip height={40} popover={<Text>Çöp Kutusu</Text>}>
                   <Icon
                    name="delete"
                    type='material'
                    color="black"
                    size={30}
                    />         
                  </Tooltip>                  
                  <Badge badgeStyle={{height:23}}  textStyle={{  fontSize:18 }} value={recycle} status="success" />
                          
             </View> 


         
              <View style={styles.menuBox}>
              <Icon
                    name="settings"
                    type='material'
                    color="black"
                    size={30}
                    />         
                    
              <Text style={styles.info}>Ayarlar</Text>
              </View>



              <View style={styles.menuBox}>
                <TouchableOpacity onPress={this.signOut}>
                 <Icon
                    name="exit-to-app"
                    type='material'
                    color="black"
                    size={30}
                    />                  
              <Text style={styles.info}>Çıkış Yap</Text>
              </TouchableOpacity>
              </View>

              <View style={styles.menuBox}>
          <TouchableOpacity onPress={this.closeToApp}>
              <Icon
                    name="power-settings-new"
                    type='material'
                    color="black"
                    size={30}
                    />                      
              <Text style={styles.info}>Kapat</Text>
              </TouchableOpacity>
              </View>

              <View style={styles.menuBox}>
              <TouchableOpacity onPress={()=>this.setState({accountStatus:'changePassword'})}>
              <Icon
                    name="lock-open"
                    type='material'
                    color="black"
                    size={30}
                    />                      
              <Text style={styles.info}>Şifre Değiş</Text>            
              </TouchableOpacity>            
              </View>

              <View style={styles.menuBox}>
              <TouchableOpacity onPress={()=>this.setState({accountStatus:'deleteAccount'})}>
              <Icon
                    name="remove-circle"
                    type='material'
                    color="#db3434"
                    size={30}
                    />                      
              <Text style={styles.info}>Hesabı Sil</Text>            
              </TouchableOpacity>   
              </View>

              <View style={styles.menuBox}>
              <TouchableOpacity onPress={()=>this.setState({accountStatus:'changeEmail'})}>
              <Icon
                    name="contact-mail"
                    type='material'
                    color="black"
                    size={30}
                    />                      
              <Text style={styles.info}>Mail Değiş</Text>
              </TouchableOpacity>   
              </View>
        



            </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginRight:250
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  bodyContent:{
    paddingTop:40,
    paddingLeft:22,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "white",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:16,
    color: "#696969",
  },
  textInput: {
    height: 40,
    paddingHorizontal: 5,
    borderWidth : 2,
    borderRadius : 8,
    borderColor : '#f1f1f1',
    color : '#999',
    fontSize :14,
    fontWeight :'600',
    left:20,
    width: Dimensions.get('window').width-40,
    marginTop: 8
  },
});