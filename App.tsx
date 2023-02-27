import { useCallback, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import MainApp from './src/app'
import { Button, i18n } from '@unboared/base-ui.all'
import { useLanguage } from '@unboared/utils.language'
import { en, fr } from './src/translations'
import { SafeAreaProvider } from 'react-native-safe-area-context'

i18n.translations = { en, fr }

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    GoodDogRegular: require('./assets/fonts/gooddog-plain.regular.ttf'),
    KalamLight: require('./assets/fonts/Kalam/Kalam-Light.ttf'),
    KalamRegular: require('./assets/fonts/Kalam/Kalam-Regular.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    OpenSansRegular: require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    OpenSansSemiBold: require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
  })

  const { setLanguage } = useLanguage()

  useEffect(() => {
    setLanguage('fr')
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <View
        style={{ width: '100%', height: '100%' }}
        onLayout={onLayoutRootView}
      >
        <MainApp />
      </View>
    </SafeAreaProvider>
  )
}
