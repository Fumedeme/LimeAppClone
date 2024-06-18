import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScooterProvider from '~/providers/scooterProvider';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScooterProvider>
        <Stack />
      </ScooterProvider>
    </GestureHandlerRootView>
  );
}
