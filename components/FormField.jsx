import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  onChangeText,
  otherStyles,
  keyboardType,
}) => {
  const [searchInput, setSearchInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium text-gray-100 mb-2">{title}</Text>

      <View
        className={`border-2 px-4 border-black-200 w-full h-16 bg-black-200 rounded-2xl focus:border-secondary flex-row justify-center items-center ${
          searchInput ? "border-secondary" : "border-black-200"
        }`}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          className="items-center font-psemibold text-white flex-1"
          placeholderTextColor="#7b7b8b"
          onFocus={() => setSearchInput(true)} // Mengaktifkan fokus
          onBlur={() => setSearchInput(false)} // Menghapus fokus
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword((prevState) => !prevState)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-8 h-8"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
