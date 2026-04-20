import { useEffect, useState } from "react";
import {
  DeckyToggle,
  DeckyRow,
  DeckySection,
} from "../atoms/DeckyFrontendLib.tsx";
import ErrorBoundary from "../ErrorBoundary.tsx";

export default function AppSettings() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {}, []);

  return (
    <ErrorBoundary title="App Settings">
      <DeckySection title="App Settings">
        <DeckyRow>
          <DeckyToggle
            label="Minimize on Close Window"
            checked={enabled}
            onChange={() => {}}
          />
        </DeckyRow>
      </DeckySection>
    </ErrorBoundary>
  );
}
