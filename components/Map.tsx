import MapBox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';

MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  return (
    <MapView style={{ flex: 1 }}>
      <Camera followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={'default'} />
    </MapView>
  );
};

export default Map;
