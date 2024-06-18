import MapBox, {
  Camera,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
  Images,
  CircleLayer,
  LineLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import scooters from 'data/scooters.json';
import pin from '~/assets/pin.png';
import { getDirections } from '~/services/directions';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { useState } from 'react';
import * as Location from 'expo-location';

MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  const [direction, setDirection] = useState<any>();
  const directionCoordinate = direction?.routes?.[0]?.geometry.coordinates;

  const onScooterPressed = async (e: OnPressEvent) => {
    const myLocation = await Location.getCurrentPositionAsync();

    const newDirection = await getDirections(
      [myLocation.coords.longitude, myLocation.coords.latitude],
      [e.coordinates.longitude, e.coordinates.latitude]
    );
    setDirection(newDirection);
  };

  return (
    <MapView style={{ flex: 1 }}>
      <Camera followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={'default'} />

      <ShapeSource
        id="scooters"
        shape={featureCollection(scooters.map((scooter) => point([scooter.long, scooter.lat])))}
        onPress={onScooterPressed}
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
      {directionCoordinate && (
        <ShapeSource
          id="routeSource"
          lineMetrics
          shape={{
            properties: {},
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: directionCoordinate },
          }}>
          <LineLayer
            id="exampleLineLayer"
            style={{ lineColor: '#42A2D9', lineCap: 'round', lineJoin: 'round', lineWidth: 7 }}
          />
        </ShapeSource>
      )}
    </MapView>
  );
};

export default Map;
