import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import { getMoods } from '../utils/storage';
import MoodCard from '../components/MoodCard';

export default function HomeScreen({ navigation }) {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMoods().then(setMoods);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={moods}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <MoodCard mood={item} />}
      />
      <FAB
        icon="plus"
        style={{ position: 'absolute', bottom: 16, right: 16 }}
        onPress={() => navigation.navigate('Add Mood')}
      />
    </View>
  );
}
