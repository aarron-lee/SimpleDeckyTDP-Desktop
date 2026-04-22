import { useEffect, useState } from "react";
import {
  DeckyToggle,
  DeckyRow,
  DeckySection,
} from "../atoms/DeckyFrontendLib.tsx";
import ErrorBoundary from "../ErrorBoundary.tsx";

const useMinOnClose = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.electronUtilsRender?.getMinOnCloseSetting) {
      window.electronUtilsRender.getMinOnCloseSetting().then(setEnabled);
    }
  }, []);

  const onChange = (enabled: boolean) => {
    if (window.electronUtilsRender?.setMinOnCloseSetting) {
      window.electronUtilsRender.setMinOnCloseSetting(enabled).then(setEnabled);
    }
  };

  return { enabled, onChange };
};

export default function AppSettings() {
  const { enabled, onChange } = useMinOnClose();

  return (
    <ErrorBoundary title="App Settings">
      <DeckySection title="App Settings">
        <DeckyRow>
          <DeckyToggle
            label="Minimize on Close Window"
            checked={enabled}
            onChange={onChange}
          />
        </DeckyRow>
      </DeckySection>
    </ErrorBoundary>
  );
}
