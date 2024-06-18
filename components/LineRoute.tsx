import { LineLayer, ShapeSource } from '@rnmapbox/maps';

const LineRoute = ({ coordinates }: any) => {
  return (
    <ShapeSource
      id="routeSource"
      lineMetrics
      shape={{
        properties: {},
        type: 'Feature',
        geometry: { type: 'LineString', coordinates },
      }}>
      <LineLayer
        id="exampleLineLayer"
        style={{ lineColor: '#42A2D9', lineCap: 'round', lineJoin: 'round', lineWidth: 7 }}
      />
    </ShapeSource>
  );
};

export default LineRoute;
