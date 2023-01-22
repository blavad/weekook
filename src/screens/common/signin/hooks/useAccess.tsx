import React from "react"
import { useLinkTo } from "~/navigation/router"

export const useAccess = () => {
    const linkTo = useLinkTo()

    return {
        accessPlatform: () => linkTo('/'),
        accessSignIn: () => linkTo('/login'),
        accessSignUp: () => linkTo('/signup'),
    }
}