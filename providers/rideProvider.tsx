import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase';
import { useAuth } from './authProvider';
import { Alert } from 'react-native';

type RideData = { startRide: any; ride: any; finishRide: any };

const RideContext = createContext<RideData>({ startRide: null, ride: null, finishRide: null });

export default function RideProvider({ children }: PropsWithChildren) {
  const { userId } = useAuth();
  const [ride, setRide] = useState<any>();

  useEffect(() => {
    const fetchActiveRides = async () => {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('user_id', userId)
        .is('finished_at', null);
      if (error) {
        console.log(error);
      } else {
        setRide(data[0]);
      }
    };

    fetchActiveRides();
  }, []);

  const startRide = async (selectedScooterId: number) => {
    if (ride) {
      Alert.alert('Cannot start a new ride while another one is in progress');
      return;
    }
    const { data, error } = await supabase
      .from('rides')
      .insert([{ user_id: userId, scooter_id: selectedScooterId }])
      .select();

    if (error) {
      console.log('Failed to start the ride ', error);
    } else {
      setRide(data[0]);
    }
  };

  const finishRide = async () => {
    if (!ride) {
      return;
    }
    const { data, error } = await supabase
      .from('rides')
      .update({ finished_at: new Date() })
      .eq('id', ride.id);

    if (error) {
      Alert.alert('Failed to finish the ride');
      console.log(error);
    } else {
      setRide(null);
    }
  };

  console.log('Current ride, ', ride);

  return (
    <RideContext.Provider value={{ startRide, ride, finishRide }}>{children}</RideContext.Provider>
  );
}

export const useRide = () => useContext(RideContext);
