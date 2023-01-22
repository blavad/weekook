import { ImageBackground, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackgroundImg } from '../../const'
import { Header } from '../header'

export default function SecondaryContainer({ children }: any) {
  const insets = useSafeAreaInsets()
  return (
    <ImageBackground
      source={BackgroundImg}
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
