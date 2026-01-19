<template>
  <div class="kanban-board">
    <!-- 4 колонки для drag-and-drop -->
    <div class="columns-container">
      <!-- Колонка 1: Новые -->
      <div class="column">
        <div class="column-header new">
          <h3>Новые</h3>
          <span class="count-badge">{{ newItems.length }}</span>
        </div>
        <draggable
          v-model="newItems"
          group="tickets"
          item-key="id"
          class="cards-container"
          @end="handleDragEnd"
        >
        <DragNDropCard :ticket="{ status: 'active', name: 'Maxon', phone: '89108301252', amount: 12312 }" />
        </draggable>
      </div>

      <!-- Колонка 2: Активные -->
      <div class="column">
        <div class="column-header active">
          <h3>Активные</h3>
          <span class="count-badge">{{ activeItems.length }}</span>
        </div>
        <draggable
          v-model="activeItems"
          group="tickets"
          item-key="id"
          class="cards-container"
          @end="handleDragEnd"
        >
          <template #item="{ element }">
            <DragNDropCard :ticket="element" />
          </template>
        </draggable>
      </div>

      <!-- Колонка 3: На проверке -->
      <div class="column">
        <div class="column-header pending">
          <h3>На проверке</h3>
          <span class="count-badge">{{ pendingItems.length }}</span>
        </div>
        <draggable
          v-model="pendingItems"
          group="tickets"
          item-key="id"
          class="cards-container"
          @end="handleDragEnd"
        >
          <template #item="{ element }">
            <DragNDropCard :ticket="element" />
          </template>
        </draggable>
      </div>

      <!-- Колонка 4: Выполненные -->
      <div class="column">
        <div class="column-header completed">
          <h3>Выполненные</h3>
          <span class="count-badge">{{ completedItems.length }}</span>
        </div>
        <draggable
          v-model="completedItems"
          group="tickets"
          item-key="id"
          class="cards-container"
          @end="handleDragEnd"
        >
          <template #item="{ element }">
            <DragNDropCard :ticket="element" />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import DragNDropCard from '../components/drag-n-drop/DragNDropCard.vue'

// Исходные данные из скриншота
const newItems = ref([
  {
    id: 2,
    number: 2,
    contact: '3413123', // В исходнике здесь телефон вместо ФИО
    phone: '13123123',
    amount: '1 323 123 ₽',
    status: 'active'
  }
])

const activeItems = ref([])
const pendingItems = ref([])

const completedItems = ref([
  {
    id: 1,
    number: 1,
    name: 'Соколов М.Е.',
    phone: '423423',
    amount: '234 234 ₽',
    status: 'completed'
  }
])

const handleDragEnd = (event) => {
  console.log('Элемент перемещен:', event.draggedContext.element)
}
</script>

<style scoped>
.kanban-board {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
}

.board-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.columns-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.column {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

.column-header {
  padding: 16px;
  margin: -20px -20px 20px -20px;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.column-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0;
}

/* Цвета заголовков колонок */
.column-header.new {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.column-header.active {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.column-header.pending {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.column-header.completed {
  background: linear-gradient(135deg, #10b981, #059669);
}

.count-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  min-width: 32px;
  text-align: center;
}

.cards-container {
  flex: 1;
  min-height: 100px;
  padding: 8px;
  background: #fafafa;
  border-radius: 8px;
  border: 2px dashed #e5e7eb;
  transition: all 0.3s;
}

.cards-container:empty::before {
  content: 'Перетащите карточку сюда';
  display: block;
  text-align: center;
  color: #9ca3af;
  padding: 40px 20px;
  font-size: 14px;
}

.cards-container.drag-over {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

/* Адаптивность */
@media (max-width: 1400px) {
  .columns-container {
    grid-template-columns: repeat(4, 1fr);
  }

}

@media (max-width: 768px) {
  .columns-container {
    grid-template-columns: 1fr;
  }

  .search-container {
    flex-direction: column;
  }

  .status-select {
    flex: 1;
  }
}
</style>
