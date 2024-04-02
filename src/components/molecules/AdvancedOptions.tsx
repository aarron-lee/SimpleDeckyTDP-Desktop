import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux-modules/store";
import {
  getAdvancedOptionsInfoSelector,
  getSteamPatchEnabledSelector,
  updateAdvancedOption,
} from "../../redux-modules/settingsSlice";
import { get } from "lodash";
import ErrorBoundary from "../ErrorBoundary";
import { DeckyRow, DeckySection, DeckyToggle } from "../atoms/DeckyFrontendLib";

export const useIsSteamPatchEnabled = () => {
  const steamPatchEnabled = useSelector(getSteamPatchEnabledSelector);

  return steamPatchEnabled;
};

const AdvancedOptions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { advancedState, advancedOptions } = useSelector(
    getAdvancedOptionsInfoSelector
  );

  if (advancedOptions.length === 0) {
    return null;
  }

  return (
    <DeckySection title="Advanced Options">
      <ErrorBoundary title="Advanced Options">
        {advancedOptions.map((option, idx) => {
          const { name, type, statePath, defaultValue, description } = option;
          const value = get(advancedState, statePath, defaultValue);

          if (type === "boolean") {
            return (
              <DeckyRow>
                <DeckyToggle
                  key={idx}
                  label={name}
                  checked={value}
                  description={description}
                  highlightOnFocus
                  bottomSeparator="none"
                  onChange={(enabled: boolean) => {
                    return dispatch(
                      updateAdvancedOption({ statePath, value: enabled })
                    );
                  }}
                />
              </DeckyRow>
            );
          }

          return null;
        })}
      </ErrorBoundary>
    </DeckySection>
  );
};

export default AdvancedOptions;
