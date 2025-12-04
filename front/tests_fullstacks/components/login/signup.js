import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Feather } from "@expo/vector-icons";
import { url } from "../url";

import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const SignUpClick = async () => {
    if (password !== confirmPassword) {
      alert("mot de passe non identique");
      return;
    }
    try {
      const res = await url.post("/users", {
        username: username,
        mdp: password,
      });

      if (res) {
        alert("Enregistrement réussis avec succés");
        setUsername("");

        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-900 justify-center items-center p-4`}>
      <Text style={tw`text-white text-3xl font-bold mb-8`}>S'inscrire</Text>
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
      <View
        style={tw`w-11/12 flex-row items-center bg-gray-300 rounded-md mb-6`}
      >
        <TextInput
          style={tw`flex-1 h-12 font-semibold text-lg px-3`}
          placeholder="Confirmez votre mot de passe"
          placeholderTextColor="gray"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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

      <View style={tw` w-11/12`}>
        <TouchableOpacity
          onPress={SignUpClick}
          style={tw`bg-blue-500 px-5 py-2 rounded-lg flex-row justify-center items-center`}
        >
          <Text style={tw`text-white mr-2`}>S'inscrire</Text>
          <AntDesign name="right" size={15} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/")}>
        <View style={tw`flex-row mt-5 justify-center`}>
          <Text style={tw`text-white`}>Vous avez une compte?</Text>
          <Text style={tw`text-gray-500`}> Se connecter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
