import React, { useState } from "react";


import { Text } from "@unboared/base-ui.all";
import { useMargin } from "../hooks/useMargin";
import { ExtraSignInButton } from "./button";
import { useAuth } from "~/services/auth";

export const GuestSignIn = () => {

    const { smallMargin } = useMargin()
    const loginAsGuest = useAuth(state => state.loginAsGuest)

    return (
        <>
            <ExtraSignInButton
                tx="common.signin.guest.submitButton"
                style={smallMargin}
                onPress={loginAsGuest}
            />
            <Text preset="light"
                tx="common.signin.guest.feature1"
                style={{
                    alignSelf: "center",
                    fontFamily: "OpenSansBold"
                }}
            />
            <Text preset="light"
                tx="common.signin.guest.feature2"
                style={{
                    alignSelf: "center",
                    fontFamily: "OpenSansBold"
                }}
            />
        </>
    )
}