const fs = require('fs');

let vitals = fs.readFileSync('src/components/VitalsWidget.tsx', 'utf8');

// Ensure File, Paths are imported
if (!vitals.includes("import { File, Paths } from 'expo-file-system'")) {
    vitals = vitals.replace("import * as ImagePicker from 'expo-image-picker';", "import * as ImagePicker from 'expo-image-picker';\nimport { File, Paths } from 'expo-file-system';");
}

const oldPickImage = `  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.3,
        base64: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.base64) {
          const dataUri = \`data:image/jpeg;base64,\${asset.base64}\`;
          if (onUpdateImageUrl) onUpdateImageUrl(dataUri);
          setAvatarModalVisible(false);
        } else if (Platform.OS === 'web' && asset.uri) {
          // No web, o expo-image-picker pode não retornar base64 nativamente. 
          // Retorna um blob: URL que expira ao recarregar. Precisamos converter o blob para base64.
          try {
            const response = await fetch(asset.uri);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
              if (onUpdateImageUrl) onUpdateImageUrl(reader.result as string);
              setAvatarModalVisible(false);
            };
            reader.readAsDataURL(blob);
          } catch (fetchErr) {
            console.warn("Erro ao converter blob para base64", fetchErr);
            if (onUpdateImageUrl) onUpdateImageUrl(asset.uri);
            setAvatarModalVisible(false);
          }
        } else {
          if (onUpdateImageUrl) onUpdateImageUrl(asset.uri);
          setAvatarModalVisible(false);
        }
      }
    } catch (e) {
      console.warn("Erro ao selecionar imagem", e);
    }
  };`;

const newPickImage = `  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        if (Platform.OS === 'web' && asset.uri) {
          // Web flow (blob -> base64 fallback)
          try {
            const response = await fetch(asset.uri);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
              if (onUpdateImageUrl) onUpdateImageUrl(reader.result as string);
              setAvatarModalVisible(false);
            };
            reader.readAsDataURL(blob);
          } catch (fetchErr) {
            console.warn("Erro ao converter blob para base64", fetchErr);
            if (onUpdateImageUrl) onUpdateImageUrl(asset.uri);
            setAvatarModalVisible(false);
          }
        } else {
          // Native flow (File System API)
          const sourceUri = asset.uri;
          const filename = sourceUri.split('/').pop() || \`avatar_\${Date.now()}.jpg\`;
          
          try {
            const sourceFile = new File(sourceUri);
            const destFile = new File(Paths.document, filename);
            await sourceFile.copy(destFile);
            
            if (onUpdateImageUrl) onUpdateImageUrl(destFile.uri);
          } catch (fsErr) {
            console.warn("Erro ao copiar arquivo:", fsErr);
            // Fallback to original URI if copy fails
            if (onUpdateImageUrl) onUpdateImageUrl(sourceUri);
          }
          setAvatarModalVisible(false);
        }
      }
    } catch (e) {
      console.warn("Erro ao selecionar imagem", e);
    }
  };`;

vitals = vitals.replace(oldPickImage.replace(/\r\n/g, '\n'), newPickImage);
vitals = vitals.replace(oldPickImage, newPickImage);

fs.writeFileSync('src/components/VitalsWidget.tsx', vitals);
console.log('Switched to new Expo SDK 52 File API!');
