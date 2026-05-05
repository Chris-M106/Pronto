import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../utils/spacing';
import { uploadPhoto } from '../services/photoUpload';

interface Props {
  urls: string[];
  onChange: (urls: string[]) => void;
  maxPhotos?: number;
  bucket?: string;
}

export default function PhotoPicker({ urls, onChange, maxPhotos = 4, bucket = 'booking-photos' }: Props) {
  const [uploading, setUploading] = useState(false);

  async function pick() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow photo access in Settings to add photos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });
    if (result.canceled || !result.assets[0]) return;
    const uri = result.assets[0].uri;
    setUploading(true);
    try {
      const url = await uploadPhoto(uri, bucket);
      onChange([...urls, url]);
    } catch (e) {
      Alert.alert('Upload failed', (e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  function remove(idx: number) {
    onChange(urls.filter((_, i) => i !== idx));
  }

  return (
    <View>
      <View style={styles.grid}>
        {urls.map((url, i) => (
          <View key={url} style={styles.thumb}>
            <Image source={{ uri: url }} style={styles.img} />
            <Pressable onPress={() => remove(i)} style={styles.removeBtn}>
              <Text style={styles.removeText}>✕</Text>
            </Pressable>
          </View>
        ))}

        {urls.length < maxPhotos && (
          <Pressable onPress={pick} style={styles.addBtn} disabled={uploading}>
            {uploading ? (
              <ActivityIndicator color={colors.blue} />
            ) : (
              <>
                <Text style={styles.addIcon}>📷</Text>
                <Text style={styles.addText}>Add photo</Text>
              </>
            )}
          </Pressable>
        )}
      </View>

      {urls.length > 0 && (
        <Text style={styles.count}>{urls.length}/{maxPhotos} photo{urls.length !== 1 ? 's' : ''}</Text>
      )}
    </View>
  );
}

const THUMB = 88;

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  thumb: { width: THUMB, height: THUMB, borderRadius: radius.md, overflow: 'hidden' },
  img: { width: THUMB, height: THUMB },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: { color: colors.white, fontSize: 10, fontWeight: fontWeight.bold },
  addBtn: {
    width: THUMB,
    height: THUMB,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueBg,
  },
  addIcon: { fontSize: 22 },
  addText: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4 },
  count: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.sm },
});
