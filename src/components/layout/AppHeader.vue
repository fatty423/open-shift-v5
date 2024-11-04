<script setup lang="ts">
import { useRoute } from 'vue-router';
import Button from 'primevue/button';

const route = useRoute();
</script>

<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center flex-1">
          <router-link to="/" class="flex items-center text-xl font-semibold text-gray-900">
            Security Staff Management
          </router-link>
          <div class="hidden sm:ml-10 sm:flex space-x-8">
            <router-link 
              to="/" 
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
              :class="{ 'border-blue-500': route.path === '/' }"
            >
              <i class="pi pi-home mr-2"></i>
              Dashboard
            </router-link>
            <router-link 
              to="/guards" 
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
              :class="{ 'border-blue-500': route.path.startsWith('/guards') }"
            >
              <i class="pi pi-users mr-2"></i>
              Guards
            </router-link>
            <router-link 
              to="/onboarding" 
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
              :class="{ 'border-blue-500': route.path === '/onboarding' }"
            >
              <i class="pi pi-user-plus mr-2"></i>
              Onboarding
            </router-link>
            <router-link 
              to="/shifts" 
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
              :class="{ 'border-blue-500': route.path === '/shifts' }"
            >
              <i class="pi pi-calendar mr-2"></i>
              Shifts
            </router-link>
            <router-link 
              to="/reports" 
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
              :class="{ 'border-blue-500': route.path === '/reports' }"
            >
              <i class="pi pi-chart-bar mr-2"></i>
              Reports
            </router-link>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Button 
            icon="pi pi-bell" 
            class="p-button-text p-button-rounded"
            badge="2" 
            badgeClass="bg-red-500"
          />
          <Button 
            icon="pi pi-user" 
            class="p-button-text p-button-rounded" 
          />
        </div>
      </div>
    </div>
  </nav>
</template>