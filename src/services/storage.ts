import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Character } from '../types/character';
import { CharacterSchema } from '../schemas/character';
import { LoggerService } from './logger';

const CHARACTERS_STORAGE_KEY = 'DND_CHARACTERS_MAP';

export class StorageService {
  /**
   * Retrieves all characters mapped by their IDs
   */
  static async getCharactersMap(): Promise<Record<string, Character>> {
    try {
      const data = await AsyncStorage.getItem(CHARACTERS_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading characters:', error);
      return {};
    }
  }

  /**
   * Retrieves a list of all characters
   */
  static async getAllCharacters(): Promise<Character[]> {
    const map = await this.getCharactersMap();
    return Object.values(map);
  }

  /**
   * Retrieves a single character by ID
   */
  static async getCharacter(id: string): Promise<Character | null> {
    const map = await this.getCharactersMap();
    return map[id] || null;
  }

  /**
   * Saves or updates a character, validating it against Zod Schema first
   */
  static async saveCharacter(character: Character): Promise<Character> {
    // Structural Zod Validation
    const parsed = CharacterSchema.safeParse(character);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
      throw new Error(`Invalid Character Schema: ${errorMsg}`);
    }

    const validatedChar = parsed.data as Character;
    
    try {
      const map = await this.getCharactersMap();
      map[validatedChar.id] = validatedChar;
      await AsyncStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(map));
      return validatedChar;
    } catch (error) {
      console.error('Error saving character:', error);
      throw new Error('Failed to save character.');
    }
  }

  /**
   * Deletes a character and clears their logs
   */
  static async deleteCharacter(id: string): Promise<void> {
    try {
      const map = await this.getCharactersMap();
      delete map[id];
      await AsyncStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(map));
      
      // Cascade delete combat logs
      await LoggerService.clearLogs(id);
    } catch (error) {
      console.error('Error deleting character:', error);
      throw new Error('Failed to delete character.');
    }
  }

  /**
   * Validates and imports a character from a raw JSON string
   */
  static async importCharacterFromJSON(jsonString: string): Promise<Character> {
    try {
      let rawObj: any;
      try {
        rawObj = JSON.parse(jsonString);
      } catch (e) {
        throw new Error('Malformed JSON string.');
      }

      // Validates raw object structure
      const parsed = CharacterSchema.safeParse(rawObj);
      if (!parsed.success) {
        const errorMsg = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
        throw new Error(`Validation Error: ${errorMsg}`);
      }

      const validatedChar = parsed.data as Character;
      
      // Persist to storage
      await this.saveCharacter(validatedChar);
      
      // Log import event
      const stateSummary = `HP: ${validatedChar.hp.current}/${validatedChar.hp.max}, AC: ${validatedChar.combat.baseArmorClass}`;
      await LoggerService.logEvent(
        validatedChar.id, 
        'HP_HEAL', 
        0, 
        `Character imported. Initial state - ${stateSummary}`
      );

      return validatedChar;
    } catch (error: any) {
      console.error('Error importing character:', error);
      throw new Error(error.message || 'Import failed.');
    }
  }

  /**
   * Exports character sheet as a JSON file and shares it
   */
  static async exportCharacterJSON(character: Character): Promise<void> {
    try {
      // Validate schema before export to ensure database integrity
      const parsed = CharacterSchema.safeParse(character);
      if (!parsed.success) {
        throw new Error('Character data is currently invalid and cannot be exported.');
      }

      const jsonStr = JSON.stringify(parsed.data, null, 2);
      const safeName = character.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${FileSystem.documentDirectory}character_${safeName}_${Date.now()}.json`;

      // Save file
      await FileSystem.writeAsStringAsync(filename, jsonStr, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Share
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        throw new Error('Sharing is not available on this device');
      }

      await Sharing.shareAsync(filename, {
        mimeType: 'application/json',
        dialogTitle: `Export Sheet of ${character.name}`,
      });
    } catch (error) {
      console.error('Error exporting character sheet:', error);
      throw error;
    }
  }
}
