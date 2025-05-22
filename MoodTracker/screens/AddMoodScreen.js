import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image } from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
import { saveMood } from '../utils/storage';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';

export default function AddMoodScreen({ navigation }) {
  const [mood, setMood] = useState('happy');
  const [note, setNote] = useState('');
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      }
      let { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  const handleSave = async () => {
    await saveMood({ mood, note, date: new Date().toISOString(), location, photoUri });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Mood Reminder",
        body: "Don't forget to log your mood today 😊",
      },
      trigger: {
        hour: 20,
        minute: 0,
        repeats: true,
      },
    });
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <RadioButton.Group onValueChange={setMood} value={mood}>
        <RadioButton.Item label="Happy" value="happy" />
        <RadioButton.Item label="Neutral" value="neutral" />
        <RadioButton.Item label="Sad" value="sad" />
      </RadioButton.Group>
      <TextInput
        label="Note"
        value={note}
        onChangeText={setNote}
        multiline
        style={{ marginVertical: 10 }}
      />
      {hasPermission && (
        <>
          <Camera style={{ height: 200 }} ref={cameraRef} />
          <Button title="Take Selfie" onPress={takePhoto} />
        </>
      )}
      {photoUri && <Image source={{ uri: photoUri }} style={{ height: 200, marginTop: 10 }} />}
      <Button title="Save Mood" onPress={handleSave} />
    </View>
  );
}
