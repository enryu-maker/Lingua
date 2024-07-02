import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
// import { Permissions } from 'expo';
import { Video } from 'expo-av';
import CustomButton from '../../components/CustomButton'
// import {expect, jest, test} from '@jest/globals';
export default function SpeakScreen({ navigation }) {
  const [recording, setRecording] = useState();
  const [currentState, setCurrentState] = useState('idle'); // 'idle', 'listening', 'loading', 'thinking'
  const [videoUrl, setVideoUrl] = useState('');
  const [sound, setSound] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
//   jest.mock('expo', () => ({
//     Permissions: {
//         askAsync: jest.fn(),
//     }
// }));
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  const stopRecording = async () => {
    setCurrentState('loading');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    await processSpeech(uri);
  };

  const processSpeech = async (uri) => {
    const url = 'http://127.0.0.1:5000/process-speech'; // Replace with your API endpoint
    const fileType = uri.split('.').pop();
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: `recording.${fileType}`,
      type: `audio/${fileType}`,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setCurrentState('thinking');
        fetchResult();
      } else {
        console.error('Failed to process speech', response.status);
      }
    } catch (err) {
      console.error('Failed to process speech', err);
    }
  };

  const fetchResult = async () => {
    const url = 'http://127.0.0.1:5000/result'; // Replace with your API endpoint
    try {
      while (true) {
        const response = await fetch(url);
        if (response.status === 200) {
          const responseBody = await response.json();
          console.log('Response body:', responseBody); // Debug print
          setVideoUrl(responseBody.url);
          setCurrentState('idle');
          break;
        } else {
          console.error('Failed to fetch result', response.status);
        }
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust the delay as needed
      }
    } catch (err) {
      console.error('Failed to fetch result', err);
    }
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'listening':
        return (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color="#000000" />
            <Text>Listening</Text>
          </View>
        );
      case 'loading':
        return (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color="#000000" />
            <Text>Connecting</Text>
          </View>
        );
      case 'thinking':
        return (
          <View style={styles.stateContainer}>
            <ActivityIndicator size="large" color="#000000" />
            <Text>Thinking</Text>
          </View>
        );
      case 'idle':
      default:
        return videoUrl ? (
          <Video
            source={{ uri: videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            style={styles.video}
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setVideoUrl('');
                startRecording(); // Start listening again after video is played
              }
            }}
          />
        ) : (
          <Image source={require('../../assets/images/avatar.png')} style={styles.image} />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>{renderCurrentState()}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={[
            styles.recordButton,
            { backgroundColor: recording ? 'green' : 'red' },
          ]}
        >
          <Text style={styles.buttonText}>{recording ? 'Stop' : 'Record'}</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        text="Return to Home"
        onPress={() => navigation.navigate('Home')}
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  video: {
    width: 320,
    height: 240,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 20,
  },
  recordButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
