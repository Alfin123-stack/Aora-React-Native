import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";

import getAllPost from "../../lib/appwrite.js";
import useFetchData from "../../hooks/useFetchData.js";
import VideoCard from "../../components/VideoCard.jsx";
import Trending from "../../components/Trending.jsx";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: allPosts, isLoading, refetch: allFecht } = useFetchData("all");
  const { data: latestPost, refetch: latestFetch } = useFetchData("latest");

  const handleRefresh = async () => {
    setRefreshing(true);
    // Fetch new data from API
    await allFecht();
    await latestFetch();
    // Once new data is received, set refreshing to false
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={allPosts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => {
          return (
            <View className="px-4 my-10">
              <View className="flex flex-row justify-between items-start">
                <View>
                  <Text className="text-gray-100 text-sm font-psemibold">
                    Welcome Back
                  </Text>
                  <Text className="text-white text-3xl font-bold">
                    JSMastery
                  </Text>
                </View>
                <Image
                  source={images.logoSmall}
                  resizeMode="contain"
                  className="h-10 w-9"
                />
              </View>

              <SearchInput
                otherStyles="mt-7"
                placeholder="Search for a video topic"
              />

              <View className=" mt-14 mb-10">
                <Text className="text-gray-100 font-pregular text-lg">
                  Latest Videos
                </Text>
              </View>

              <Trending posts={latestPost} />
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

export default Home;

const styles = StyleSheet.create({});
