import minimist from "minimist";
import { run } from "./util.mjs";

const {
  _: [env, ...restArgs],
} = minimist(process.argv.slice(2));

// list of applications to build
const restArgsStr = restArgs.join(" ");

let mode = "production";

switch (env) {
  case "stage":
    mode = "staging";
    break;
  case "prod":
    mode = "production";
    break;
  default:
    mode = "development";
}

run({
  pkg: "@app/zendesk",
  cmd: `ENV=${env} MODE=${mode} APPS='${restArgsStr}' yarn build`,
  cwd: "packages/zendesk",
});

// only build app content files if build command is not for local development
// if current environment is local - just power up each application as needed manually
if (env !== "local") {
  const allowedApps = [
    "ticket_sidebar",
    "new_ticket_sidebar",
    "organization_sidebar",
    "user_sidebar",
    "top_bar",
    "nav_bar",
    "modal",
    "ticket_editor",
    "background",
  ];

  for (const appLocation of restArgs) {
    if (!allowedApps.includes(appLocation)) {
      console.error(
        `Unknown app location.
				Check package.json for list of arguments supplied to build script.
				See allowedApps for list of allowed apps`
      );

      continue;
    }

    run({
      pkg: `@app/${appLocation}`,
      cmd: `ADDON_TYPE=${appLocation} yarn build --mode ${mode}`,
      cwd: `packages/${appLocation}`,
    });
  }
}
