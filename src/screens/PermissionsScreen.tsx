import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PurpleButton } from '../components/PurpleButton';
import { PermissionsContext } from '../context';

const PermissionsScreen = () => {
  const { locationStatus, askLocationPermission } = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The location permission is required to use this application</Text>
      <PurpleButton title="Permission" onPress={askLocationPermission} />
      <Text style={{ marginTop: 20 }}>{JSON.stringify({ locationStatus }, null, 5)}</Text>
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
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default PermissionsScreen;
