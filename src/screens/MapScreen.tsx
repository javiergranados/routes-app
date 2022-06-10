import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Icon name="map-outline" color="grey" size={50} />
        Map screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
});

export default MapScreen;
