<script setup lang="ts">
import { ref } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';

const reports = ref([
  {
    id: '1',
    title: 'Monthly Performance Report',
    type: 'performance',
    date: '2024-02-01',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Incident Summary',
    type: 'incident',
    date: '2024-02-15',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Guard Attendance Report',
    type: 'attendance',
    date: '2024-02-10',
    status: 'completed',
  },
]);

const getReportIcon = (type: string) => {
  switch (type) {
    case 'performance': return 'pi pi-chart-line';
    case 'incident': return 'pi pi-exclamation-circle';
    case 'attendance': return 'pi pi-clock';
    default: return 'pi pi-file';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Reports</h1>
        <p class="text-sm text-gray-600">Generate and view security reports</p>
      </div>
      <Button label="Generate Report" icon="pi pi-plus" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Reports -->
      <div class="lg:col-span-2">
        <Card>
          <template #title>
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Recent Reports</h2>
              <Button label="View All" class="p-button-text" />
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div v-for="report in reports" :key="report.id"
                   class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <i :class="[getReportIcon(report.type), 'text-blue-600']"></i>
                  </div>
                  <div>
                    <h4 class="font-medium">{{ report.title }}</h4>
                    <p class="text-sm text-gray-600">Generated on {{ report.date }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <span :class="[getStatusColor(report.status), 'px-3 py-1 rounded-full text-sm']">
                    {{ report.status }}
                  </span>
                  <Button icon="pi pi-download" class="p-button-text p-button-rounded" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Report Templates -->
      <div class="lg:col-span-1">
        <Card>
          <template #title>
            <h2 class="text-xl font-semibold">Report Templates</h2>
          </template>
          <template #content>
            <div class="space-y-4">
              <Button 
                label="Performance Report" 
                icon="pi pi-chart-line"
                class="p-button-outlined w-full justify-start" 
              />
              <Button 
                label="Incident Report" 
                icon="pi pi-exclamation-circle"
                class="p-button-outlined w-full justify-start" 
              />
              <Button 
                label="Attendance Report" 
                icon="pi pi-clock"
                class="p-button-outlined w-full justify-start" 
              />
              <Button 
                label="Custom Report" 
                icon="pi pi-file"
                class="p-button-outlined w-full justify-start" 
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>