import { Button, Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import "react-native-url-polyfill/auto";

import { images } from "../constants";
import CutomButton from "../components/CutomButton";
import { useState } from "react";
import { router, Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function App() {
  // const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn, isLoading } = useAuth();

  if (!isLoading && isLoggedIn) return <Redirect href="/Home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full items-center justify-center px-4">
          <Image
            className="w-[130px] h-[84px] "
            resizeMode="contain"
            source={images.logo}
          />
          <Image
            className="max-w-[380px] h-[300px] w-full"
            resizeMode="contain"
            source={images.cards}
          />

          <View className="mt-5 relative">
            <Text className="text-white text-center text-3xl font-bold">
              Discover Endless Possibilities With{" "}
              <Text className="text-yellow-500">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute w-[135px] h-[15px] -bottom-2 -right-8 "
              resizeMode="contain"
            />
          </View>

          <Text className="text-center font-semibold text-xs text-white mt-5 opacity-50">
            Aora is a virtual travel companion that connects you with
            like-minded travelers and offers unparalleled experiences.
          </Text>
          <CutomButton
            title="Continue With Email"
            onPress={() => router.push("/SignIn")}
            isLoading={isLoading}
            containerStyles="w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
