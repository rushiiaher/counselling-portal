/**
 * Abstract storage interface. 
 * Allows swapping between local, Supabase, AWS S3, Cloudinary, etc.
 */

export interface StorageOptions {
  bucket: string;
  folder?: string;
}

export async function uploadFile(file: File, options: StorageOptions): Promise<string> {
  // Placeholder implementation for future Supabase/Cloudinary hookup
  // return supabase.storage.from(options.bucket).upload(...)
  throw new Error("Storage not implemented yet");
}

export async function deleteFile(path: string, options: StorageOptions): Promise<void> {
  throw new Error("Storage not implemented yet");
}

export function getPublicUrl(path: string, options: StorageOptions): string {
  return `https://placeholder-storage.com/${options.bucket}/${path}`;
}
