import { BroadcastChannel } from 'broadcast-channel';
import type { UserRole } from '../contexts/RoleContext';

// Message types for cross-tab communication
export type BroadcastMessage =
  | { type: 'ROLE_CHANGE'; payload: { role: UserRole } }
  | { type: 'NOTIFICATION_ADD'; payload: any }
  | { type: 'NOTIFICATION_READ'; payload: { id: string } }
  | { type: 'NOTIFICATION_CLEAR_ALL'; payload: null }
  | { type: 'THEME_CHANGE'; payload: { isDark: boolean } }
  | { type: 'STORE_UPDATE'; payload: { key: string; data: any } }
  | { type: 'GRADE_UPDATE'; payload: any }
  | { type: 'BUS_LOCATION_UPDATE'; payload: any }
  | { type: 'LIBRARY_UPDATE'; payload: any };

class UniversityBroadcastChannel {
  private channel: BroadcastChannel<BroadcastMessage>;
  private listeners: Map<string, Set<(message: BroadcastMessage) => void>> = new Map();

  constructor() {
    this.channel = new BroadcastChannel<BroadcastMessage>('gretsa-university-sync');
    this.setupListener();
  }

  private setupListener() {
    this.channel.onmessage = (message: BroadcastMessage) => {
      // Notify all registered listeners for this message type
      const typeListeners = this.listeners.get(message.type);
      if (typeListeners) {
        typeListeners.forEach((callback) => callback(message));
      }

      // Also notify wildcard listeners
      const wildcardListeners = this.listeners.get('*');
      if (wildcardListeners) {
        wildcardListeners.forEach((callback) => callback(message));
      }
    };
  }

  /**
   * Send a message to all other tabs
   */
  postMessage(message: BroadcastMessage) {
    this.channel.postMessage(message);
  }

  /**
   * Listen for specific message types
   * @param type - Message type to listen for, or '*' for all messages
   * @param callback - Function to call when message is received
   * @returns Unsubscribe function
   */
  on(type: string, callback: (message: BroadcastMessage) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(type)?.delete(callback);
    };
  }

  /**
   * Close the broadcast channel
   */
  close() {
    this.channel.close();
    this.listeners.clear();
  }
}

// Singleton instance
export const broadcastChannel = new UniversityBroadcastChannel();

// Convenience functions for common operations
export const syncRoleChange = (role: UserRole) => {
  broadcastChannel.postMessage({ type: 'ROLE_CHANGE', payload: { role } });
};

export const syncNotificationAdd = (notification: any) => {
  broadcastChannel.postMessage({ type: 'NOTIFICATION_ADD', payload: notification });
};

export const syncNotificationRead = (id: string) => {
  broadcastChannel.postMessage({ type: 'NOTIFICATION_READ', payload: { id } });
};

export const syncNotificationClearAll = () => {
  broadcastChannel.postMessage({ type: 'NOTIFICATION_CLEAR_ALL', payload: null });
};

export const syncThemeChange = (isDark: boolean) => {
  broadcastChannel.postMessage({ type: 'THEME_CHANGE', payload: { isDark } });
};

export const syncStoreUpdate = (key: string, data: any) => {
  broadcastChannel.postMessage({ type: 'STORE_UPDATE', payload: { key, data } });
};

export const syncGradeUpdate = (grade: any) => {
  broadcastChannel.postMessage({ type: 'GRADE_UPDATE', payload: grade });
};

export const syncBusLocationUpdate = (busLocation: any) => {
  broadcastChannel.postMessage({ type: 'BUS_LOCATION_UPDATE', payload: busLocation });
};

export const syncLibraryUpdate = (libraryData: any) => {
  broadcastChannel.postMessage({ type: 'LIBRARY_UPDATE', payload: libraryData });
};
