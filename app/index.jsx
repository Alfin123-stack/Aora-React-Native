import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <Link href="/Home" style={{ color: "blue", margin: "1rem" }}>
        Go to Profile
      </Link>
    </View>
  );
}
