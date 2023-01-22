import React from "react";
import { Platform, View, ViewStyle } from "react-native";

import { useScreenInfos } from "@unboared/utils.orientation";
import { useNormalize, useTranslate, Text, Heading } from "@unboared/base-ui.all";
import { useParams, useSearchParams } from "~/navigation/router";

import { ExtraSignInButtonWithLogo, useMargin } from "~/screens/common/signin";

type DomainType = {
  name: string
  logo: string
  path: string,
}

const gmailDomain: DomainType = {
  name: "Gmail",
  logo: "https://cdn.icon-icons.com/icons2/2631/PNG/512/gmail_new_logo_icon_159149.png",
  path: "https://mail.google.com/",
}

const outlookDomain: DomainType = {
  name: "Outlook",
  logo: "https://seeklogo.com/images/O/outlook-logo-7117D18788-seeklogo.com.png",
  path: "https://outlook.office365.com/mail/inbox",
}

const defaultDomain: DomainType = {
  name: "",
  logo: "",
  path: "",
}

const DOMAIN = {
  "gmail.com": gmailDomain,
  "outlook.com": outlookDomain,
  "hotmail.com": outlookDomain,
  "other": defaultDomain
}

export const EmailVerification = () => {
  const { mail } = useParams()
  console.log("Params")
  console.log(mail)

  // Get the action to complete.
  const domain: string = (mail ? mail.split('@')[1] : "")
  const domainInfos = Object.keys(DOMAIN).includes(domain) ? DOMAIN[domain] : DOMAIN['other']

  const { normalize } = useNormalize()
  const { translate } = useTranslate()
  const { smallMargin } = useMargin()

  const { isPortrait } = useScreenInfos()

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
        <View style={styles.content}>
          <Heading type="h2" style={smallMargin} tx="common.email_auth.title" />
          <Text style={smallMargin} tx="common.email_auth.description" />
          {
            Platform.OS === "web" &&
            domainInfos.path &&
            <ExtraSignInButtonWithLogo
              logo={domainInfos.logo}
              text={`${translate("common.email_auth.submitButton")} ${domainInfos.name}`}
              onPress={() => window.open(domainInfos.path, '_blank')}
            />
          }
        </View>
      </View>
      {isPortrait ||
        <View style={styles.flexCenter}>
        </View>
      }
    </View>
  );
};

