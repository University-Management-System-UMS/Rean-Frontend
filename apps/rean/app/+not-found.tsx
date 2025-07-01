import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import { Text } from '@repo/ums-agent';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Ionicons 
          name="alert-circle-outline" 
          size={64} 
          color={Color.grayScale.grayOne} 
        />
        <Text style={styles.title}>Page not found</Text>
        <Text style={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Color.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.grayScale.grayOne,
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: Color.grayScale.grayTwo,
    textAlign: 'center',
    marginVertical: 8,
  },
  link: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Color.primary,
    borderRadius: 8,
  },
  linkText: {
    color: Color.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});