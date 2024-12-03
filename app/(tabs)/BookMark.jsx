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

const BookMark = () => {
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
              <View className="">
                <Text className="text-white font-psemibold text-2xl">
                  Saved Videos
                </Text>
              </View>

              <SearchInput
                otherStyles="mt-7"
                placeholder="Search your saved videos"
              />
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

export default BookMark;

const styles = StyleSheet.create({});
