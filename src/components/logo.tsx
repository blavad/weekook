import { Heading, useNormalize } from '@unboared/base-ui.all'

export const Logo = ({ size }: { size?: number }) => {
  const { normalize } = useNormalize()
  return (
    <Heading
      style={{ fontFamily: 'GooddogRegular', fontSize: normalize(size || 35) }}
      type="h1"
      text="Weekook"
    />
  )
}
