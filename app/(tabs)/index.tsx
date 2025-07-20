import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CalendarWithControls from '@/components/calendar/CalendarWithControls/CalendarWithControls'

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/pagaspot-screen.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hej!</ThemedText>
        <HelloWave />
      </ThemedView>

      <CalendarWithControls />

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Twoje zadanie</ThemedText>
        <ThemedText>
          Usprawnij kalendarz powyżej według instrukcji z maila.
        </ThemedText>
        <ThemedText>
          W components/calendar/Calendar.tsx znajdziesz kod które trzeba rozwinąć.
        </ThemedText>
        
        <ThemedText>
          Zwróć uwagę na TODO w komentarzach, zrób tyle ile uważasz.
          Poświęć na to zadanie max 1.5 godziny
        </ThemedText>
        <ThemedText>
          Ten tekst możesz usunąć
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: '100%',
    height: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
