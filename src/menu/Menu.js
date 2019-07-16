import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri }}
        />
        <Text style={styles.name}>Your name</Text>
      </View>

      <Text
        onPress={() => onItemSelected('Ana Sayfa')}
        style={styles.item}
      >
        Notlar
      </Text>

      <Text
        onPress={() => onItemSelected('Arsiv')}
        style={styles.item}
      >
        Arşiv
      </Text>

      <Text
        onPress={() => onItemSelected('Friday')}
        style={styles.item}
      >
        Çöp Kutusu
      </Text>

      <Text
        onPress={() => onItemSelected('About')}
        style={styles.item}
      >
        Hakkında
      </Text>

      <Text
        onPress={() => onItemSelected('Ayarlar')}
        style={styles.item}
      >
        Ayarlar
      </Text>
      
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};