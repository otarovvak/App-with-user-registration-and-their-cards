import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const AccountScreen: FC = ({ navigation }: any) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);

  const handleAddUser = () => {
    const newUserId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

    const newUser: IUser = {
      id: newUserId,
      email: newEmail,
      first_name: newFirstName,
      last_name: newLastName,
      avatar: "https://reqres.in/img/faces/6-image.jpg",
    };

    setUsers([...users, newUser]);
    setNewFirstName("");
    setNewLastName("");
    setNewEmail("");
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleViewUser = useCallback((userId: number) => {
    console.log(userId);

    navigation.navigate("Post", { userId });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Add New User</Text>
        <TextInput
          placeholder="First Name"
          value={newFirstName}
          onChangeText={setNewFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={newLastName}
          onChangeText={setNewLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={newEmail}
          onChangeText={setNewEmail}
          style={styles.input}
        />
        <Button title="Add User" onPress={handleAddUser} />
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserCard
            {...item}
            onViewUser={handleViewUser}
            onDeleteUser={handleDeleteUser}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

interface IUserCardProps extends IUser {
  onViewUser: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
}

const UserCard: FC<IUserCardProps> = ({
  first_name,
  avatar,
  id,
  onViewUser,
  onDeleteUser,
}) => {
  return (
    <View style={styles.userCard}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.userName}>{first_name}</Text>
        <Button title="View" onPress={() => onViewUser(id)} />
        <Button title="Delete" onPress={() => onDeleteUser(id)} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },
});
