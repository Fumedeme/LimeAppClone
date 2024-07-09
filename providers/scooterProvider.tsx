import * as Location from 'expo-location';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '~/lib/supabase';

import { getDirections } from '~/services/directions';

type ScooterData = {
  nearbyScooters: any;
  selectedScooter: any;
  setSelectedScooter: any;
  direction: any;
  directionCoordinates: any;
  routeTime: any;
  routeDistance: any;
};

const ScooterContext = createContext<ScooterData>({
  nearbyScooters: null,
  selectedScooter: null,
  setSelectedScooter: null,
  direction: null,
  directionCoordinates: null,
  routeTime: null,
  routeDistance: null,
});

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [nearbyScooters, setNearbyScooters] = useState([]);
  const [selectedScooter, setSelectedScooter] = useState<any>();
  const [direction, setDirection] = useState<any>();

  useEffect(() => {
    const fetchScooters = async () => {
      const userLocation = await Location.getCurrentPositionAsync();
      const { error, data } = await supabase.rpc('nearby_scooters', {
        lat: userLocation.coords.latitude,
        long: userLocation.coords.longitude,
        max_dist_meters: 1500,
      });
      if (error) {
        Alert.alert('Failed to fetch scooters');
      } else {
        setNearbyScooters(data);
      }
    };

    fetchScooters();
  }, []);

  useEffect(() => {
    const fetchDirections = async () => {
      const myLocation = await Location.getCurrentPositionAsync();

      const newDirection = await getDirections(
        [myLocation.coords.longitude, myLocation.coords.latitude],
        [selectedScooter.long, selectedScooter.lat]
      );
      setDirection(newDirection);
    };

    if (selectedScooter) {
      fetchDirections();
    }
  }, [selectedScooter]);

  return (
    <ScooterContext.Provider
      value={{
        nearbyScooters,
        selectedScooter,
        setSelectedScooter,
        direction,
        directionCoordinates: direction ? direction.routes[0].geometry.coordinates : '',
        routeTime: direction?.routes?.[0]?.duration,
        routeDistance: direction?.routes?.[0]?.distance,
      }}>
      {children}
    </ScooterContext.Provider>
  );
}

export const useScooter = () => useContext(ScooterContext);
