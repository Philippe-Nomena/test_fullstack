import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Accueil = () => {
  const router = useRouter();
  const [user, setUser] = useState({ id: null, username: "", email: "" });
  const [activeTab, setActiveTab] = useState(0);
  const scrollViewRef = useRef(null);

  const tabs = ["Profil", "Paramètres", "Activité"];

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          router.replace("/");
        }
      } catch (error) {
        Alert.alert("Erreur", "Impossible de charger les données");
      }
    };
    getUserInfo();
  }, []);

  const handleTabPress = (index) => {
    setActiveTab(index);

    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  const logout = async () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Oui",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove(["user", "token"]);
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-950`}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={tw`flex-1`}
      >
        <View style={tw`flex-row relative bg-black bg-opacity-30`}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabPress(index)}
              style={tw`flex-1 items-center py-5`}
            >
              <Text
                style={tw`${
                  activeTab === index ? "text-white font-bold" : "text-gray-400"
                } text-lg`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}

          <Animated.View
            style={[
              tw`absolute bottom-0 h-1 bg-blue-500 rounded-full`,
              {
                width: width / 3,
                transform: [{ translateX: activeTab * (width / 3) }],
              },
            ]}
          />
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveTab(newIndex);
          }}
        >
          <View style={{ width }}>
            <View style={tw`flex-1 justify-center items-center px-6`}>
              <View
                style={tw`bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-sm`}
              >
                <View style={tw`items-center mb-6`}>
                  <View
                    style={tw`w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1`}
                  >
                    <View
                      style={tw`w-full h-full rounded-full bg-gray-900 items-center justify-center`}
                    >
                      <Text style={tw`text-white text-5xl font-bold`}>
                        {user.username?.charAt(0).toUpperCase() || "U"}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={tw`absolute -bottom-2 bg-green-500 w-8 h-8 rounded-full border-4 border-gray-900`}
                  />
                </View>

                <Text
                  style={tw`text-white text-3xl font-bold text-center mb-2`}
                >
                  {user.username || "Utilisateur"}
                </Text>
                <Text style={tw`text-blue-400 text-center mb-8`}>
                  ID: #{user.id}
                </Text>

                <TouchableOpacity
                  style={tw`bg-blue-600 py-4 rounded-xl flex-row justify-center items-center shadow-lg mb-4`}
                  onPress={() =>
                    Alert.alert(
                      "Fonctionnalité",
                      "Éditer le profil bientôt disponible !"
                    )
                  }
                >
                  <Text style={tw`text-white text-center font-semibold`}>
                    Modifier le profil
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={logout}
                  style={tw`bg-red-600 py-4 rounded-xl`}
                >
                  <Text style={tw`text-white text-center font-semibold`}>
                    Se déconnecter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ width }}>
            <ScrollView contentContainerStyle={tw`px-8 pt-10`}>
              <Text style={tw`text-white text-4xl font-bold text-center mb-10`}>
                Paramètres
              </Text>
              {[
                "Notifications",
                "Confidentialité",
                "Langue",
                "Thème sombre",
                "À propos",
              ].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={tw`bg-white bg-opacity-10 rounded-2xl p-6 mb-4 flex-row justify-between items-center`}
                >
                  <Text style={tw`text-white text-lg`}>{item}</Text>
                  <Feather name="chevron-right" size={24} color="#94a3b8" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={{ width }}>
            <ScrollView contentContainerStyle={tw`px-8 pt-10`}>
              <Text style={tw`text-white text-4xl font-bold text-center mb-8`}>
                Activité récente
              </Text>
              {[
                "Connexion aujourd'hui à 14:32",
                "Profil mis à jour",
                "Mot de passe changé",
                "Compte créé",
              ].map((act, i) => (
                <View
                  key={i}
                  style={tw`bg-white bg-opacity-10 rounded-xl p-5 mb-4 flex-row`}
                >
                  <View
                    style={tw`w-12 h-12 bg-blue-600 rounded-full items-center justify-center mr-4`}
                  >
                    <Feather name="activity" size={24} color="white" />
                  </View>
                  <View>
                    <Text style={tw`text-white font-medium`}>{act}</Text>
                    <Text style={tw`text-gray-400 text-sm`}>
                      Il y a quelques instants
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Accueil;
