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
  SliderMark,
  SliderThumb,
  SliderTrack,
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
    <Box>
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
      {description}
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
  return (
    <Box>
      <FormLabel>
        {label} -{" "}
        {notchLabels
          ? notchLabels.find((notch) => notch.value === value)?.label
          : value}
        {valueSuffix}
      </FormLabel>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(value) => {
          return onChange(value);
        }}
      >
        {notchLabels &&
          notchLabels.map((label, idx) => {
            if (typeof label.value === "number")
              return (
                <SliderMark key={idx} value={label.value}>
                  {label.label}
                </SliderMark>
              );
          })}
        <SliderTrack></SliderTrack>
        <SliderThumb />
      </Slider>
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
