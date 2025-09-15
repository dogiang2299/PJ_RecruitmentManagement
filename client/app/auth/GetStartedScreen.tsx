import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GetStartedScreenProps {
  onSignUpPress: () => void;
  onLoginPress: () => void;
}

const GetStartedScreen: React.FC<GetStartedScreenProps> = ({ onSignUpPress, onLoginPress }) => {
  const router = useRouter();
  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/6Pqj45Q/background.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Lets Get Started!</Text>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/16/48/52/16485254f5d0b30f35d661097e09173f.jpg' }}
            style={styles.illustration}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPress}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('../auth/LoginScreen')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

interface Style {
  background: ViewStyle;
  safeArea: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  illustration: ImageStyle;
  signUpButton: ViewStyle;
  signUpButtonText: TextStyle;
  loginContainer: ViewStyle;
  loginText: TextStyle;
  loginLink: TextStyle;
}

const styles = StyleSheet.create<Style>({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(100, 100, 200, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
  signUpButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFC107',
    borderRadius: 10,
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
  loginLink: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default GetStartedScreen;