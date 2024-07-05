import * as Location from 'expo-location';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { getDirections } from '~/services/directions';

type ScooterData = {
  selectedScooter: any;
  setSelectedScooter: any;
  direction: any;
  directionCoordinates: any;
  routeTime: any;
  routeDistance: any;
};

const ScooterContext = createContext<ScooterData>({
  selectedScooter: null,
  setSelectedScooter: null,
  direction: null,
  directionCoordinates: null,
  routeTime: null,
  routeDistance: null,
});

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [selectedScooter, setSelectedScooter] = useState<any>();
  const [direction, setDirection] = useState<any>();

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
