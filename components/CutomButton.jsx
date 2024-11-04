import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const CutomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-yellow-500 mt-5 min-h-[50px] justify-center items-center px-3 py-1 rounded-xl ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}>
      <Text className=" text-lg text-primary font-psemibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default CutomButton;

const styles = StyleSheet.create({});
