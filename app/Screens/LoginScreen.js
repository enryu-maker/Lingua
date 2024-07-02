import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.image} />
      <Text style={styles.title}>LinguaFlow</Text>
      <Text>Parlez, apprenez, progressez!</Text>
      <CustomButton
        text="Se Connecter avec Google"
        onPress={() => {/* Handle Google sign-in */}}
        backgroundColor="#3164F3"
        textColor="#ffffff"
      />
      <CustomButton
        text="Se Connecter avec Facebook"
        onPress={() => {/* Handle Facebook sign-in */}}
        backgroundColor="#3164F3"
        textColor="#ffffff"
      />
      <CustomButton
        text="Se Connecter avec Email"
        onPress={() => {/* Handle Email sign-in */}}
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
