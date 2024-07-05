import { Redirect, Stack } from 'expo-router';
import { Button } from 'react-native';
import Map from '~/components/Map';
import SelectedScooterSheet from '~/components/SelectedScooterSheet';
import { supabase } from '~/lib/supabase';

export default function Home() {
  //return <Redirect href={'auth/'} />;
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Map />
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      <SelectedScooterSheet />
    </>
  );
}
