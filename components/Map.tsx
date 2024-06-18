import MapBox, {
  Camera,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
  Images,
  CircleLayer,
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
        shape={featureCollection(scooters.map((scooter) => point([scooter.long, scooter.lat])))}
        cluster>
        <SymbolLayer
          id="clusters-count"
          style={{
            textField: ['get', 'point_count'],
            textSize: 18,
            textColor: '#ffffff',
            textPitchAlignment: 'map',
          }}
        />

        <CircleLayer
          id="clusters"
          belowLayerID="clusters-count"
          filter={['has', 'point_count']}
          style={{
            circlePitchAlignment: 'map',
            circleColor: '#42E100',
            circleRadius: 20,
            circleOpacity: 1,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
          }}
        />

        <SymbolLayer
          id="scooter-icons"
          filter={['!', ['has', 'point_count']]}
          style={{ iconImage: 'pin', iconSize: 0.5, iconAllowOverlap: true, iconAnchor: 'bottom' }}
        />

        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
};

export default Map;
