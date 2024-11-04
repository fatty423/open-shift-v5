<script setup lang="ts">
import { computed } from 'vue';
import type { Guard } from '@/types/guard';

const props = defineProps<{
  guard: Guard;
}>();

const completedShifts = computed(() => 150); // Mock data
const averageRating = computed(() => props.guard.rating);
const responseRate = computed(() => '95%'); // Mock data
const onTimeRate = computed(() => '98%'); // Mock data
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h4 class="text-sm text-gray-600">Completed Shifts</h4>
      <p class="text-2xl font-semibold">{{ completedShifts }}</p>
    </div>
    
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h4 class="text-sm text-gray-600">Average Rating</h4>
      <p class="text-2xl font-semibold">{{ averageRating }}/5</p>
    </div>
    
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h4 class="text-sm text-gray-600">Response Rate</h4>
      <p class="text-2xl font-semibold">{{ responseRate }}</p>
    </div>
    
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h4 class="text-sm text-gray-600">On-time Rate</h4>
      <p class="text-2xl font-semibold">{{ onTimeRate }}</p>
    </div>
  </div>
</template>