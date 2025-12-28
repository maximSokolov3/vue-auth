<template>
  <app-loader v-if="store.isLoading"></app-loader>
  <app-page title="Заявка" v-if="item && !store.isLoading">
    <p><strong>Имя владельца:</strong> {{ item.fullName }}</p>
    <p><strong>Телефон:</strong> {{ item.telephone }}</p>
    <p><strong>Сумма:</strong> {{ item.sum }}</p>
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

    <button class="btn danger" @click="requestsStore.deleteUser(id)">Удалить</button>
    <button class="btn" @click="requestsStore.changeReqState(id, status)">Обновить</button>
    <!--    <app-message />-->
  </app-page>
</template>

<script>
import { ref, isReactive, onMounted, reactive } from 'vue'
import { useStore } from '@/stores/store.js'
import { useAlertStore } from '@/stores/alertStore.js'
import { useRequestsStore } from '@/stores/requests.js'

import AppPage from '@/components/ui/AppPage.vue'
import AppMessage from '@/components/ui/AppMessage.vue'
import AppStatus from '@/components/ui/AppStatus.vue'
import AppLoader from "@/components/ui/AppLoader.vue";
import { useAuthStore } from '@/stores/authStore.js'

export default {
  setup({ id }) {
    const store = useStore()
    const alertStore = useAlertStore()
    const requestsStore = useRequestsStore()
    let item = ref(null)
    let status = ref(null)

    onMounted(async () => {
      item.value = (await requestsStore.getRequestByID(id)).data.data;
      status.value = item.value.status
    })

    return { item, store, status, alertStore, requestsStore }
  },
  components: { AppPage, AppMessage, AppStatus, AppLoader },
  props: ['id'],

  // beforeRouteEnter(to, from, next) {
  //   let res;
  //   (async() => {
  //     res = await useRequestsStore().getRequestByID(to.params.id)
  //     console.log(res)
  //     next(vm => {})
  //   })()
  //
  //
  // }
}
</script>

<style scoped></style>
