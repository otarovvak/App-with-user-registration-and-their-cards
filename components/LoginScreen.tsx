import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { FC, useCallback, useState } from "react";

// TODO(aibek): remove type any and correct types
export const LoginScreen: FC<any> = ({ navigation, route }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetName = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleSetPassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: name,
          password: password,
        }),
      });

      if (response.ok) {
        navigation.navigate("Accounts");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, password]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {isSubmitting && <Text>Submitting...</Text>}
        <TextInput
          style={styles.input}
          onChangeText={handleSetName}
          value={name}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={handleSetPassword}
          secureTextEntry={true}
          value={password}
          placeholder="Password"
        />
        <View style={styles.button}>
          <Button
            color="#ffa07a"
            disabled={!name || !password}
            title="Log in"
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#98fb98",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40,
  },
  form: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: Dimensions.get("window").width - 100,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "#F3F3F3",
  },
  button: {
    margin: 12,
    padding: 0,
  },
});
