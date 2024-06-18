import MapBox, {
  Camera,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
  Images,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import scooters from 'data/scooters.json';
import pin from '~/assets/pin.png';

MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  return (
    <MapView style={{ flex: 1 }}>
      <Camera followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={'default'} />

      <ShapeSource
        id="scooters"
        shape={featureCollection(scooters.map((scooter) => point([scooter.long, scooter.lat])))}>
        <SymbolLayer
          id="scooter-icons"
          style={{ iconImage: 'pin', iconSize: 0.5, iconAllowOverlap: true }}
        />
        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
};

export default Map;
