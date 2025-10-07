import React from "react";
import { Modal, Text, View } from "react-native";
import LoadIcon from "../../../assets/icons/LoadIcon";

interface LoadProps {
  visible?: boolean;
}

export default function Load({ visible }: LoadProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/30">
        <LoadIcon />
      </View>
    </Modal>
  );
}
