import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { Button } from "react-native";

const zoomIn = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const zoomOut = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true; // Enable looping
    // player.play();
  });
  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomOut : zoomIn}
      duration={500}
      className="mr-5 flex justify-center items-center">
      {isPlaying ? (
        // <Text
        //   className="text-white text-lg"
        //   onPress={() => setIsPlaying(false)}>
        //   Playing...
        // </Text>
        <View className="rounded-3xl overflow-hidden">
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
      ) : (
        <TouchableOpacity
          className="flex justify-center items-center relative"
          onPress={() => {
            setIsPlaying(true);
            player.play();
          }}>
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-44 h-60 mr-5 rounded-3xl overflow-hidden shadow-lg shadow-stone-500/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            resizeMode="cover"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      className="p-4"
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem item={item} activeItem={activeItem} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  // contentContainer: {
  //   flex: 1,
  //   padding: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingHorizontal: 50,
  // },
  video: {
    borderRadius: 50,
    width: 200,
    height: 200,
  },
  controlsContainer: {
    padding: 10,
  },
});
