import { supabase } from './supabase';

export async function uploadPhoto(imageUri: string, bucket: string): Promise<string> {
  const ext = imageUri.split('.').pop()?.split('?')[0]?.toLowerCase() ?? 'jpg';
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const response = await fetch(imageUri);
  if (!response.ok) throw new Error('Failed to read image from device');
  const blob = await response.blob();

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filename, blob, { contentType: mime, upsert: false });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data.publicUrl;
}
