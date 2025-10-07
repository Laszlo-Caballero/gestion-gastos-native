import React, {
  cloneElement,
  ComponentProps,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import cx from "../../../utils/cx";

interface InputProps extends ComponentProps<typeof TextInput> {
  placeholder?: string;
  secureTextEntry?: boolean;
  ref?: Ref<TextInput>;
  label?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onPressIcon?: () => void;
  error?: string;
}

export default function Input({
  placeholder,
  secureTextEntry,
  icon,
  onPressIcon,
  disabled,
  error,
  ...props
}: InputProps) {
  return (
    <View className="flex flex-col w-full gap-y-[6px]">
      <Text className={cx(error && "text-red-500")}>{props.label}</Text>
      <View className="relative w-full">
        <TextInput
          {...props}
          secureTextEntry={secureTextEntry}
          className={cx(
            "w-full px-[11px] py-[13px] border border-g-gray-2 rounded-xl",
            error && "border-red-500  placeholder:text-red-500"
          )}
          placeholder={placeholder}
        />
        {isValidElement(icon) && (
          <Pressable
            className="absolute right-3 top-[50%] -translate-y-[50%]"
            onPress={(e) => {
              e.preventDefault();
              onPressIcon?.();
            }}
            disabled={disabled}
          >
            {cloneElement(
              icon as ReactElement<{
                size: number;
                color: string;
                className?: string;
              }>,
              {
                size: 18,
                color: "#7A8A85",
              }
            )}
          </Pressable>
        )}
      </View>

      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
}
