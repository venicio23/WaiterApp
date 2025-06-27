import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';

import { Text } from './src/components/Text'

import GeneralSans400 from './src/assets/fonts/GeneralSans-Regular.otf';
import GeneralSans500 from './src/assets/fonts/GeneralSans-Semibold.otf';
import GeneralSans600 from './src/assets/fonts/GeneralSans-Bold.otf';

export default function App() {
  const [isFontsLoaded] = useFonts({
    'GeneralSans-400': GeneralSans400,
    'GeneralSans-600': GeneralSans500,
    'GeneralSans-700': GeneralSans600
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text >Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
