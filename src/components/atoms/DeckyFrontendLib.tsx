/*
  Components in this file will be replaced in different frontends,
  such as the Electron SimpleDeckyTDP frontend
*/
import {
  Box,
  Button,
  FormLabel,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Switch,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

// from decky-frontend-lib
export type NotchLabel = {
  notchIndex: number;
  label: string;
  value?: number;
};

type SectionProps = {
  title?: string;
  children?: any;
};

export const DeckySection: FC<SectionProps> = ({ title, children }) => {
  return (
    <Box padding={"16px"} margin="16px" border="2px solid black">
      {title && <Heading size="lg">{title}</Heading>}
      <Box>{children}</Box>
    </Box>
  );
};

export const DeckyRow = Box;

type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: any;
  description?: string;
  highlightOnFocus?: boolean;
  bottomSeparator?: string;
};

export const DeckyToggle: FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  description,
}) => {
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <Switch
        isChecked={checked}
        onChange={(e) => {
          const value = e.target.checked;

          return onChange(value);
        }}
      />
      <Box>{description}</Box>
    </Box>
  );
};

type SliderProps = {
  label: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  notchCount?: number;
  description?: string;
  validValues?: string;
  valueSuffix?: string;
  notchLabels?: NotchLabel[];
  notchTicksVisible?: boolean;
  showValue?: boolean;
  bottomSeparator?: string;
  onChange: any;
};

export const DeckySlider: FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  notchLabels,
  valueSuffix,
  step,
  onChange,
}) => {
  const getLabelText = (value?: number) => {
    const notch = notchLabels?.find((notch) => notch.value === value);
    if (notch) {
      let label = notch.label === "Perform ance" ? "Performance" : notch.label;
      return label;
    }
  };

  return (
    <Box>
      <FormLabel>
        {label} - {notchLabels ? getLabelText(value) : value}
        {valueSuffix}
      </FormLabel>
      <Box padding={"8px 16px"}>
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(value) => {
            return onChange(value);
          }}
          margin={"16px 0"}
        >
          {notchLabels &&
            notchLabels.map((label, idx) => {
              if (typeof label.value === "number") {
                const labelText = getLabelText(label.value);
                return (
                  <SliderMark
                    key={idx}
                    mt="1"
                    ml="-20.5"
                    value={label.value}
                    overflowWrap={"break-word"}
                  >
                    {labelText}
                  </SliderMark>
                );
              }
            })}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Box>
  );
};

export const DeckyButton = Button;

type FieldProps = {
  disabled?: boolean;
  label: string;
  bottomSeparator?: string;
  children: any;
};

export const DeckyField: FC<FieldProps> = ({ label, children }) => {
  return (
    <Text>
      {label} - {children}
    </Text>
  );
};

export function getCurrentGameId() {
  return `default`;
}

export function getCurrentGameInfo() {
  const results = {
    id: getCurrentGameId(),
    displayName: `default`,
  };

  return results;
}
