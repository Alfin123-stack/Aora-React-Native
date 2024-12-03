import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useVideoPlayer, VideoView } from "expo-video";
import { Image } from "react-native";
import { icons } from "../../constants";
import CutomButton from "../../components/CutomButton";
// import * as DocumentPicker from "expo-document-picker";
import { addFile } from "../../lib/appwrite.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const Create = () => {
  const { user } = useAuth();
  const [uploading, setuploading] = useState(false);
  const [form, setform] = useState({
    title: "",
    video: null,
    thumbnail: "",
    prompt: "",
  });
  const [isRefreshing, setIsRefreshing] = useState(false); // State untuk kontrol refresh

  // Inisialisasi player video
  const player = useVideoPlayer(form.video, (player) => {
    player.loop = true; // Enable looping
  });

  // Fungsi untuk meng-handle dokumen picker
  const opeDocumentPicker = async (type) => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type:
    //     type === "image"
    // ? ["image/png", "image/jpeg", "image/jpg"]
    //       : ["video/mp4", "video/gif"],
    // });

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === "image" ? ["images"] : ["videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "image") {
        setform({ ...form, thumbnail: result.assets[0] });
      }
      if (type === "video") {
        setform({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  // Fungsi untuk mereset state ketika refresh
  const resetState = () => {
    setform({
      title: "",
      video: null,
      thumbnail: "",
      prompt: "",
    });
    setuploading(false);
  };

  // Fungsi untuk handle submit (untuk demonstrasi)
  const handleSubmit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert("Error", "Please fill a form fields");
      return;
    }
    setuploading(true);
    try {
      await addFile({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Success", "Video uploaded successfully!");
      router.push("/Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      resetState();
    }
  };

  // Fungsi untuk meng-handle refresh
  const onRefresh = () => {
    setIsRefreshing(true);
    resetState(); // Reset state ke nilai awal saat di-refresh
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        className="px-4 my-10"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give Your Video a catchy title..."
          onChangeText={(e) => setform({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-10">
          <Text className="text-sm text-white font-psemibold">
            Upload Video
          </Text>
        </View>

        <TouchableOpacity onPress={() => opeDocumentPicker("video")}>
          {form.video ? (
            <View className="mt-3 rounded-3xl w-full h-64 overflow-hidden">
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
            </View>
          ) : (
            <View className="w-full bg-black-100 h-60 rounded-2xl flex justify-center items-center mt-3">
              <View className=" border border-dashed border-secondary-100 w-20 h-20 flex justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="h-9"
                />
              </View>
            </View>
          )}
        </TouchableOpacity>

        <View className="mt-5">
          <Text className="text-sm text-white font-psemibold">
            Thumbnail Image
          </Text>
        </View>

        <TouchableOpacity onPress={() => opeDocumentPicker("image")}>
          {form.thumbnail ? (
            <View className="mt-3 rounded-3xl w-full h-60 overflow-hidden">
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-full mt-3 rounded-xl"
              />
            </View>
          ) : (
            <View className="w-full bg-black-100 h-20 rounded-2xl flex justify-center items-center flex-row gap-4 mt-3">
              <View className=" border border-dashed border-secondary-100 w-10 h-10 flex justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="h-5"
                />
              </View>
              <Text className="text-xs text-white font-psemibold">
                Choose a file
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder="The prompt you use to create this video"
          onChangeText={(e) => setform({ ...form, prompt: e })}
          otherStyles="mt-5"
        />

        <CutomButton
          isLoading={uploading}
          onPress={handleSubmit}
          title="Submit & Publish"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  video: {
    borderRadius: 50,
    flex: 1,
  },
  controlsContainer: {
    padding: 10,
  },
});
