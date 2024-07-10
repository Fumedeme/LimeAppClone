import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from '~/providers/authProvider';
import RideProvider from '~/providers/rideProvider';
import ScooterProvider from '~/providers/scooterProvider';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ScooterProvider>
          <RideProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </RideProvider>
        </ScooterProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
