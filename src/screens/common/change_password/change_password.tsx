import React, { useState } from "react";
import { View, ViewStyle } from "react-native";

import { useNormalize, useTranslate, Text, Heading, Button } from "@unboared/base-ui.all";
import { useScreenInfos } from "@unboared/utils.orientation";

import { PasswordInput, useMargin } from "~/screens/common/signin";
import { strengthChecker } from "~/screens/common/signup";
import { useAuth } from "~/services/auth";
import { ActivityIndicator } from '~/components/common/loaders'

export type AuthPageProps = {
  actionCode: string,
  continueUrl: string,
  lang: string,
}

export const ChangePassword = ({ actionCode, continueUrl, lang }: AuthPageProps) => {
  const { normalize } = useNormalize()
  const { translate } = useTranslate()
  const { smallMargin } = useMargin()

  const { isPortrait } = useScreenInfos()
  const [password, setPassword] = useState("");
  const { passwordErrorMessage, onResetPassword } = useAuth()

  const strengthPassword = strengthChecker(password)
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
                <Heading type="h2" style={smallMargin} tx="common.forgotPassword.title" />
                <Text style={smallMargin} tx="common.forgotPassword.description" />
                <PasswordInput
                  password={password}
                  onChangeValue={setPassword}
                  label={translate("common.forgotPassword.label")}
                  placeholder={translate("common.forgotPassword.placeholder")}
                  helperText={passwordErrorMessage || (password.length > 0 ? `Security Level : ${strengthPassword.type}` : undefined)}
                  passwordErrorMessage={translate(passwordErrorMessage)}
                />
                <Button style={smallMargin} tx="common.forgotPassword.submitButton" onPress={() => onResetPassword(password, actionCode, continueUrl, lang)} />
              </View>
            )
        }
      </View>
      {isPortrait ||
        <View style={styles.flexCenter}>
        </View>
      }
    </View>
  );
};

