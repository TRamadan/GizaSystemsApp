import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "gizasystems\\apptest.it",
    authority: "https://login.microsoftonline.com/2mE!b+Z:h&qI22g",
    redirectUri: "http://localhost:4200",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const loginRequest = {
  scopes: [
    "https://gizasystems.sharepoint.com/COC_Landing_Page",
    "Sites.Read.All",
    "Sites.ReadWrite.All"
  ]
};
