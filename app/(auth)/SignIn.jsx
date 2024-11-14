import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CutomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser, setIsLoggedIn } = useAuth();

  const handleSubmit = async () => {
    if (!form.email || !form.password)
      Alert.alert("Error", "Please fill a form fields");

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = getCurrentUser();

      setUser(result);
      setIsLoggedIn(true);

      router.replace("/Home");
    } catch (error) {
      Alert.alert("Error", Error);
      throw new Error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex w-full px-4 my-6 h-full">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Text className="mt-7 font-psemibold text-white text-2xl">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            onChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            onChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            onPress={handleSubmit}
            title="Sign in"
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="mt-7 w-full flex-row justify-center items-center">
            <Text className="text-center text-white font-pregular">
              Don't have an account?{" "}
            </Text>
            <Link
              href="SignUp"
              className="text-yellow-500 text-lg font-psemibold underline">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
