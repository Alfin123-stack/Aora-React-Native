import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { icons } from "../constants";

const SearchInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  otherStyles,
  keyboardType,
}) => {
  const [searchInput, setSearchInput] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="border-2 px-4 border-black-200 w-full h-16 bg-black-200 rounded-2xl focus:border-secondary flex-row justify-center items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          className="items-center font-psemibold text-gray-100 flex-1"
          placeholderTextColor="#7b7b8b"
        />

        <TouchableOpacity
          onPress={() => setSearchInput((prevState) => !prevState)}>
          <Image
            source={icons.search}
            resizeMode="contain"
            className="w-5 h-5"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
