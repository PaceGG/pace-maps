import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { cloneElement, ReactElement, ReactNode } from "react";
import {
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ButtonVariant = "text" | "contained" | "outlined";
export interface VectorIconProps {
  name: string;
  size?: number;
  color?: string;
}
type ButtonIconPosition = "top" | "left" | "right" | "bottom";
export interface ButtonIcon {
  icon: ReactElement<VectorIconProps>;
  position?: ButtonIconPosition;
}

interface ButtonProps {
  children?: ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  color?: string;
  icon?: ButtonIcon;
  width?: DimensionValue;
}

export default function Button({
  children,
  variant = "text",
  color: buttonColor = colors.primary,
  onPress,
  width = "100%",
  icon,
}: ButtonProps) {
  const { icon: iconElement, position = "left" } = icon || {};

  return (
    <View
      style={[
        styles.buttonContainer,
        variant === "contained" && styles.buttonContained,
        variant === "outlined" && {
          ...styles.buttonOutlined,
          borderColor: buttonColor,
        },
        { width: width },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && {
            backgroundColor: buttonColor,
          },
          {
            flexDirection:
              position === "left"
                ? "row"
                : position === "right"
                  ? "row-reverse"
                  : position === "top"
                    ? "column"
                    : position === "bottom"
                      ? "column-reverse"
                      : "row",
          },
        ]}
        onPress={onPress}
      >
        {({ pressed }) => (
          <>
            {iconElement &&
              cloneElement(iconElement, {
                size: rem(1),
                color: pressed
                  ? variant === "contained"
                    ? colors.background
                    : colors.foreground
                  : variant === "text"
                    ? colors.foreground
                    : variant === "contained"
                      ? colors.background
                      : variant === "outlined"
                        ? buttonColor
                        : colors.foreground,
              })}
            {children && (
              <Text
                style={[
                  styles.buttonLabel,
                  variant === "contained" && styles.buttonLabelContained,
                  variant === "outlined" && { color: buttonColor },
                  pressed && styles.buttonLabelPressed,
                ]}
              >
                {children}
              </Text>
            )}
          </>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: rem(4),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  button: {
    width: "100%",
    height: "100%",
    gap: rem(0.5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  buttonContained: {
    backgroundColor: colors.foreground,
  },
  buttonOutlined: {
    borderWidth: 2,
    borderRadius: 100,
  },
  buttonPressed: {
    backgroundColor: colors.primary,
    color: colors.foreground,
  },
  buttonLabel: {
    fontSize: rem(1),
    textTransform: "uppercase",
  },
  buttonLabelPressed: {
    color: colors.foreground,
  },
  buttonLabelContained: {
    color: colors.background,
  },
});
