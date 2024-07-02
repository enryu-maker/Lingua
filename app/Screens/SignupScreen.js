import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton'

export default function SignupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.image} />
      <Text style={styles.title}>LinguaFlow</Text>
      <Text>Parlez, apprenez, progressez!</Text>
      <CustomButton
        text="S'inscrire avec Google"
        onPress={() => {/* Handle Google sign-up */}}
        backgroundColor="#3164F3"
        textColor="#ffffff"
      />
      <CustomButton
        text="S'inscrire avec Facebook"
        onPress={() => {/* Handle Facebook sign-up */}}
        backgroundColor="#3164F3"
        textColor="#ffffff"
      />
      <CustomButton
        text="S'inscrire avec Email"
        onPress={() => {/* Handle Email sign-up */}}
        backgroundColor="#3164F3"
        textColor="#ffffff"
      />
      <CustomButton
        text="Parlez tout de suite!"
        onPress={() => navigation.navigate('Speak')}
        backgroundColor="#4BD964"
        textColor="#000000"
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
