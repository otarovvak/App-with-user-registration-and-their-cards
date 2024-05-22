import { FC, useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { IUser } from "./AccountScreen";

// TODO(aibek): put a stricter type here
interface IPostScreen {
  // TODO(aibek): remove type any and correct types
  navigation: any;
  post: IUser;
}

export const PostScreen: FC<any> = ({ navigation, route }) => {
  const userId = route.params.userId;

  const [post, setPost] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://reqres.in/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found");
        }
        return res.json();
      })
      .then((res: IUser) => {
        setPost(res.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>Post {post?.email}</Text>
      <Text>{post?.first_name}</Text>
      <Text>{post?.last_name}</Text>
    </ScrollView>
  );
};
