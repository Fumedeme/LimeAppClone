import { Stack } from 'expo-router';
import ActiveRideSheet from '~/components/ActiveRideSheet';
import Map from '~/components/Map';
import SelectedScooterSheet from '~/components/SelectedScooterSheet';

export default function Home() {
  //2. 39. 01
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Map />
      <SelectedScooterSheet />
      <ActiveRideSheet />
    </>
  );
}
