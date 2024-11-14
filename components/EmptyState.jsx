import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CutomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} resizeMode="contain" className="h-60" />

      <View className="space-y-2">
        <Text className="text-white text-xl font-bold text-center">
          {title}
        </Text>
        <Text className="text-gray-100 text-sm font-psemibold text-center">
          {subtitle}
        </Text>
      </View>
      <CustomButton
        onPress={() => router.push("/Create")}
        title="Create a video"
        containerStyles="w-full"
      />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
