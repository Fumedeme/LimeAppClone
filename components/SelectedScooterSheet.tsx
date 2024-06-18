import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { Image, Text, View } from 'react-native';
import { useScooter } from '~/providers/scooterProvider';
import scooterImage from 'assets/scooter.png';

const SelectedScooterSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedScooter, routeDistance, routeTime } = useScooter();

  useEffect(() => {
    bottomSheetRef.current?.expand();
  }, [selectedScooter]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[200]}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#414442' }}>
      <BottomSheetView style={{ flex: 1, flexDirection: 'row', padding: 10, gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Image source={scooterImage} style={{ width: 50, height: 50 }} />
          <Text>Lime - S</Text>
          <Text>XXX-LM8</Text>
        </View>
        <View>
          <Text style={{ color: 'white' }}>{(routeDistance / 1000).toFixed(1)} KM</Text>
          <Text style={{ color: 'white' }}>{(routeTime / 60).toFixed(1)} min</Text>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SelectedScooterSheet;
