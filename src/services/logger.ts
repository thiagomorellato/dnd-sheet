import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { CombatLogEntry, ActionType } from '../types/character';

// Standard storage key prefix for logs
const LOGS_STORAGE_KEY_PREFIX = 'DND_COMBAT_LOGS_';

export class LoggerService {
  /**
   * Generates a simple unique ID
   */
  private static generateId(): string {
    return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  }

  /**
   * Logs a new combat event and persists it to AsyncStorage
   */
  static async logEvent(
    characterId: string,
    actionType: ActionType,
    valueChange: string | number,
    currentState: string
  ): Promise<CombatLogEntry> {
    const key = `${LOGS_STORAGE_KEY_PREFIX}${characterId}`;
    const newEntry: CombatLogEntry = {
      id: this.generateId(),
      characterId,
      timestamp: new Date().toISOString(),
      action_type: actionType,
      value_change: String(valueChange),
      current_state: currentState,
    };

    try {
      const existingLogsStr = await AsyncStorage.getItem(key);
      const existingLogs: CombatLogEntry[] = existingLogsStr ? JSON.parse(existingLogsStr) : [];
      
      existingLogs.unshift(newEntry); // Newest logs first
      await AsyncStorage.setItem(key, JSON.stringify(existingLogs));
      
      return newEntry;
    } catch (error) {
      console.error('Error logging combat event:', error);
      throw new Error('Failed to log combat event.');
    }
  }

  /**
   * Retrieves all logs for a specific character
   */
  static async getLogs(characterId: string): Promise<CombatLogEntry[]> {
    const key = `${LOGS_STORAGE_KEY_PREFIX}${characterId}`;
    try {
      const logsStr = await AsyncStorage.getItem(key);
      return logsStr ? JSON.parse(logsStr) : [];
    } catch (error) {
      console.error('Error fetching combat logs:', error);
      return [];
    }
  }

  /**
   * Clears logs for a specific character
   */
  static async clearLogs(characterId: string): Promise<void> {
    const key = `${LOGS_STORAGE_KEY_PREFIX}${characterId}`;
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing combat logs:', error);
    }
  }

  /**
   * Converts combat logs array into a valid CSV string
   */
  static convertToCSV(logs: CombatLogEntry[]): string {
    const headers = ['id', 'characterId', 'timestamp', 'action_type', 'value_change', 'current_state'];
    
    const rows = logs.map(log => {
      return [
        log.id,
        log.characterId,
        log.timestamp,
        log.action_type,
        log.value_change.replace(/"/g, '""'),
        log.current_state.replace(/"/g, '""'),
      ]
        .map(field => `"${field}"`)
        .join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }

  /**
   * Exports combat logs as a CSV file and opens the sharing dialog
   */
  static async exportLogsToCSV(characterId: string, characterName: string): Promise<void> {
    try {
      const logs = await this.getLogs(characterId);
      if (logs.length === 0) {
        throw new Error('No logs found for this character.');
      }

      const csvData = this.convertToCSV(logs);
      const safeName = characterName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${FileSystem.documentDirectory}combat_log_${safeName}_${Date.now()}.csv`;

      // Save CSV to temporary directory
      await FileSystem.writeAsStringAsync(filename, csvData, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Verify availability of sharing
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        throw new Error('Sharing is not available on this device');
      }

      // Share the CSV
      await Sharing.shareAsync(filename, {
        mimeType: 'text/csv',
        dialogTitle: `Export logs of ${characterName}`,
      });
    } catch (error) {
      console.error('Error exporting logs to CSV:', error);
      throw error;
    }
  }
}
