import { useUniversityStore } from '../store/useUniversityStore';

type MessageType = 'bus_update' | 'grade_update' | 'occupancy_update' | 'thesis_update';

interface WebSocketMessage {
  type: MessageType;
  data: any;
  timestamp: string;
}

class MockWebSocketService {
  private connected: boolean = false;
  private listeners: Map<MessageType, Set<(data: any) => void>> = new Map();
  private simulationInterval: NodeJS.Timeout | null = null;

  connect() {
    if (this.connected) return;

    console.log('[MockWebSocket] Connecting to university data stream...');
    this.connected = true;

    // Simulate connection delay
    setTimeout(() => {
      console.log('[MockWebSocket] Connected! Streaming real-time data...');
      this.startSimulation();
    }, 1000);
  }

  disconnect() {
    console.log('[MockWebSocket] Disconnecting...');
    this.connected = false;
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  on(type: MessageType, callback: (data: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(type)?.delete(callback);
    };
  }

  private emit(type: MessageType, data: any) {
    const message: WebSocketMessage = {
      type,
      data,
      timestamp: new Date().toISOString(),
    };

    this.listeners.get(type)?.forEach((callback) => callback(message.data));
  }

  private startSimulation() {
    // Simulate real-time updates every 5 seconds
    this.simulationInterval = setInterval(() => {
      this.simulateBusUpdates();
      this.simulateOccupancyUpdates();
    }, 5000);
  }

  private simulateBusUpdates() {
    const store = useUniversityStore.getState();

    store.busLocations.forEach((bus) => {
      // Simulate bus movement
      const latChange = (Math.random() - 0.5) * 0.001;
      const lonChange = (Math.random() - 0.5) * 0.001;
      const speedChange = Math.floor((Math.random() - 0.5) * 10);
      const etaChange = Math.random() > 0.5 ? -1 : 0;

      const updates = {
        latitude: bus.latitude + latChange,
        longitude: bus.longitude + lonChange,
        speed: Math.max(0, Math.min(60, bus.speed + speedChange)),
        eta: Math.max(1, bus.eta + etaChange),
        occupancy: Math.max(
          0,
          Math.min(bus.capacity, bus.occupancy + Math.floor((Math.random() - 0.5) * 5))
        ),
      };

      store.updateBusLocation(bus.id, updates);
      this.emit('bus_update', { id: bus.id, ...updates });
    });
  }

  private simulateOccupancyUpdates() {
    const store = useUniversityStore.getState();

    store.campusLocations.forEach((location) => {
      if (location.capacity && location.occupancy !== undefined) {
        // Random occupancy change
        const change = Math.floor((Math.random() - 0.5) * 10);
        const newOccupancy = Math.max(0, Math.min(location.capacity, location.occupancy + change));

        store.updateLocationOccupancy(location.id, newOccupancy);
        this.emit('occupancy_update', { id: location.id, occupancy: newOccupancy });
      }
    });
  }

  // Simulate server-side grade update
  simulateGradeUpdate(gradeId: string, newScore: number) {
    setTimeout(() => {
      this.emit('grade_update', {
        id: gradeId,
        score: newScore,
        success: Math.random() > 0.1, // 90% success rate
      });
    }, 1000 + Math.random() * 2000); // 1-3 second delay
  }
}

export const mockWebSocket = new MockWebSocketService();
