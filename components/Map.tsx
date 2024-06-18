import MapBox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';
import { useScooter } from '~/providers/scooterProvider';
import LineRoute from './LineRoute';
import ScooterMarkers from './ScooterMarkers';

MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  const { directionCoordinates } = useScooter();

  return (
    <MapView style={{ flex: 1 }}>
      <Camera followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={'default'} />

      <ScooterMarkers />

      {directionCoordinates && <LineRoute coordinates={directionCoordinates} />}
    </MapView>
  );
};

export default Map;
