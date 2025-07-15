import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Linking from 'expo-linking';

export default function HomeScreen() {

const [token] = useState('test123token');

  const openAppB = async () => {
    const url = `appb://token/${token}`;
    // const url ="https://brainhub.eu/library/deliver-react-native-app-to-the-client"
    
    try {
      console.log('====================================');
      console.log(`Attempting to open App B with URL: ${url}`);
      console.log('====================================');
      const canOpen = await Linking.canOpenURL(url);
      console.log('====================================');
      console.log(`Can open App B: ${canOpen}`);
      console.log('====================================');
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'App B is not installed or cannot be opened');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to open App B: ${error}`);
    }
  };

  return (
 <View style={styles.container}>
      <Text style={styles.title}>App A (Sender)</Text>
      <Text style={styles.token}>Token to send: {token}</Text>
      <TouchableOpacity style={styles.button} onPress={openAppB}>
        <Text style={styles.buttonText}>Open App B with Token</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  token: {
    fontSize: 16,
    marginBottom: 30,
    color: 'gray',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});