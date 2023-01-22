import { Button, useNormalize } from "@unboared/base-ui.all"
import { View } from "react-native"

export const BottomButton = ({ icon, text, onPress }: any) => {
  const { normalize } = useNormalize()
  return (
    <View
      style={{
        position: 'absolute',
        alignSelf: 'center',
        bottom: normalize(10),
      }}
    >
      <Button icon={icon} size={15} text={text} onPress={onPress} />
    </View>
  )
}
