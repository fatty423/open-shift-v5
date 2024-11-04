<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Guard, Shift } from '@/types/guard';
import GuardSchedule from '@/components/guard/GuardSchedule.vue';
import GuardMetrics from '@/components/guard/GuardMetrics.vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const route = useRoute();
const guard = ref<Guard | null>(null);
const loading = ref(true);

// Mock shifts data
const mockShifts: Shift[] = [
  {
    id: '1',
    guardId: '1',
    location: 'Corporate Office Building',
    startTime: '2024-02-20T09:00:00',
    endTime: '2024-02-20T17:00:00',
    status: 'scheduled',
  },
  {
    id: '2',
    guardId: '1',
    location: 'Shopping Mall',
    startTime: '2024-02-21T10:00:00',
    endTime: '2024-02-21T18:00:00',
    status: 'scheduled',
  },
];

onMounted(async () => {
  try {
    // Simulate API call
    setTimeout(() => {
      guard.value = {
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
        certifications: ['CPR Certified', 'First Aid', 'Armed Security'],
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
      };
      loading.value = false;
    }, 1000);
  } catch (error) {
    console.error('Failed to fetch guard data:', error);
  }
});

const getVerificationStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'success';
    case 'pending': return 'warning';
    case 'rejected': return 'danger';
    default: return 'info';
  }
};
</script>

<template>
  <div class="p-6">
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
    </div>

    <template v-else-if="guard">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <img
            :src="guard.profilePicture"
            :alt="guard.firstName"
            class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h1 class="text-2xl font-bold">{{ guard.firstName }} {{ guard.lastName }}</h1>
            <div class="flex items-center gap-2 mt-1">
              <Tag :severity="getVerificationStatusColor(guard.verificationStatus)">
                {{ guard.verificationStatus }}
              </Tag>
              <span class="text-gray-600">
                {{ guard.location.city }}, {{ guard.location.state }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4 md:mt-0 flex gap-2">
          <Button icon="pi pi-envelope" class="p-button-outlined" />
          <Button icon="pi pi-phone" class="p-button-outlined" />
          <Button label="Assign Shift" icon="pi pi-calendar-plus" />
        </div>
      </div>

      <!-- Metrics Section -->
      <div class="mb-6">
        <GuardMetrics :guard="guard" />
      </div>

      <!-- Main Content -->
      <TabView>
        <TabPanel header="Overview">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="col-span-2">
              <div class="bg-white rounded-lg shadow p-6 mb-6">
                <h3 class="text-lg font-semibold mb-4">Upcoming Shifts</h3>
                <GuardSchedule :shifts="mockShifts" />
              </div>

              <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">Certifications & Specialties</h3>
                <div class="space-y-4">
                  <div>
                    <h4 class="text-sm font-medium text-gray-600 mb-2">Certifications</h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="cert in guard.certifications"
                        :key="cert"
                        class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {{ cert }}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-600 mb-2">Specialties</h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="specialty in guard.specialties"
                        :key="specialty"
                        class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {{ specialty }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-1">
              <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">Contact Information</h3>
                <div class="space-y-3">
                  <div>
                    <label class="text-sm text-gray-600">Email</label>
                    <p class="font-medium">{{ guard.email }}</p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600">Phone</label>
                    <p class="font-medium">{{ guard.phone }}</p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600">Location</label>
                    <p class="font-medium">
                      {{ guard.location.city }}, {{ guard.location.state }} {{ guard.location.zipCode }}
                    </p>
                  </div>
                  <div>
                    <label class="text-sm text-gray-600">Pay Rate</label>
                    <p class="font-medium">${{ guard.payRate }}/hr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Documents">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium">W-9 Form</h4>
                  <p class="text-sm text-gray-600">Tax identification document</p>
                </div>
                <Button icon="pi pi-download" class="p-button-outlined" />
              </div>
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium">EIN Document</h4>
                  <p class="text-sm text-gray-600">Employer Identification Number</p>
                </div>
                <Button icon="pi pi-download" class="p-button-outlined" />
              </div>
              <div v-for="(cert, index) in guard.documents.certifications" :key="index" 
                   class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium">Certification {{ index + 1 }}</h4>
                  <p class="text-sm text-gray-600">{{ cert }}</p>
                </div>
                <Button icon="pi pi-download" class="p-button-outlined" />
              </div>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </template>

    <div v-else class="text-center py-8">
      <p class="text-gray-600">Guard not found</p>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-tabview-panels) {
  padding: 1.5rem 0 0 0;
}
</style>