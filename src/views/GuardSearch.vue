<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGuardStore } from '@/stores/guards';
import type { Guard } from '@/types/guard';
import Slider from 'primevue/slider';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Rating from 'primevue/rating';
import Button from 'primevue/button';

const guardStore = useGuardStore();
const guards = ref<Guard[]>([]);
const loading = ref(true);

const filters = ref({
  search: '',
  rating: 0,
  location: '',
  certifications: [] as string[],
  specialties: [] as string[],
  payRate: [20, 100],
});

const certificationOptions = [
  'CPR Certified',
  'First Aid',
  'Armed Security',
  'CCTV Operations',
  'Crisis Management',
];

const specialtyOptions = [
  'Event Security',
  'Corporate Security',
  'Residential Security',
  'Loss Prevention',
  'VIP Protection',
];

const mockGuards: Guard[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.5,
    location: {
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    certifications: ['CPR Certified', 'First Aid'],
    specialties: ['Event Security', 'Corporate Security'],
    payRate: 25,
    availability: [
      {
        start: '2024-02-20T09:00:00',
        end: '2024-02-20T17:00:00',
      },
    ],
    documents: {
      w9: 'w9.pdf',
      ein: 'ein.pdf',
      certifications: ['cpr.pdf', 'firstaid.pdf'],
    },
    status: 'active',
    verificationStatus: 'verified',
  },
];

onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    guards.value = mockGuards;
    loading.value = false;
  }, 1000);
});

const filteredGuards = computed(() => {
  return guards.value.filter(guard => {
    const matchesSearch = guard.firstName.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      guard.lastName.toLowerCase().includes(filters.value.search.toLowerCase());
    const matchesRating = guard.rating >= filters.value.rating;
    const matchesPayRate = guard.payRate >= filters.value.payRate[0] && guard.payRate <= filters.value.payRate[1];
    const matchesCertifications = filters.value.certifications.length === 0 ||
      filters.value.certifications.every(cert => guard.certifications.includes(cert));
    const matchesSpecialties = filters.value.specialties.length === 0 ||
      filters.value.specialties.every(spec => guard.specialties.includes(spec));

    return matchesSearch && matchesRating && matchesPayRate && matchesCertifications && matchesSpecialties;
  });
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Guard Search</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Filters Panel -->
      <div class="lg:col-span-1 bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold mb-4">Filters</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <InputText v-model="filters.search" class="w-full" placeholder="Search guards..." />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
            <Rating v-model="filters.rating" :cancel="false" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pay Rate Range</label>
            <Slider v-model="filters.payRate" range :min="20" :max="100" class="mt-4" />
            <div class="text-sm text-gray-600 mt-1">
              ${{ filters.payRate[0] }} - ${{ filters.payRate[1] }}/hr
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
            <MultiSelect
              v-model="filters.certifications"
              :options="certificationOptions"
              placeholder="Select certifications"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
            <MultiSelect
              v-model="filters.specialties"
              :options="specialtyOptions"
              placeholder="Select specialties"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <!-- Guards List -->
      <div class="lg:col-span-3">
        <div v-if="loading" class="text-center py-8">
          <i class="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card v-for="guard in filteredGuards" :key="guard.id" class="hover:shadow-lg transition-shadow">
            <template #header>
              <img :src="guard.profilePicture" :alt="guard.firstName" class="w-full h-48 object-cover" />
            </template>
            <template #title>
              {{ guard.firstName }} {{ guard.lastName }}
            </template>
            <template #subtitle>
              <div class="flex items-center gap-2">
                <Rating :modelValue="guard.rating" readonly :cancel="false" />
                <span class="text-sm text-gray-600">({{ guard.rating }})</span>
              </div>
            </template>
            <template #content>
              <div class="space-y-2">
                <p class="text-gray-600">
                  <i class="pi pi-map-marker mr-2"></i>
                  {{ guard.location.city }}, {{ guard.location.state }}
                </p>
                <p class="text-gray-600">
                  <i class="pi pi-dollar mr-2"></i>
                  ${{ guard.payRate }}/hr
                </p>
                <div class="flex flex-wrap gap-1 mt-2">
                  <span
                    v-for="cert in guard.certifications"
                    :key="cert"
                    class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {{ cert }}
                  </span>
                </div>
              </div>
            </template>
            <template #footer>
              <router-link :to="`/guards/${guard.id}`">
                <Button label="View Profile" class="p-button-outlined" />
              </router-link>
            </template>
          </Card>
        </div>

        <div v-if="!loading && filteredGuards.length === 0" class="text-center py-8">
          <p class="text-gray-600">No guards found matching your criteria.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-card) {
  @apply h-full;
}

:deep(.p-card-content) {
  @apply p-4;
}

:deep(.p-multiselect) {
  @apply w-full;
}
</style>