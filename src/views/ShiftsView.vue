<script setup lang="ts">
import { ref } from 'vue';
import type { Shift } from '@/types/guard';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { format } from 'date-fns';

const shifts = ref<Shift[]>([
  {
    id: '1',
    guardId: '1',
    location: 'Corporate Office Building',
    startTime: '2024-02-20T09:00:00',
    endTime: '2024-02-20T17:00:00',
    status: 'in-progress',
  },
  {
    id: '2',
    guardId: '2',
    location: 'Shopping Mall',
    startTime: '2024-02-20T10:00:00',
    endTime: '2024-02-20T18:00:00',
    status: 'scheduled',
  },
]);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-progress': return 'bg-green-100 text-green-800';
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Shift Management</h1>
        <p class="text-sm text-gray-600">Manage and monitor security shifts</p>
      </div>
      <Button label="Create Shift" icon="pi pi-plus" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Shifts Calendar -->
      <div class="lg:col-span-3">
        <Card>
          <template #title>
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Shift Schedule</h2>
              <div class="flex gap-2">
                <Button icon="pi pi-calendar" class="p-button-outlined" />
                <Button icon="pi pi-list" class="p-button-outlined" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div v-for="shift in shifts" :key="shift.id" 
                   class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium">{{ shift.location }}</h4>
                  <p class="text-sm text-gray-600">
                    {{ format(new Date(shift.startTime), 'MMM d, h:mm a') }} - 
                    {{ format(new Date(shift.endTime), 'h:mm a') }}
                  </p>
                </div>
                <div class="flex items-center gap-4">
                  <span :class="[getStatusColor(shift.status), 'px-3 py-1 rounded-full text-sm']">
                    {{ shift.status }}
                  </span>
                  <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Shift Stats -->
      <div class="lg:col-span-1">
        <Card>
          <template #title>
            <h2 class="text-xl font-semibold">Shift Statistics</h2>
          </template>
          <template #content>
            <div class="space-y-4">
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="text-sm font-medium text-gray-600">Active Shifts</h4>
                <p class="text-2xl font-semibold text-blue-600">12</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="text-sm font-medium text-gray-600">Upcoming Shifts</h4>
                <p class="text-2xl font-semibold text-green-600">8</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="text-sm font-medium text-gray-600">Completion Rate</h4>
                <p class="text-2xl font-semibold text-purple-600">95%</p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>