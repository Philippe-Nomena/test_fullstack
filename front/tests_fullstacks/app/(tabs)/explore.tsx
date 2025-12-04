import { StyleSheet } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Application de test Fullstack
        </ThemedText>
      </ThemedView>
      <ThemedText>
        Celui-ci est une application de test technique pour passer au poste de
        developpeur fullstack
      </ThemedText>

      <Collapsible title="A propos de  l'application">
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            Test FullStack application {""}
          </ThemedText>
          est une application mobile construite avec Expo et React Native build
          avec Expo.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Telecharger l'application</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="A propos du createur de l'application">
        <ThemedText>
          <ThemedText type="defaultSemiBold">Philippe Nomena:</ThemedText> Je
          suis un ingénieur en informatique spécialisé dans la maintenance
          informatique et le développement d'applications, tels que les
          développements web, mobiles et de bureau
        </ThemedText>
        <ExternalLink href="https://github.com/Philippe-Nomena">
          <ThemedText type="link">Mon lien github</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
