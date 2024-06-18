import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getDirections } from '~/services/directions';
import getDistance from '@turf/distance';

type ScooterData = {
  selectedScooter: any;
  setSelectedScooter: any;
  direction: any;
  directionCoordinates: any;
  routeTime: any;
  routeDistance: any;
  isNearby: any;
};

const ScooterContext = createContext<ScooterData>({
  selectedScooter: null,
  setSelectedScooter: null,
  direction: null,
  directionCoordinates: null,
  routeTime: null,
  routeDistance: null,
  isNearby: null,
});

const ScooterProvider = ({ children }: PropsWithChildren) => {
  const [selectedScooter, setSelectedScooter] = useState();
  const [direction, setDirection] = useState<any>();
  const [isNearby, setIsNearby] = useState<boolean>(false);

  useEffect(() => {
    Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
      console.log('location updated ', newLocation);
      const distance = getDistance();
    });
  }, []);

  useEffect(() => {
    const fetchDirections = async () => {
      const myLocation = await Location.getCurrentPositionAsync();
      const newDirection = await getDirections(
        [myLocation.coords.longitude, myLocation.coords.latitude],
        [selectedScooter.long, selectedScooter.lat]
      );
      console.log(newDirection);
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
        directionCoordinates: direction?.routes?.[0]?.geometry.coordinates,
        routeTime: direction?.routes?.[0]?.duration,
        routeDistance: direction?.routes?.[0]?.distance,
        isNearby,
      }}>
      {children}
    </ScooterContext.Provider>
  );
};

export const useScooter = () => useContext(ScooterContext);

export default ScooterProvider;
