import { useQuery } from '@tanstack/react-query';
import { useUniversityStore, type BusLocation } from '../store/useUniversityStore';
import { useEffect } from 'react';

/**
 * Custom hook for managing campus transit system with real-time bus tracking
 * Updates are received via WebSocket and synced with Zustand store
 */
export const useTransitSystem = () => {
  const { busLocations } = useUniversityStore();

  // Query for bus locations (Zustand store is updated by WebSocket)
  const { data: buses, isLoading } = useQuery({
    queryKey: ['busLocations'],
    queryFn: async () => busLocations,
    initialData: busLocations,
    // Refetch every 5 seconds to ensure data freshness
    refetchInterval: 5000,
  });

  // Calculate ETA in human-readable format
  const formatETA = (minutes: number) => {
    if (minutes < 1) return 'Arriving now';
    if (minutes === 1) return '1 minute';
    if (minutes < 60) return `${Math.round(minutes)} minutes`;

    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  // Get occupancy status
  const getOccupancyStatus = (bus: BusLocation) => {
    const percentage = (bus.occupancy / bus.capacity) * 100;

    if (percentage >= 90) return { label: 'Full', color: 'red' };
    if (percentage >= 70) return { label: 'Nearly Full', color: 'orange' };
    if (percentage >= 40) return { label: 'Moderate', color: 'yellow' };
    return { label: 'Available', color: 'green' };
  };

  // Filter buses by route
  const getBusByRoute = (routeName: string) => {
    return buses?.find((bus) => bus.routeName === routeName);
  };

  // Get nearest bus to a stop
  const getNearestBus = (stopName: string) => {
    const busesForStop = buses?.filter((bus) => bus.nextStop === stopName);
    if (!busesForStop || busesForStop.length === 0) return null;

    // Return bus with shortest ETA
    return busesForStop.reduce((nearest, bus) =>
      bus.eta < nearest.eta ? bus : nearest
    );
  };

  // Sort buses by ETA (nearest first)
  const getBusesSortedByETA = () => {
    return [...(buses || [])].sort((a, b) => a.eta - b.eta);
  };

  return {
    buses: buses || [],
    isLoading,
    formatETA,
    getOccupancyStatus,
    getBusByRoute,
    getNearestBus,
    getBusesSortedByETA,
  };
};
