import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";

const ActionMenu = () => {
  return (
    <View className="bg-gray-800 px-8 py-4 rounded-lg flex gap-4 justify-start absolute top-16 right-[20px]">
      <TouchableOpacity>
        <View className="flex flex-row gap-2">
          <Image
            source={icons.bookmark}
            resizeMode="contain"
            className="w-5 h-5"
          />
          <Text className="text-white text-sm font-psemibold">Save</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="flex flex-row gap-2">
          <Image source={icons.plus} resizeMode="contain" className="w-5 h-5" />
          <Text className="text-white text-sm font-psemibold">Delete</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActionMenu;

const styles = StyleSheet.create({});
