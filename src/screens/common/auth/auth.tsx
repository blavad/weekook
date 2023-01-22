import React from "react";
import { ChangePassword } from "../change_password";
import { useParams, useSearchParams } from "~/navigation/router";

export const Auth = () => {
  const params = useParams()
  console.log("AUTH PARAMS")
  console.log(params)
  // const [searchParams, setSearchParams] = useSearchParams()

  // Get the action to complete.
  const mode = params.mode
  // Get the one-time code from the query parameter.
  const actionCode = params.oobCode
  // (Optional) Get the continue URL from the query parameter if available.
  const continueUrl = params.continueUrl
  // (Optional) Get the language code if available.
  const lang = params.lang || 'en';

  let page;
  // Handle the user management action.
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      page = <ChangePassword actionCode={actionCode} continueUrl={continueUrl} lang={lang} />
      break;
    case 'recoverEmail':
      // Display email recovery handler and UI.
      page = <ChangePassword actionCode={actionCode} continueUrl={continueUrl} lang={lang} />
      break;
    case 'verifyEmail':
      // Display email verification handler and UI.
      page = <ChangePassword actionCode={actionCode} continueUrl={continueUrl} lang={lang} />
      break;
    default:
    // Error: invalid mode.
    // 404 error
  }

  return page
}