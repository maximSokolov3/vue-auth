<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Заявка" v-if="item && !loading">
    <p><strong>Имя владельца:</strong> {{ item.fullName }}</p>
    <p><strong>Телефон:</strong> {{ item.telephone }}</p>
    <p><strong>Сумма:</strong> {{ formatCurrency(item.sum) }}</p>
    <p><strong>Статус:</strong> <app-status :type="item.status" :key="item.status" /></p>

    <div class="form-control">
      <label for="status">Статус:</label>
      <select v-model="status" id="status">
        <option value="done">Завершен</option>
        <option value="canceled">Отменен</option>
        <option value="active">Активен</option>
        <option value="inProgress">Выполняется</option>
      </select>
    </div>

    <button class="btn danger mr-4" @click="requestsStore.deleteUser(id)">Удалить</button>
    <button class="btn" v-if="isChanged" @click="changeState">Обновить</button>
  </app-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRequestsStore } from '@/stores/requests.js'
import { useAlertStore } from '@/stores/alertStore.js'
import { formatCurrency } from '@/utils/currency.js'

import AppPage from '@/components/ui/AppPage.vue'
import AppStatus from '@/components/ui/AppStatus.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import router from '@/router/index.js'

const props = defineProps({
  id: String
})
const requestsStore = useRequestsStore();
const alertStore = useAlertStore();
let item = ref(null);
let status = ref(null);

let loading = ref(false);
let isChanged = ref(false)

async function changeState() {
  await requestsStore.changeReqState(props.id, status.value)
  await router.push('/requests');
  alertStore.changeAlert(true, 'warning', 'Статус заявки обновлен!');
}

onMounted(async () => {
  loading.value = true
  item.value = (await requestsStore.getRequestByID(props.id)).data.data
  status.value = item.value.status
  loading.value = false

  watch(status, () => {
    isChanged.value = true
  })
})
</script>

<style scoped></style>
