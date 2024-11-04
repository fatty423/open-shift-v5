<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGuardStore } from '@/stores/guards';
import type { Guard, Shift } from '@/types/guard';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { format } from 'date-fns';

const router = useRouter();
const guardStore = useGuardStore();
const loading = ref(true);

const metrics = ref({
  activeGuards: 24,
  activeShifts: 18,
  pendingVerifications: 5,
  totalRevenue: 45280,
  activeIncidents: 3,
  responseTime: '4.2',
  checkInsCompleted: 92,
  alertsToday: 7,
});

const recentIncidents = ref([
  {
    id: '1',
    type: 'Unauthorized Access',
    location: 'Main Entrance',
    timestamp: '2024-02-20T14:30:00',
    status: 'in-progress',
    severity: 'high',
    assignedGuard: 'John Doe',
  },
  {
    id: '2',
    type: 'Suspicious Activity',
    location: 'Parking Lot B',
    timestamp: '2024-02-20T13:15:00',
    status: 'resolved',
    severity: 'medium',
    assignedGuard: 'Jane Smith',
  },
]);

const recentShifts = ref<Shift[]>([
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

const availableGuards = ref<Guard[]>([
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.5,
    location: { city: 'New York', state: 'NY', zipCode: '10001' },
    certifications: ['CPR Certified'],
    specialties: ['Event Security'],
    payRate: 25,
    availability: [],
    documents: { w9: '', ein: '', certifications: [] },
    status: 'active',
    verificationStatus: 'verified',
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

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-orange-100 text-orange-800';
    case 'low': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const navigateToIncidents = () => {
  router.push('/reports?tab=incidents');
};

const navigateToShifts = () => {
  router.push('/shifts');
};

const navigateToGuards = () => {
  router.push('/guards');
};

const navigateToMap = () => {
  router.push('/guards?view=map');
};

onMounted(async () => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Security Operations Dashboard</h1>
        <p class="text-sm text-gray-600">Live monitoring and incident management</p>
      </div>
      <div class="flex gap-2">
        <Button severity="danger" label="Report Incident" icon="pi pi-exclamation-triangle" @click="navigateToIncidents" />
        <Button label="Generate Report" icon="pi pi-file-pdf" class="p-button-outlined" @click="router.push('/reports')" />
      </div>
    </div>
    
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
    </div>
    
    <template v-else>
      <!-- Alert Banner for Critical Incidents -->
      <div v-if="metrics.activeIncidents > 0" 
           class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
        <div class="flex items-center">
          <i class="pi pi-exclamation-circle text-red-500 mr-3 text-xl"></i>
          <div>
            <h3 class="text-red-800 font-medium">Active Incidents Requiring Attention</h3>
            <p class="text-red-700">{{ metrics.activeIncidents }} incident(s) currently in progress</p>
          </div>
          <Button label="View All" class="p-button-danger p-button-text ml-auto" @click="navigateToIncidents" />
        </div>
      </div>

      <!-- Metrics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Active Guards</p>
              <h3 class="text-2xl font-bold text-blue-600">{{ metrics.activeGuards }}</h3>
            </div>
            <div class="p-3 bg-blue-50 rounded-full">
              <i class="pi pi-users text-blue-500 text-xl"></i>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-2">{{ metrics.activeShifts }} guards on duty</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Avg Response Time</p>
              <h3 class="text-2xl font-bold text-green-600">{{ metrics.responseTime }}m</h3>
            </div>
            <div class="p-3 bg-green-50 rounded-full">
              <i class="pi pi-clock text-green-500 text-xl"></i>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-2">-0.5m from last week</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Check-ins Completed</p>
              <h3 class="text-2xl font-bold text-orange-600">{{ metrics.checkInsCompleted }}%</h3>
            </div>
            <div class="p-3 bg-orange-50 rounded-full">
              <i class="pi pi-check-circle text-orange-500 text-xl"></i>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-2">Last 24 hours</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Alerts Today</p>
              <h3 class="text-2xl font-bold text-purple-600">{{ metrics.alertsToday }}</h3>
            </div>
            <div class="p-3 bg-purple-50 rounded-full">
              <i class="pi pi-bell text-purple-500 text-xl"></i>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-2">2 require attention</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Active Incidents -->
        <Card>
          <template #title>
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Active Incidents</h2>
              <Button label="View All" class="p-button-text" @click="navigateToIncidents" />
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div v-for="incident in recentIncidents" :key="incident.id" 
                   class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="font-medium">{{ incident.type }}</h4>
                    <span :class="[getSeverityColor(incident.severity), 'px-2 py-0.5 rounded-full text-xs']">
                      {{ incident.severity }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600">
                    {{ incident.location }} • Assigned to {{ incident.assignedGuard }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ format(new Date(incident.timestamp), 'MMM d, h:mm a') }}
                  </p>
                </div>
                <Button 
                  :label="incident.status === 'in-progress' ? 'Respond' : 'Details'"
                  :severity="incident.status === 'in-progress' ? 'danger' : 'secondary'"
                  class="p-button-sm"
                />
              </div>
            </div>
          </template>
        </Card>

        <!-- Guard Locations Map -->
        <Card>
          <template #title>
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Guard Locations</h2>
              <Button label="Full Map" class="p-button-text" @click="navigateToMap" />
            </div>
          </template>
          <template #content>
            <div class="bg-gray-100 rounded-lg h-[300px] flex items-center justify-center">
              <p class="text-gray-500">Interactive map showing real-time guard locations</p>
            </div>
          </template>
        </Card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Active Shifts -->
        <Card>
          <template #title>
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Active Shifts</h2>
              <Button label="View All" class="p-button-text" @click="navigateToShifts" />
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div v-for="shift in recentShifts" :key="shift.id" 
                   class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="font-medium">{{ shift.location }}</h4>
                  <p class="text-sm text-gray-600">
                    {{ format(new Date(shift.startTime), 'h:mm a') }} - 
                    {{ format(new Date(shift.endTime), 'h:mm a') }}
                  </p>
                </div>
                <span :class="[getStatusColor(shift.status), 'px-3 py-1 rounded-full text-sm']">
                  {{ shift.status }}
                </span>
              </div>
            </div>
          </template>
        </Card>

        <!-- Recent Activity Feed -->
        <Card>
          <template #title>
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Activity Feed</h2>
              <Button label="View All" class="p-button-text" @click="router.push('/reports?tab=activity')" />
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p class="text-sm">Guard check-in at Main Entrance</p>
                  <p class="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p class="text-sm">Patrol route completed - Building A</p>
                  <p class="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p class="text-sm">Maintenance request submitted</p>
                  <p class="text-xs text-gray-500">45 minutes ago</p>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </template>
  </div>
</template>

<style scoped>
:deep(.p-card) {
  @apply h-full;
}

:deep(.p-card-content) {
  @apply p-0;
}
</style>