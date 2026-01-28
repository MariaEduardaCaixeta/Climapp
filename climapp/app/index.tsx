import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <LinearGradient
      colors={['#00457D', '#05051F']}
      style={styles.container}
    >
      <SafeAreaView style={styles.wrapper}>
        <Image
          source={require('../assets/images/logo.png')}
        />
        <Image
          source={require('../assets/images/weather.png')}
        />
        <Text style={styles.welcome}>Boas-vindas!</Text>
        <Pressable style={styles.buttonContainer} onPress={() => router.replace('/cities')}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={styles.buttonText}>Entrar</Text>
              <Ionicons name="arrow-forward" size={24} color="#01080E" />
            </View>
          )}
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  welcome: {
    fontSize: 25,
    color: '#FFFFFF',
    fontFamily: 'Montserrat_400Regular',
  },
  buttonContainer: {
    width: '100%'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7693FF',
    gap: 8,
    padding: 8,
    borderRadius: 32,
  },
  buttonText: {
    color: '#01080E',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
  }
});