<template>
  <div class="table-responsive">
    <h1>Items List</h1>
    <table>
      <thead>
        <tr>
          <td>#</td>
          <th>Title</th>
          <th>Genre</th>
          <th>Director</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <!-- <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td> -->
          <td>{{ item.title }}</td>
          <td>{{ item.genre }}</td>
          <td>{{ item.director }}</td>
          <td>
            <router-link :to="`/details/${item.id}`" class="actions">Detail</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Previous Page</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next Page</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useItemStore } from '../stores/item'
import { storeToRefs } from 'pinia'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  setup() {
    const itemStore = useItemStore()
    const { items, totalItems } = storeToRefs(itemStore)

    const currentPage = ref(1)
    const itemsPerPage = 10 // Set your items per page limit

    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

    const fetchItems = async () => {
      // await itemStore.fetchItems(currentPage.value, itemsPerPage)
      await itemStore.fetchItems()
    }

    const prevPage = async () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1
        await fetchItems()
      }
    }

    const nextPage = async () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1
        await fetchItems()
      }
    }

    onMounted(fetchItems)

    return {
      items,
      currentPage,
      totalPages,
      prevPage,
      nextPage
    }
  }
})
</script>

<style scoped lang="scss">
$primary-color: #42b983;
$text-color: #2c3e50;
$background-color: #fff;
$hover-background-color: #f1f1f1;
$alternate-background-color: #f9f9f9;
$shadow-color: rgba(0, 0, 0, 0.1);
$border-color: #ddd;
$font-size-small: 1.5rem;
$padding: 12px 15px;
$small-padding: 6px 8px;
$margin-bottom: 20px;

h1 {
  margin-bottom: $margin-bottom;
  color: $primary-color;

  @media (max-width: 600px) {
    font-size: $font-size-small;
  }
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
  margin-bottom: $margin-bottom;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  background-color: $background-color;
  box-shadow: 0 4px 8px $shadow-color;
  border-radius: 5px;
  overflow: hidden;

  thead {
    background-color: $primary-color;
    color: #fff;
  }

  th,
  td {
    padding: $padding;
    text-align: left;
    border-bottom: 1px solid $border-color;
    vertical-align: middle;

    @media (max-width: 600px) {
      padding: $small-padding;
    }
  }

  th {
    font-weight: bold;
  }

  tbody > tr:hover {
    background-color: $hover-background-color;
  }

  tr:nth-child(even) {
    background-color: $alternate-background-color;
  }
}

.actions {
  color: $primary-color;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: $text-color;
  }
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    background-color: #42b983;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:disabled {
      background-color: #ddd;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: darken(#42b983, 10%);
    }
  }
}
</style>
