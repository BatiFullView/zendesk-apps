let environment = "dev";

switch (import.meta.env.MODE) {
  case "development":
    environment = "dev";
    break;
  case "production":
    environment = "prod";
    break;
  case "staging":
    environment = "stage";
    break;
}

const appUrlExtension = environment === "prod" ? "" : `.${environment}`;
export const INTEGRATIONS_ENDPOINT = `https://integrations${appUrlExtension}.fullview.services/zendesk`;
export const ASSETS_URL = `https://assets${appUrlExtension}.fullview.io`;
export const PLAY_ICON = "intercom-play-icon.png";
export const APP_URL = `https://${
  environment === "prod" ? "app" : environment
}.fullview.io`;
