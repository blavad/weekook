import { Heading, useNormalize } from '@unboared/base-ui.all'

export const Logo = ({ size }: { size?: number }) => {
  const { normalize } = useNormalize()
  return (
    <Heading
      style={{ fontFamily: 'GoodDogRegular', fontSize: normalize(size || 20) }}
      type="h1"
      text="Weekook"
    />
  )
}
