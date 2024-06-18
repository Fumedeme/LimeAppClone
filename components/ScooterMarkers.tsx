import { CircleLayer, Images, ShapeSource, SymbolLayer } from '@rnmapbox/maps';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { useScooter } from '~/providers/scooterProvider';
import scooters from 'data/scooters.json';
import { featureCollection, point } from '@turf/helpers';
import pin from '~/assets/pin.png';

const ScooterMarkers = () => {
  const { setSelectedScooter } = useScooter();

  const onScooterPressed = async (e: OnPressEvent) => {
    if (e.features[0].properties?.scooter) {
      setSelectedScooter(e.features[0].properties?.scooter);
    }
  };

  return (
    <ShapeSource
      id="scooters"
      shape={featureCollection(
        scooters.map((scooter) => point([scooter.long, scooter.lat], { scooter }))
      )}
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
  );
};

export default ScooterMarkers;
