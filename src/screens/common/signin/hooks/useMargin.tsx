import React from 'react'
import { useNormalize, space } from '@unboared/base-ui.all'

export const useMargin = () => {
    const { normalize } = useNormalize()

    const smallMargin = {
        marginVertical: normalize(space.tiny)
    }

    const mediumMargin = {
        marginVertical: normalize(space.smaller)
    }
    const largeMargin = {
        marginVertical: normalize(space.small)
    }

    return { smallMargin, mediumMargin, largeMargin }
}