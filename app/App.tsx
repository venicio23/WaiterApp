import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import GeneralSans400 from './src/assets/fonts/GeneralSans-Regular.otf';
import GeneralSans500 from './src/assets/fonts/GeneralSans-Semibold.otf';
import GeneralSans600 from './src/assets/fonts/GeneralSans-Bold.otf';

import { Main } from './src/Main';

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
    <>
      <StatusBar style="auto" />
      <Main />
    </>
  );
}

