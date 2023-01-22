import React, { useState } from "react";
import { useMargin } from "../hooks/useMargin";
import { ExtraSignInButtonWithLogo } from "./button"
import { useAuth } from "../../../../services/auth";

export const GoogleSignIn = () => {
    const { smallMargin } = useMargin()
    const loginWithGoogle = useAuth(state => state.loginWithGoogle)

    return (
        <ExtraSignInButtonWithLogo
            tx="common.signin.google.submitButton"
            logo="https://cdn-icons-png.flaticon.com/512/2965/2965278.png"
            logoSize={15}
            style={smallMargin}
            onPress={loginWithGoogle}
        />
    )
}