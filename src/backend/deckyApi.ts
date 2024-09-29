const plugin_name = "SimpleDeckyTDP";

// https://github.com/SteamDeckHomebrew/decky-loader/blob/8e8e6a2bd1b143633b227022dbe8f2104db2560d/backend/src/legacy/library.js#L11

async function callPluginMethod(method_name: string, arg_object = {}) {
  if (plugin_name == undefined)
    throw new Error(
      "Plugin methods can only be called from inside plugins (duh)"
    );
  const token = await fetch("http://127.0.0.1:1338/auth/token").then((r) =>
    r.text()
  );
  const response = await fetch(
    `http://127.0.0.1:1338/plugins/${plugin_name}/methods/${method_name}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authentication: token,
      },
      body: JSON.stringify({
        args: arg_object,
      }),
    }
  );

  let dta;

  if (response.ok) {
    dta = await response.json();
  } else {
    return response;
  }

  if (!dta) {
    throw new Error(`missing dta ${dta}`);
  }
  return dta;
}

export const serverAPI = {
  callPluginMethod,
};

export const call = (serverApiMethod: string, args: { [key: string]: any }) => {
  return serverAPI.callPluginMethod(serverApiMethod, args);
};

export function callable(serverApiMethod: string): any | undefined {
  return serverAPI.callPluginMethod(serverApiMethod, {});
}
