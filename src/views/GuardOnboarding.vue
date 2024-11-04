<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';

const currentStep = ref(1);
const totalSteps = 4;

const steps = [
  { number: 1, title: 'Personal Information' },
  { number: 2, title: 'Qualifications' },
  { number: 3, title: 'Documents' },
  { number: 4, title: 'Review' },
];

const goToStep = (step: number) => {
  if (step >= 1 && step <= totalSteps) {
    currentStep.value = step;
  }
};
</script>

<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Guard Onboarding</h1>
        <Button label="Save Draft" icon="pi pi-save" class="p-button-outlined" />
      </div>
      
      <Card>
        <template #content>
          <!-- Progress Steps -->
          <div class="mb-8">
            <div class="flex items-center justify-between">
              <div v-for="step in steps" :key="step.number" class="flex flex-1 items-center">
                <div 
                  class="flex flex-col items-center flex-1"
                  :class="{ 'cursor-pointer': currentStep > step.number }"
                  @click="currentStep > step.number && goToStep(step.number)"
                >
                  <div
                    :class="[
                      'rounded-full h-10 w-10 flex items-center justify-center mb-2',
                      currentStep > step.number ? 'bg-green-500 text-white' : 
                      currentStep === step.number ? 'bg-blue-600 text-white' : 
                      'bg-gray-200'
                    ]"
                  >
                    <i v-if="currentStep > step.number" class="pi pi-check"></i>
                    <span v-else>{{ step.number }}</span>
                  </div>
                  <span class="text-sm text-center">{{ step.title }}</span>
                </div>
                <div
                  v-if="step.number < totalSteps"
                  :class="[
                    'h-1 flex-1',
                    currentStep > step.number ? 'bg-green-500' :
                    currentStep === step.number ? 'bg-blue-600' : 
                    'bg-gray-200'
                  ]"
                ></div>
              </div>
            </div>
          </div>

          <!-- Step Content -->
          <div class="mt-8">
            <div v-if="currentStep === 1">
              <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
              <!-- Personal Information Form -->
            </div>
            <div v-else-if="currentStep === 2">
              <h3 class="text-lg font-semibold mb-4">Qualifications</h3>
              <!-- Qualifications Form -->
            </div>
            <div v-else-if="currentStep === 3">
              <h3 class="text-lg font-semibold mb-4">Documents</h3>
              <!-- Documents Upload -->
            </div>
            <div v-else>
              <h3 class="text-lg font-semibold mb-4">Review</h3>
              <!-- Review Information -->
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-8">
              <Button 
                v-if="currentStep > 1"
                label="Previous" 
                icon="pi pi-arrow-left" 
                class="p-button-outlined"
                @click="currentStep--"
              />
              <div class="ml-auto">
                <Button 
                  v-if="currentStep < totalSteps"
                  label="Next" 
                  icon="pi pi-arrow-right" 
                  iconPos="right"
                  @click="currentStep++"
                />
                <Button 
                  v-else
                  label="Submit" 
                  icon="pi pi-check"
                  severity="success"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-card-content) {
  padding: 1.5rem;
}</style>