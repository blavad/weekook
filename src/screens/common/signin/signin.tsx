import React, { useEffect } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { useTheme } from 'rn-css'
import { useLinkTo } from "~/navigation/router";

import { useNormalize, useTranslate, accent_color, Text, Theme, unboaredTheme } from "@unboared/base-ui.all";
import { useScreenInfos } from "@unboared/utils.orientation";

import { useMargin } from "./hooks/useMargin";
import { log } from "~/config/env";
import { EmailPasswordSignIn } from "./components/email_password";
import { GoogleSignIn } from "./components/google";
import { GuestSignIn } from "./components/guest";
import { useAuth } from "~/services/auth";
import { ActivityIndicator } from "~/components/common/loaders";

/**
 * Sign in page.
 */
export const SignIn = () => {
  log.debug("Mount SignIn")
  const { normalize } = useNormalize()
  const { isPortrait } = useScreenInfos()
  const loading = useAuth(state => state.loading)

  const styles = {
    container: {
      flexDirection: "row",
    } as ViewStyle,
    flexCenter: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    } as ViewStyle,
    content: {
      width: normalize(250),
      justifyContent: "center"
    } as ViewStyle
  }

  return (
    <View style={[styles.flexCenter, styles.container]}>
      <View style={styles.flexCenter}>
        {
          loading ?
            <ActivityIndicator /> :
            (
              <View style={styles.content}>
                <EmailPasswordSignIn />
                <Separator />
                <GoogleSignIn />
                {isPortrait && <>
                  <Separator />
                  <GuestSignIn />
                </>}
                <CreateAccountLink />
              </View>
            )
        }
      </View>
      {
        isPortrait ||
        <View style={styles.flexCenter}>
          {loading ||
            <View style={styles.content}>
              <GuestSignIn />
            </View>
          }
        </View>
      }
    </View>
  );
};

/**
 * The link to the signup page.
 */
const CreateAccountLink = () => {
  const { translate } = useTranslate()
  const { largeMargin } = useMargin()

  const linkTo = useLinkTo()
  const resetFields = useAuth(state => state.resetFields)

  return (
    <Pressable onPress={() => {
      resetFields()
      linkTo('/signup')
    }}>
      <Text style={{ ...largeMargin, fontFamily: "OpenSansBold", alignSelf: "center" }}>
        {translate("common.signin.noAccount.message")} <Text style={{
          color: accent_color.important, fontFamily: "OpenSansBold"
        }} tx="common.signin.noAccount.createAccount"
        />
      </Text>
    </Pressable>
  )
}

const Separator = () => {
  const theme = useTheme();
  const currentTheme = (theme as Theme) || unboaredTheme.default;
  const { normalize } = useNormalize()
  const { smallMargin } = useMargin()

  return (
    <Text
      preset="light"
      tx="common.signin.or"
      style={{
        ...smallMargin,
        fontSize: normalize(currentTheme.sizeH4),
        alignSelf: "center",
        fontFamily: "OpenSansBold",
      }}
    />
  )
}

export default SignIn;