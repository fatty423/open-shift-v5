<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Guard } from '@/types/guard'
import GuardList from '@/components/guard/GuardList.vue'
import GuardFilters from '@/components/guard/GuardFilters.vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Paginator from 'primevue/paginator'
import { mockGuards } from '@/data/mockGuards'

const router = useRouter()
const loading = ref(true)
const viewMode = ref<'list' | 'grid'>('grid')
const guards = ref<Guard[]>([])

// Pagination
const rows = ref(6)
const first = ref(0)
const totalRecords = ref(0)

const filters = ref({
  search: '',
  rating: 0,
  location: '',
  certifications: [] as string[],
  specialties: [] as string[],
  payRate: [20, 100],
  status: [] as string[],
})

const metrics = ref({
  totalGuards: 0,
  activeGuards: 0,
  pendingVerification: 0,
  averageRating: 0,
})

const filteredGuards = computed(() => {
  return guards.value.filter(guard => {
    const searchTerm = filters.value.search.toLowerCase()
    const fullName = `${guard.firstName} ${guard.lastName}`.toLowerCase()
    const location = `${guard.location.city} ${guard.location.state}`.toLowerCase()

    const matchesSearch = !searchTerm || 
      fullName.includes(searchTerm) || 
      location.includes(searchTerm) ||
      guard.email.toLowerCase().includes(searchTerm)

    const matchesRating = guard.rating >= filters.value.rating
    const matchesPayRate = guard.payRate >= filters.value.payRate[0] && 
      guard.payRate <= filters.value.payRate[1]
    
    const matchesCertifications = filters.value.certifications.length === 0 ||
      filters.value.certifications.every(cert => 
        guard.certifications.includes(cert))
    
    const matchesSpecialties = filters.value.specialties.length === 0 ||
      filters.value.specialties.every(spec => 
        guard.specialties.includes(spec))
    
    const matchesStatus = filters.value.status.length === 0 ||
      filters.value.status.includes(guard.status)

    return matchesSearch && matchesRating && matchesPayRate && 
      matchesCertifications && matchesSpecialties && matchesStatus
  })
})

const paginatedGuards = computed(() => {
  const start = first.value
  const end = start + rows.value
  return filteredGuards.value.slice(start, end)
})

const onPage = (event: { first: number, rows: number }) => {
  first.value = event.first
  rows.value = event.rows
}

onMounted(async () => {
  try {
    // Simulate API call with mock data
    setTimeout(() => {
      guards.value = mockGuards
      totalRecords.value = mockGuards.length
      
      // Calculate metrics
      metrics.value = {
        totalGuards: guards.value.length,
        activeGuards: guards.value.filter(g => g.status === 'active').length,
        pendingVerification: guards.value.filter(g => g.verificationStatus === 'pending').length,
        averageRating: Number((guards.value.reduce((acc, g) => acc + g.rating, 0) / guards.value.length).toFixed(1)),
      }
      
      loading.value = false
    }, 1000)
  } catch (error) {
    console.error('Failed to fetch guards:', error)
  }
})

const handleFilterChange = (newFilters: typeof filters.value) => {
  filters.value = newFilters
  first.value = 0 // Reset to first page when filters change
  totalRecords.value = filteredGuards.value.length
}

const navigateToOnboarding = () => {
  router.push('/onboarding')
}
</script>

<template>
  <div class="p-6">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Security Guards</h1>
        <p class="text-sm text-gray-600">Manage and monitor security personnel</p>
      </div>
      <div class="flex gap-2">
        <Button 
          label="Add New Guard" 
          icon="pi pi-user-plus" 
          @click="navigateToOnboarding"
        />
        <div class="flex border rounded-lg overflow-hidden">
          <Button 
            icon="pi pi-list" 
            :class="{ 'p-button-secondary': viewMode !== 'list' }"
            @click="viewMode = 'list'"
          />
          <Button 
            icon="pi pi-th-large" 
            :class="{ 'p-button-secondary': viewMode !== 'grid' }"
            @click="viewMode = 'grid'"
          />
        </div>
      </div>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Guards</p>
            <h3 class="text-2xl font-bold text-blue-600">{{ metrics.totalGuards }}</h3>
          </div>
          <div class="p-3 bg-blue-50 rounded-full">
            <i class="pi pi-users text-blue-500 text-xl"></i>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">{{ metrics.activeGuards }} active guards</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Average Rating</p>
            <h3 class="text-2xl font-bold text-green-600">{{ metrics.averageRating }}</h3>
          </div>
          <div class="p-3 bg-green-50 rounded-full">
            <i class="pi pi-star text-green-500 text-xl"></i>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">Out of 5.0</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pending Verification</p>
            <h3 class="text-2xl font-bold text-orange-600">{{ metrics.pendingVerification }}</h3>
          </div>
          <div class="p-3 bg-orange-50 rounded-full">
            <i class="pi pi-clock text-orange-500 text-xl"></i>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">Requires review</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Available Now</p>
            <h3 class="text-2xl font-bold text-purple-600">{{ metrics.activeGuards }}</h3>
          </div>
          <div class="p-3 bg-purple-50 rounded-full">
            <i class="pi pi-check-circle text-purple-500 text-xl"></i>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">Ready for assignment</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <GuardFilters
        :filters="filters"
        @update:filters="handleFilterChange"
        class="lg:col-span-1"
      />

      <div class="lg:col-span-3">
        <Card>
          <template #title>
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Guard List</h2>
              <div class="text-sm text-gray-600">
                Showing {{ Math.min(first + 1, filteredGuards.length) }}-{{ Math.min(first + rows, filteredGuards.length) }} of {{ filteredGuards.length }}
              </div>
            </div>
          </template>
          <template #content>
            <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
              <i class="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
            </div>
            
            <template v-else>
              <GuardList
                :guards="paginatedGuards"
                :view-mode="viewMode"
                :loading="loading"
              />

              <div class="mt-4">
                <Paginator
                  v-model:first="first"
                  v-model:rows="rows"
                  :totalRecords="totalRecords"
                  :rowsPerPageOptions="[6, 12, 24, 48]"
                  @page="onPage"
                  template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                />
              </div>

              <p v-if="filteredGuards.length === 0" class="text-center text-gray-600 mt-4">
                No guards found matching your criteria.
              </p>
            </template>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-paginator) {
  @apply bg-transparent border-none;
}

:deep(.p-card-content) {
  @apply p-0;
}
</style>