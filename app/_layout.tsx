// File: app/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/store/useAuth';
import { ActivityIndicator, View } from 'react-native';

export default function Layout() {
  const { token, isLoading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAuth(); // Load token on app start
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (token) {
      router.replace('/profile'); // Authenticated
    } else {
      router.replace('/'); // Login screen
    }
  }, [isLoading, token]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
