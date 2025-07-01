import * as DocumentPicker from 'expo-document-picker';

export type SupportedFileType = {
  extension: string;
  mimeType: string;
};

export const SUPPORTED_FILE_TYPES = {
  PDF: { extension: '.pdf', mimeType: 'application/pdf' },
  XLSX: { extension: '.xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  DOC: { extension: '.doc', mimeType: 'application/msword' },
  DOCX: { extension: '.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  PNG: { extension: '.png', mimeType: 'image/png' },
  JPG: { extension: '.jpg', mimeType: 'image/jpeg' },
  JPEG: { extension: '.jpeg', mimeType: 'image/jpeg' },
} as const;

// Create ALL array from the object values
export const ALL_TYPES = Object.values(SUPPORTED_FILE_TYPES);

export const pickDocument = async (fileTypes?: typeof ALL_TYPES | SupportedFileType[]) => {
  try {
    const types = fileTypes || ALL_TYPES;
    const result = await DocumentPicker.getDocumentAsync({
      type: types.map(type => type.mimeType),
      copyToCacheDirectory: true,
      multiple: true,
    });

    if (!result || !result.assets || result.assets.length === 0) {
      return null;
    }

    return result.assets;
  } catch (error) {
    console.error('Document picker error:', error);
    return null;
  }
};