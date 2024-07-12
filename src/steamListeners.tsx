import { extractCurrentGameInfo } from "./utils/constants";
import { store } from "./redux-modules/store";
import { setAcPower, setCurrentGameInfo } from "./redux-modules/settingsSlice";
import {
  AdvancedOptionsEnum,
  getCurrentAcPowerStatus,
  getSupportsCustomAcPower,
  logInfo,
} from "./backend/utils";

let currentGameInfoListenerIntervalId: undefined | number;
let previousIsAcPower: boolean | undefined;

export const currentGameInfoListener = () => {
  currentGameInfoListenerIntervalId = window.setInterval(() => {
    const results = extractCurrentGameInfo();

    const { settings } = store.getState();

    const { isAcPower, advanced } = settings;

    const compareId =
      isAcPower && advanced[AdvancedOptionsEnum.AC_POWER_PROFILES]
        ? `${results.id}-ac-power`
        : results.id;

    if (
      settings.currentGameId !== compareId ||
      settings.isAcPower !== previousIsAcPower
    ) {
      previousIsAcPower = settings.isAcPower;

      // new currentGameId, dispatch to the store
      store.dispatch(setCurrentGameInfo(results));
    }
  }, 500);

  return () => {
    if (currentGameInfoListenerIntervalId) {
      clearInterval(currentGameInfoListenerIntervalId);
    }
  };
};

let eACState: number | undefined;

const setAcState = (newACState: number) => {
  // eACState = 2 for AC power, 1 for Battery
  if (newACState !== eACState) {
    eACState = newACState;
    store.dispatch(setAcPower(newACState));
  }
};

export const acPowerEventListener = async () => {
  try {
    const supportsCustomAcPowerManagement = await getSupportsCustomAcPower();

    if (supportsCustomAcPowerManagement) {
      const intervalId = window.setInterval(async () => {
        const current_ac_power_status = await getCurrentAcPowerStatus();

        let newACState = 1;

        if (current_ac_power_status === "1") {
          newACState = 2;
        }

        setAcState(newACState);
      }, 1000);

      const unregister = () => {
        window.clearInterval(intervalId);
      };

      return unregister;
    }
  } catch (e) {
    logInfo(`error in ac power listener ${e}`);
  }
};
