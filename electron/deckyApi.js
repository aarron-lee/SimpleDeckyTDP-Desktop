const fs = require("fs");

function initializeApi(app) {
  async function apiRequest(endpoint, args) {
    try {
      const token = await fetch("http://127.0.0.1:1338/auth/token").then((r) =>
        r.text()
      );
      const response = await fetch(
        `http://127.0.0.1:1338/plugins/SimpleDeckyTDP/methods/${endpoint}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authentication: token,
          },
          body: JSON.stringify({
            args,
          }),
        }
      );
      return response;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  function getDeckySettings() {
    const settingsJsonPath = `${app.getPath(
      "home"
    )}/homebrew/settings/SimpleDeckyTDP/settings.json`;

    try {
      if (fs.existsSync(settingsJsonPath)) {
        const rawData = fs.readFileSync(settingsJsonPath);

        const settings = JSON.parse(rawData);

        return settings;
      }
    } catch (e) {
      console.error(e);
    }
    return;
  }

  return { getDeckySettings, apiRequest };
}

module.exports = {
  initializeApi,
};
