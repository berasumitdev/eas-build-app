import { useAuth } from '@/store/useAuth';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
    const { user, loadProfile, token, logout } = useAuth();
    const router = useRouter();

    //   get profile
    useEffect(() => {
        loadProfile();
    }, []);

    // const [token] = useState('test123token');

    const openAppB = async () => {

        if (!token) {
      Alert.alert('Error', 'No token available');
      return;
    }

        // const url = `appb://token/${token}`;
        const url = `satelliteoracle://auth?token=${encodeURIComponent(token)}`;
        // const url=`appb://token?token=${token}`;
        // const url ="https://brainhub.eu/library/deliver-react-native-app-to-the-client"

        try {
          
            console.log(`Attempting to open App B with URL: ${url}`);
            const canOpen = await Linking.canOpenURL(url);
            console.log(`Can open App B: ${canOpen}`);
       
            if (canOpen) {
                await Linking.openURL(url);
            } else {
                Alert.alert( 'App Not Found', 
          'Satellite Oracle app is not installed or cannot be opened. Please install it first.',
          [
            { text: 'OK', style: 'default' }
          ]);
            }
        } catch (error) {
            Alert.alert('Error', `Failed to open App B: ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agri-Entrepreneur Digital Diary</Text>
            {/* <Text style={styles.token}>Token to send: {token}</Text> */}

            {user ? (
                <>
                    <Text>Name: {user.name}</Text>
                    <Text>Email: {user.email}</Text>
                </>
            ) : (
                <Text>Loading...</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={openAppB}>
                <Text style={styles.buttonText}>Open Satellite Oracle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                logout();
                router.replace('/');
            }}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //  alignItems: 'center',
        //  justifyContent: 'center',
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
        marginVertical: 20,
        backgroundColor: '#141414',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
