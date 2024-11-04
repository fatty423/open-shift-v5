<script setup lang="ts">
import { ref, watch } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import MultiSelect from 'primevue/multiselect';
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

const props = defineProps<{
  filters: {
    search: string;
    rating: number;
    location: string;
    certifications: string[];
    specialties: string[];
    payRate: number[];
    status: string[];
  };
}>();

const emit = defineEmits<{
  'update:filters': [filters: typeof props.filters];
}>();

const localFilters = ref({ ...props.filters });
const isExpanded = ref(true);

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

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Inactive', value: 'inactive' },
];

const resetFilters = () => {
  localFilters.value = {
    search: '',
    rating: 0,
    location: '',
    certifications: [],
    specialties: [],
    payRate: [20, 100],
    status: [],
  };
  emit('update:filters', localFilters.value);
};

const toggleFilters = () => {
  isExpanded.value = !isExpanded.value;
};

watch(localFilters, (newFilters) => {
  emit('update:filters', newFilters);
}, { deep: true });
</script>

<template>
  <Card class="filter-card">
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-filter text-blue-500"></i>
          <h2 class="text-lg font-semibold">Filters</h2>
          <span 
            v-if="Object.values(localFilters).some(v => 
              Array.isArray(v) ? v.length > 0 : v !== 0 && v !== '')"
            class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
          >
            Active
          </span>
        </div>
        <div class="flex items-center gap-2">
          <Button 
            icon="pi pi-refresh" 
            class="p-button-text p-button-sm" 
            @click="resetFilters"
            aria-label="Reset filters"
            v-tooltip.top="'Reset all filters'"
          />
          <Button
            :icon="isExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
            class="p-button-text p-button-sm lg:hidden"
            @click="toggleFilters"
            :aria-expanded="isExpanded"
            aria-controls="filter-content"
          />
        </div>
      </div>
    </template>

    <template #content>
      <div 
        id="filter-content"
        class="space-y-6 transition-all duration-300"
        :class="{ 'hidden lg:block': !isExpanded }"
      >
        <div class="filter-section">
          <span class="p-input-icon-left w-full">
            <i class="pi pi-search" />
            <InputText
              v-model="localFilters.search"
              class="w-full transition-shadow duration-200"
              placeholder="Search guards..."
              aria-label="Search guards"
            />
          </span>
        </div>

        <Divider class="my-4" />

        <div class="filter-section">
          <label class="filter-label" for="rating">
            Minimum Rating
          </label>
          <Rating 
            id="rating"
            v-model="localFilters.rating" 
            :cancel="false"
            aria-label="Select minimum rating"
          />
        </div>

        <div class="filter-section">
          <label class="filter-label" for="pay-rate">
            Pay Rate Range
          </label>
          <Slider 
            id="pay-rate"
            v-model="localFilters.payRate" 
            range 
            :min="20" 
            :max="100" 
            class="mt-4"
            aria-label="Select pay rate range"
          />
          <div class="text-sm text-gray-600 mt-2 flex justify-between">
            <span>${{ localFilters.payRate[0] }}/hr</span>
            <span>${{ localFilters.payRate[1] }}/hr</span>
          </div>
        </div>

        <div class="filter-section">
          <label class="filter-label" for="status">
            Status
          </label>
          <MultiSelect
            id="status"
            v-model="localFilters.status"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select status"
            class="w-full"
            aria-label="Select guard status"
          />
        </div>

        <div class="filter-section">
          <label class="filter-label" for="certifications">
            Certifications
          </label>
          <MultiSelect
            id="certifications"
            v-model="localFilters.certifications"
            :options="certificationOptions"
            placeholder="Select certifications"
            class="w-full"
            aria-label="Select certifications"
          />
        </div>

        <div class="filter-section">
          <label class="filter-label" for="specialties">
            Specialties
          </label>
          <MultiSelect
            id="specialties"
            v-model="localFilters.specialties"
            :options="specialtyOptions"
            placeholder="Select specialties"
            class="w-full"
            aria-label="Select specialties"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.filter-card {
  @apply bg-white rounded-lg transition-shadow duration-300;
}

.filter-card:hover {
  @apply shadow-lg;
}

.filter-section {
  @apply transition-all duration-200;
}

.filter-section:hover {
  @apply transform scale-[1.01];
}

.filter-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

:deep(.p-multiselect),
:deep(.p-inputtext) {
  @apply w-full transition-all duration-200;
}

:deep(.p-multiselect:hover),
:deep(.p-inputtext:hover) {
  @apply border-blue-300;
}

:deep(.p-multiselect:focus),
:deep(.p-inputtext:focus) {
  @apply ring-2 ring-blue-200 border-blue-500;
}

:deep(.p-multiselect-token) {
  @apply bg-blue-100 text-blue-800 border border-blue-200;
}

:deep(.p-slider) {
  @apply transition-all duration-200;
}

:deep(.p-slider .p-slider-handle) {
  @apply transition-transform duration-200 hover:scale-110;
}

:deep(.p-rating-icon) {
  @apply transition-transform duration-200;
}

:deep(.p-rating-icon.pi-star-fill) {
  @apply text-yellow-400;
}

:deep(.p-rating:not(.p-disabled):not(.p-readonly) .p-rating-icon:hover) {
  @apply transform scale-110;
}

:deep(.p-card) {
  @apply shadow-sm hover:shadow-md transition-shadow duration-300;
}

:deep(.p-divider) {
  @apply opacity-50;
}

@media (max-width: 1024px) {
  .filter-section {
    @apply py-2;
  }
}
</style>