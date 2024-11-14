import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CutomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser, setIsLoggedIn } = useAuth();

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password)
      Alert.alert("Error", "Please fill a form fields");

    setIsSubmitting(true);

    try {
      const result = await createUser(form.username, form.email, form.password);
      setUser(result)
      setIsLoggedIn(true)

      router.replace("/Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error);
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
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            onChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

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
            title="Sign up"
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="mt-7 w-full flex-row justify-center items-center">
            <Text className="text-center text-white font-pregular">
              Have an account?{" "}
            </Text>
            <Link
              href="SignIn"
              className="text-yellow-500 text-lg font-psemibold underline">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
