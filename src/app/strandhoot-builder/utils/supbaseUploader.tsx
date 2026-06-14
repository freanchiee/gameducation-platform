import { supabase } from '@/utils/supabase';

export async function uploadToSupabase(file: File): Promise<{ success: boolean; url?: string }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    console.log('📦 Uploading:', { name: file.name, type: file.type, size: file.size });

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('strandhoot-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    console.log('📦 uploadData:', uploadData);
    if (uploadError) {
      console.error('❌ Supabase Upload Error (Upload step):', uploadError);
      throw uploadError;
    }

    const { data: urlData } = supabase.storage
      .from('strandhoot-media')
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      throw new Error('No public URL returned');
    }

    return {
      success: true,
      url: urlData.publicUrl,
    };
  } catch (error) {
    console.error('❌ Supabase Upload Error (Catch block):', error);
    return { success: false };
  }
}
