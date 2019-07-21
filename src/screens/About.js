import React from 'react'
import { TouchableHighlight, StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'
import {NavigationActions} from 'react-navigation'
import ItemComponent from '../components/ItemComponent'
import {Button} from 'react-native-elements'
import { Icon } from 'react-native-elements'
import SideMenu from 'react-native-side-menu';
import Menu from './../menu/Menu';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const image = require('./../menu/assets/menu.png');

export default class About extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    
    this.state = {
      isOpen: false,
      selectedItem: 'About',
      currentUser: null , 
      items : [], 
      son: [], 
      numChild:null
    };
  }

  
  componentDidMount() {
    //menünün açılması için Params olarak fonksiyonu tanıtmak gerekiyormuş.
    this.props.navigation.setParams({ toggle: this.toggle });
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  
  onMenuItemSelected= (item) =>{
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  
      if(item === 'Ana Sayfa'){
        this.props.navigation.navigate('Main');
      }

      else if(item === 'Arsiv')
      {
        this.props.navigation.navigate('Arsiv');
      }
    
      else if(item === 'About')
      {
        this.props.navigation.navigate('About');
      }
    
      else if (item === 'Friday'){
        this.props.navigation.navigate('Friday');
      }
          
      else if (item === 'Ayarlar'){
        this.props.navigation.navigate('Ayarlar');
      }
  }
   
    static navigationOptions =({ navigation }) => {
      return {
      title: 'Hakkında',
      headerStyle: {
        backgroundColor: '#8c52ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
       <TouchableOpacity style={{marginLeft: 10 }} onPress={navigation.getParam('toggle')}>
            <Image
              source={image}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
      )
      }
  }


   render(){

    const { currentUser } = this.state
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

        return(
        <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            onChange={isOpen => this.updateMenuState(isOpen)}>



      <View style={styles.container}>
        <Text style={{fontSize: 50, fontWeight: 'bold', color: '#8c52ff',}}>
          TWAS
        </Text>

        <Text style={{color: 'blue'}}>
          Think!
          <Text style={{color: 'green'}}> Write!</Text>
          <Text style={{color: 'red'}}> Access!</Text>
        </Text>
        </View>

      <View style={styles.thirdrow}>
          <Text>
          TWAS, Friday Team tarafından geliştirilen online bir not alma uygulamasıdır.
          Online olduğu için de notlarınıza istediğiniz zaman, istediğiniz mobil cihaz ile erişim kolaylığı sağlıyor. 
          {"\n"}
          Uygulamanın temel amacı insanların yapacakları işi unutmamaları için her an yanlarında bulunan bir şeye not almaları gerekiyor işte burada TWAS devreye giriyor. 
          TWAS sayesinde kolaylıkla ve hızlıca not alabiliyorsunuz, ayrıca telefonunuzun başına bir şey gelse dahi notlarınızı bulut depolama hizmeti ile güvenli bir şekilde depolandığı için istediğiniz zaman başka bir cihaz ile notlarınızı tekrar görebiliyorsunuz.
          {"\n"}
          Ayrıca yakın zamanda gelecek olan TWAS masaüstü versiyonu ile notlarınızı ister kişisel bilgisayarımızdan ister telefonunuzdan yazıp istediğiniz zaman istediğiniz cihazınızdan anında erişim sağlayabileceksiniz.
          
          </Text>
          <Text style={{fontSize: 25, color: '#8c52ff', fontWeight: 'bold' }}>
            <Text style={{color: 'black', fontSize: 15}}>Kolayca not al. {""}
            </Text>
            TWAS 
            <Text style={{color: 'black', fontSize: 15}}> {""} Teşekkürler.</Text>
          </Text>
      </View>

      <View style={styles.fourthrow}>
          <Text style={{fontSize: 20, fontWeight: 'bold',}}>
            Destek
          </Text>
          <Text>
            Lütfen soru, hata raporu veya yorumlarınızı bize bildiriniz.
            {"\n"}
          </Text>
          <Text>
            Web Sitesi - https://www.fridayteam23.com
          </Text>
          <Text>
            Instagram - https://www.instagram.com/fridayteam23
          </Text>
          <Text>

          </Text>
          
      </View>


        </SideMenu>
        );
}
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      //justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor:'white',
      top: 28,
      
    }, 

    thirdrow:{
      textAlign: 'center',
      width: 390,
      left: 15,
      backgroundColor:'white',
      color: 'black'
    },

    fourthrow: {
      flex: 1,
      backgroundColor:'white',
      justifyContent: 'flex-end',
      left: 15,
    },
  })