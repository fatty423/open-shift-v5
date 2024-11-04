<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Guard } from '@/types/guard';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import SelectButton from 'primevue/selectbutton';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const toast = useToast();

const props = defineProps<{
  guards: Guard[];
  viewMode: 'list' | 'grid';
  loading: boolean;
}>();

const selectedGuards = ref<Guard[]>([]);
const showMessageDialog = ref(false);
const messageType = ref('email');
const messageText = ref('');
const sendingMessage = ref(false);

const messageTypeOptions = [
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms' }
];

const hasSelectedGuards = computed(() => selectedGuards.value.length > 0);

const getVerificationStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'success';
    case 'pending': return 'warning';
    case 'rejected': return 'danger';
    default: return 'info';
  }
};

const navigateToProfile = (guardId: string) => {
  router.push(`/guards/${guardId}`);
};

const toggleGuardSelection = (guard: Guard) => {
  const index = selectedGuards.value.findIndex(g => g.id === guard.id);
  if (index === -1) {
    selectedGuards.value.push(guard);
  } else {
    selectedGuards.value.splice(index, 1);
  }
};

const isSelected = (guard: Guard) => {
  return selectedGuards.value.some(g => g.id === guard.id);
};

const openMessageDialog = () => {
  showMessageDialog.value = true;
  messageText.value = '';
};

const sendMessage = async () => {
  if (!messageText.value.trim()) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please enter a message',
      life: 3000
    });
    return;
  }

  sendingMessage.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Message sent to ${selectedGuards.value.length} guards`,
      life: 3000
    });
    
    showMessageDialog.value = false;
    selectedGuards.value = [];
    messageText.value = '';
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to send message',
      life: 3000
    });
  } finally {
    sendingMessage.value = false;
  }
};
</script>

<template>
  <div>
    <!-- Message Action Bar -->
    <div v-if="hasSelectedGuards" 
         class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg flex items-center justify-between">
      <div class="flex items-center gap-2">
        <i class="pi pi-users text-blue-500"></i>
        <span class="font-medium">{{ selectedGuards.length }} guards selected</span>
      </div>
      <div class="flex gap-2">
        <Button 
          label="Clear Selection" 
          icon="pi pi-times"
          class="p-button-outlined p-button-secondary"
          @click="selectedGuards = []"
        />
        <Button 
          label="Send Message" 
          icon="pi pi-envelope"
          @click="openMessageDialog"
        />
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card v-for="guard in guards" :key="guard.id" class="hover:shadow-lg transition-shadow">
        <template #header>
          <div class="relative">
            <Checkbox
              :modelValue="isSelected(guard)"
              @change="toggleGuardSelection(guard)"
              class="absolute top-2 left-2 z-10"
            />
            <img :src="guard.profilePicture" :alt="guard.firstName" class="w-full h-48 object-cover" />
          </div>
        </template>
        <template #title>
          <div class="flex items-center justify-between">
            <span>{{ guard.firstName }} {{ guard.lastName }}</span>
            <Tag :severity="getVerificationStatusColor(guard.verificationStatus)">
              {{ guard.verificationStatus }}
            </Tag>
          </div>
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
          <div class="flex gap-2">
            <Button 
              label="View Profile" 
              class="p-button-outlined flex-1"
              @click="navigateToProfile(guard.id)"
            />
            <Button 
              icon="pi pi-envelope" 
              class="p-button-outlined p-button-secondary"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- List View -->
    <div v-else class="space-y-4">
      <div
        v-for="guard in guards"
        :key="guard.id"
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
      >
        <div class="flex items-center gap-4">
          <Checkbox
            :modelValue="isSelected(guard)"
            @change="toggleGuardSelection(guard)"
          />
          <img
            :src="guard.profilePicture"
            :alt="guard.firstName"
            class="w-16 h-16 rounded-full object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium">
                  {{ guard.firstName }} {{ guard.lastName }}
                </h3>
                <div class="flex items-center gap-2">
                  <Rating :modelValue="guard.rating" readonly :cancel="false" />
                  <span class="text-sm text-gray-600">({{ guard.rating }})</span>
                </div>
              </div>
              <Tag :severity="getVerificationStatusColor(guard.verificationStatus)">
                {{ guard.verificationStatus }}
              </Tag>
            </div>
            <div class="mt-2 flex items-center gap-4 text-sm text-gray-600">
              <span>
                <i class="pi pi-map-marker mr-1"></i>
                {{ guard.location.city }}, {{ guard.location.state }}
              </span>
              <span>
                <i class="pi pi-dollar mr-1"></i>
                ${{ guard.payRate }}/hr
              </span>
            </div>
          </div>
          <div class="flex gap-2">
            <Button 
              label="View Profile" 
              class="p-button-outlined"
              @click="navigateToProfile(guard.id)"
            />
            <Button 
              icon="pi pi-envelope" 
              class="p-button-outlined p-button-secondary"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Message Dialog -->
    <Dialog 
      v-model:visible="showMessageDialog"
      modal
      header="Send Message"
      :style="{ width: '500px' }"
      :closable="!sendingMessage"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Recipients ({{ selectedGuards.length }})
          </label>
          <div class="flex flex-wrap gap-2">
            <Tag 
              v-for="guard in selectedGuards" 
              :key="guard.id"
              :value="`${guard.firstName} ${guard.lastName}`"
              class="bg-blue-100 text-blue-800"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Message Type
          </label>
          <SelectButton 
            v-model="messageType"
            :options="messageTypeOptions"
            aria-label="Message Type"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <Textarea
            v-model="messageText"
            rows="5"
            class="w-full"
            :placeholder="messageType === 'email' ? 'Type your email message...' : 'Type your SMS message...'"
            :disabled="sendingMessage"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <Button 
            label="Cancel" 
            class="p-button-text"
            @click="showMessageDialog = false"
            :disabled="sendingMessage"
          />
          <Button 
            label="Send"
            icon="pi pi-send"
            :loading="sendingMessage"
            @click="sendMessage"
          />
        </div>
      </template>
    </Dialog>

    <!-- Empty State -->
    <div v-if="!loading && guards.length === 0" class="text-center py-8">
      <p class="text-gray-600">No guards found matching your criteria.</p>
    </div>

    <Toast position="top-right" />
  </div>
</template>

<style scoped>
:deep(.p-card) {
  @apply h-full;
}

:deep(.p-card-content) {
  @apply p-4;
}

:deep(.p-checkbox) {
  @apply transition-transform duration-200 hover:scale-110;
}

:deep(.p-dialog-content) {
  @apply p-6;
}

:deep(.p-selectbutton) {
  @apply w-full;
}

:deep(.p-selectbutton .p-button) {
  @apply flex-1;
}
</style>