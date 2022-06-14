import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color="grey" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
