import { StyleSheet, FlatList, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import useFetchData from "../../hooks/useFetchData.js";
import VideoCard from "../../components/VideoCard.jsx";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  // const [refreshing, setRefreshing] = useState(false);
  // const { data: posts, isLoading, refetch } = useFetchData("all");
  // const { data: latestPost, refetch: latestFetch } = useFetchData("latest");
  const { query } = useLocalSearchParams();
  const { data: searchPost, refetch: searchFetch } = useFetchData(
    "search",
    query
  );

  useEffect(
    function () {
      searchFetch();
    },
    [query]
  );

  console.log(query, searchPost);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchPost}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => {
          return (
            <View className="px-4 my-10">
              <View>
                <Text className="text-gray-100 text-sm mt-5 mb-2 font-psemibold">
                  Search results
                </Text>
                <Text className="text-xl text-white font-psemibold">
                  {query}
                </Text>
              </View>
              <SearchInput
                value={query}
                otherStyles="mt-7"
                placeholder="Search for a video topic"
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
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
