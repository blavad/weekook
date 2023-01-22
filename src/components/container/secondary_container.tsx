import { Appearance, ImageBackground, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackgroundImgDark, BackgroundImgLight } from '../../const'
import { Header } from '../header'

export default function SecondaryContainer({ children }: any) {
  const insets = useSafeAreaInsets()
  const colorScheme = Appearance.getColorScheme()

  return (
    <ImageBackground
      source={colorScheme === 'dark' ? BackgroundImgDark : BackgroundImgLight}
      resizeMode="stretch"
      style={{
        flex: 1,
        alignItems: 'center',

        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Header style={{ flex: 0.05 }} />
      <View
        style={{
          flex: 0.95,
          alignItems: 'center',
          alignSelf: 'stretch',
        }}
      >
        {children}
      </View>
    </ImageBackground>
  )
}
