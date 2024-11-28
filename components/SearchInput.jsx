import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  title,
  placeholder,
  value = "",
  onChangeText,
  otherStyles,
  keyboardType,
}) => {
  const [searchInput, setSearchInput] = useState(false);
  const [query, setQuery] = useState(value);

  const pathname = usePathname();
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View
        className={`border-2 px-4 w-full h-16 rounded-2xl flex-row justify-center items-center ${
          searchInput ? "border-secondary" : "border-black-200"
        }`}>
        <TextInput
          value={query}
          placeholder={placeholder}
          className="items-center font-psemibold text-gray-100 flex-1"
          placeholderTextColor="#7b7b8b"
          onChangeText={(e) => setQuery(e)}
          onFocus={() => setSearchInput(true)} // Mengaktifkan fokus
          onBlur={() => setSearchInput(false)} // Menghapus fokus
        />

        <TouchableOpacity
          onPress={() => {
            // setSearchInput((prevState) => !prevState);
            if (!query) {
              return alert.Alert(
                "Missing query",
                "Please input something to searh results"
              );
            }
            if (pathname.startsWith("/search")) {
              router.setParams({ query });
            } else {
              router.push(`/search/${query}`);
            }
          }}>
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
