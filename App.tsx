import { ImageBackground, View } from 'react-native'
import MainApp from './src/app'
import { Button, i18n } from '@unboared/base-ui.all';
import { en, fr } from "./src/translations"

i18n.translations = { en, fr }

export default function App() {
  return (
      <MainApp />
      // <View>
      //   <Button text="Hello"/>
      //   <Button text="Hello"/>
      //   <Button text="Hello"/>
      // </View>
  )
}
