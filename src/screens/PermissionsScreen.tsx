import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { PermissionsContext } from '../context';

const PermissionsScreen = () => {
  const { locationStatus, askLocationPermission } = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permisions screen</Text>
      <Button title="Ask for location permission" onPress={askLocationPermission} />
      <Text>{JSON.stringify({ locationStatus }, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 60,
  },
});

export default PermissionsScreen;
