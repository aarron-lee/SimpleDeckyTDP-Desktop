/*
  Components in this file will be replaced in different frontends,
  such as the Electron SimpleDeckyTDP frontend
*/
import {
  Box,
  Button,
  Divider,
  FormLabel,
  HStack,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { store } from "../../redux-modules/store";

export const IS_DESKTOP = true;

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
    <Box padding={"8px"} margin="16px">
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
  disabled?: boolean;
  description?: string;
  highlightOnFocus?: boolean;
  bottomSeparator?: string;
};

export const DeckyToggle: FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  description,
  disabled,
}) => {
  return (
    <>
      <Box>
        <FormLabel>{label}</FormLabel>
        <HStack spacing="16px">
          <Switch
            isChecked={checked}
            disabled={disabled}
            onChange={(e) => {
              const value = e.target.checked;

              return onChange(value);
            }}
          />
          <span>{description}</span>
        </HStack>
      </Box>
      <Divider margin="8px 0" />
    </>
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

  const hasLargeNotchLabels = [
    "Energy Performance Preference",
    "Power Governor",
  ].includes(label);

  return (
    <>
      <Box marginBlockStart="32px">
        <FormLabel>
          {label} - {notchLabels ? getLabelText(value) : value}
          {valueSuffix}
        </FormLabel>
        <Box padding={"0 16px"}>
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
            <Box>
              {notchLabels &&
                notchLabels.map((label, idx) => {
                  if (typeof label.value === "number") {
                    const labelText = getLabelText(label.value);
                    const spans = labelText?.split(" ")?.map((word, i) => {
                      return <span key={i}>{word}</span>;
                    });
                    let ml = "-20.5px";

                    if (hasLargeNotchLabels) {
                      ml = "-30.5px";
                      if (idx === notchLabels.length - 1) {
                        // marginLeft must be even larger for last element
                        ml = "-60.5px";
                      }
                    }

                    return (
                      <SliderMark
                        key={idx}
                        mt="1"
                        ml={ml}
                        value={label.value}
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                      >
                        {spans}
                      </SliderMark>
                    );
                  }
                })}
            </Box>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Box>
    </>
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
  const state = store.getState();

  if (state.settings.enableTdpProfiles) {
    return "default-desktop";
  }

  return "default";
}

export function getCurrentGameInfo() {
  const id = getCurrentGameId();
  const results = {
    id,
    displayName: id,
  };

  return results;
}
