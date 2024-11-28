import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import useFetchData from "../../hooks/useFetchData.js";
import VideoCard from "../../components/VideoCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Image } from "react-native";
import icons from "../../constants/icons.js";
import InfoBox from "../../components/InfoBox.jsx";
import { signOut } from "../../lib/appwrite.js";
import { router } from "expo-router";

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser, setIsLoggedIn } = useAuth();
  const { data: posts, refetch } = useFetchData("user", user.$id);
  const handleRefresh = async () => {
    setRefreshing(true);
    // Fetch new data from API
    await refetch();
    // Once new data is received, set refreshing to false
    setRefreshing(false);
  };

  const handleSignOUt = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/SignIn");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => {
          return (
            <View className="px-4 mt-5 mb-14">
              <View className="flex justify-center items-center w-full">
                <TouchableOpacity
                  onPress={handleSignOUt}
                  className="w-full items-end">
                  <Image
                    className="w-6 items-end"
                    resizeMode="contain"
                    source={icons.logout}
                  />
                </TouchableOpacity>

                <View className="w-[5rem] h-[5rem] border border-secondary-100 rounded-xl mb-10">
                  <Image
                    source={{ uri: user?.avatar }}
                    resizeMode="cover"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <Text className="text-white text-xl font-semibold text-center mt-4">
                    {user?.username}
                  </Text>
                </View>
                <View className="w-full flex-row justify-center gap-16 mt-8">
                  <InfoBox title={posts.length} subtitle="posts" />
                  <InfoBox title="1.2K" subtitle="Followers" />
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
