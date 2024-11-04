<script setup lang="ts">
import { ref } from 'vue';
import type { Shift } from '@/types/guard';
import { format } from 'date-fns';

const props = defineProps<{
  shifts: Shift[];
}>();

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-gray-100 text-gray-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <div class="space-y-4">
    <div v-for="shift in shifts" :key="shift.id" class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h4 class="font-medium">{{ shift.location }}</h4>
        <p class="text-sm text-gray-600">
          {{ format(new Date(shift.startTime), 'MMM d, yyyy h:mm a') }} - 
          {{ format(new Date(shift.endTime), 'h:mm a') }}
        </p>
      </div>
      <span :class="[getStatusColor(shift.status), 'px-3 py-1 rounded-full text-sm']">
        {{ shift.status }}
      </span>
    </div>
  </div>
</template>