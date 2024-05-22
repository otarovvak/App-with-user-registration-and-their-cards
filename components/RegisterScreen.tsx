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

export const RegisterScreen: FC<any> = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetName = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleSetPassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleSetEmail = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          job: "tester",
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        navigation.navigate("Login");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, password, email]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {isSubmitting && <Text>Submitting...</Text>}
        <TextInput
          style={styles.input}
          onChangeText={handleSetEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={handleSetName}
          value={name}
          placeholder="Name"
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
            disabled={!name || !password || !email}
            title="Register"
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
