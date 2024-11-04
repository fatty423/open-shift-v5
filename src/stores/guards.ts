import { defineStore } from 'pinia';
import type { Guard } from '@/types/guard';

export const useGuardStore = defineStore('guards', {
  state: () => ({
    guards: [] as Guard[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    activeGuards: (state) => state.guards.filter(guard => guard.status === 'active'),
    availableGuards: (state) => state.guards.filter(guard => {
      const now = new Date();
      return guard.availability.some(slot => {
        const start = new Date(slot.start);
        const end = new Date(slot.end);
        return now >= start && now <= end;
      });
    }),
  },

  actions: {
    async fetchGuards() {
      this.loading = true;
      try {
        // TODO: Implement API call
        this.loading = false;
      } catch (error) {
        this.error = 'Failed to fetch guards';
        this.loading = false;
      }
    },
  },
});