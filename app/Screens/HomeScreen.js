// HomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton'

export default function AppScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/home_screen.png')} style={styles.image} />
      <Text style={styles.title}>LinguaFlow</Text>
      <Text>Parlez, apprenez, progressez!</Text>
      <CustomButton
        text="Commencer"
        onPress={() => navigation.navigate('Signup')}
        backgroundColor="#4BD964"
        textColor="#000000"
      />
      <CustomButton
        text="J'ai déjà un compte"
        onPress={() => navigation.navigate('Login')}
        backgroundColor="#3164F3"
        textColor="#ffffff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
