<template>
  <form class="card" @submit.prevent="createPerson">
    <div class="form-control">
      <label for="fio">ФИО</label>
      <input v-model="name" type="text" id="fio" />
      <small></small>
    </div>

    <div class="form-control">
      <label for="phone">Телефон</label>
      <input v-model="phone" type="text" id="phone" />
      <small></small>
    </div>

    <div class="form-control">
      <label for="amount">Суммы</label>
      <input v-model="sum" type="number" id="amount" />
      <small></small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select v-model="status" id="status">
        <option value="done">Завершен</option>
        <option value="canceled">Отменен</option>
        <option value="active">Активен</option>
        <option value="inProgress">Выполняется</option>
      </select>
    </div>

    <button class="btn primary">
      {{ !store.isLoading ? 'Создать' : '' }}
      <app-loader type="primary small" v-if="store.isLoading" />
    </button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from '@/stores/store.js'
import { useAlertStore } from '@/stores/alertStore.js'
import { useRequestsStore } from '@/stores/requests.js'
import { useAuthStore } from '@/stores/authStore.js'
import AppLoader from '@/components/ui/AppLoader.vue'

export default {
  components: { AppLoader },
  setup() {
    const alertStore = useAlertStore()
    const store = useStore()
    const requestsStore = useRequestsStore()
    const authStore = useAuthStore()

    let name = ref('Соколов М.Е')
    let phone = ref('+7 910 830 12 52')
    let sum = ref('1000000')
    let status = ref('active')

    async function createPerson() {
      const req = { userID: authStore.user.id, name, phone, sum, status }
      await requestsStore.addNewRequest(req)
      store.isModalOpen = false

      // Показ уведомления
      alertStore.changeAlert(true, 'primary', 'Заявка успешно создана!')
    }

    return {
      createPerson,
      name,
      phone,
      sum,
      status,
      store
    }
  },
}
</script>

<style scoped></style>
