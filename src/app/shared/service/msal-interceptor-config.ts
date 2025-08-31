import { MsalInterceptorConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // 🔥 Tell MSAL which endpoints need tokens and which scopes to use
  protectedResourceMap.set(
    "https://gizasystems.sharepoint.com/sites/GizaSystems_Company/_api/",
    ["Sites.Read.All"]
  );
  protectedResourceMap.set(
    "https://graph.microsoft.com/v1.0/",
    ["Sites.Read.All", "User.Read"]
  );

  return {
    interactionType: InteractionType.Popup, // can also be 'redirect'
    protectedResourceMap
  };
}
