import React from 'react';
import { View, StyleSheet } from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
