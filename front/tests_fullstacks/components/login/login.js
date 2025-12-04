import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { url } from "../url";

const Users = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const loginUsers = async () => {
    try {
      const res = await url.post("/users/login", {
        username,
        mdp: password,
      });

      if (res.status === 201 || res.status === 200) {
        alert("Connexion réussie !");
        const { id, username } = res.data;
        await AsyncStorage.setItem("user", JSON.stringify({ id, username }));
        router.push("/home");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);

      let errorMessage = "Erreur lors de la connexion";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-900 justify-center items-center p-4`}>
      <Text style={tw`text-white text-3xl font-bold mb-8`}>Se connecter</Text>
      <TextInput
        style={tw`bg-gray-300 w-11/12 rounded-md h-12 font-semibold text-lg mb-4 px-3`}
        placeholder="Username"
        placeholderTextColor="gray"
        value={username}
        onChangeText={setUsername}
      />

      <View
        style={tw`w-11/12 flex-row items-center bg-gray-300 rounded-md mb-6`}
      >
        <TextInput
          style={tw`flex-1 h-12 font-semibold text-lg px-3`}
          placeholder="Votre mot de passe"
          placeholderTextColor="gray"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={tw`pr-3`}
        >
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row justify-between w-11/12`}>
        <TouchableOpacity onPress={() => router.push("/forget_pass")}>
          <Text style={tw`text-white`}>Mot de passe oubliée?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={loginUsers}
          style={tw`bg-blue-500 px-5 py-2 rounded-lg flex-row items-center`}
        >
          <Text style={tw`text-white mr-2`}>Se connecter</Text>
          <AntDesign name="right" size={15} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <View style={tw`flex-row mt-5 justify-center`}>
          <Text style={tw`text-white`}>Vous n’avez pas de compte?</Text>
          <Text style={tw`text-gray-500`}> S’inscrire</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Users;
