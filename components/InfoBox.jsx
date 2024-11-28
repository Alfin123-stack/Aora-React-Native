import { StyleSheet, Text, View } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center">
      <Text className="text-white text-xl font-psemibold">{title}</Text>
      <Text className="text-gray-100 text-sm">{subtitle}</Text>
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({});
