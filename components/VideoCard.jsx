import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import ActionMenu from "./ActionMenu";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActionMenu, setIsActionMenu] = useState(false);

  const player = useVideoPlayer(video, (player) => {
    player.loop = true; // Enable looping
    // player.play();
  });
  return (
    <View className="px-4 flex flex-col items-center mb-14 w-full relative">
      <View className="flex flex-row items-center w-full gap-4">
        <View className="w-[46px] h-[46px] border-2 border-yellow-500 rounded-lg overflow-hidden">
          <Image
            source={{ uri: avatar }}
            resizeMode="cover"
            className="w-full h-full"
          />
        </View>
        <View className="flex justify-center flex-1">
          <Text className="text-sm text-white font-psemibold" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {username}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setIsActionMenu((prevState) => !prevState)}>
          <View className="self-end pt-2">
            <Image
              source={icons.menu}
              resizeMode="contain"
              className="w-5 h-5"
            />
          </View>
        </TouchableOpacity>
      </View>
      {isPlaying ? (
        <View className="mt-3 rounded-3xl w-full h-64 overflow-hidden">
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setIsPlaying(true);
            player.play();
          }}
          className="w-full h-60 rounded-xl relative flex justify-center items-center mt-3">
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full mt-3 rounded-xl"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="absolute w-12 h-12"
          />
        </TouchableOpacity>
      )}

      {isActionMenu && <ActionMenu />}
    </View>
  );
};

export default VideoCard;

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
    flex: 1,
  },
  controlsContainer: {
    padding: 10,
  },
});
