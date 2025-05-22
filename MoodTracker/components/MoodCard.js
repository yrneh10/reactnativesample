import React from 'react';
import { Card, Text, Image } from 'react-native-paper';

export default function MoodCard({ mood }) {
  return (
    <Card style={{ margin: 8 }}>
      <Card.Title title={`Mood: ${mood.mood}`} />
      <Card.Content>
        <Text>{mood.note}</Text>
        {mood.location && (
          <Text style={{ color: 'gray' }}>
            Location: {mood.location.latitude.toFixed(2)}, {mood.location.longitude.toFixed(2)}
          </Text>
        )}
        {mood.photoUri && (
          <Image source={{ uri: mood.photoUri }} style={{ height: 200, marginTop: 10 }} />
        )}
        <Text style={{ color: 'gray' }}>{new Date(mood.date).toLocaleDateString()}</Text>
      </Card.Content>
    </Card>
  );
}
