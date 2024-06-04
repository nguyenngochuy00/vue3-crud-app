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
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>
            <router-link :to="`/details/${item.id}`" class="title">{{ item.title }}</router-link>
          </td>
          <td>{{ item.genre }}</td>
          <td>{{ item.director }}</td>
          <td>
            <button @click="editItem(item.id)" class="actions edit">Edit</button>
            <button @click="confirmDelete(item.id)" class="actions delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Previous Page</button>
      <div class="items-per-page">
        <label for="itemsPerPage">Items per page:</label>
        <select id="itemsPerPage" v-model="itemsPerPage" @change="fetchItems">
          <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <button @click="nextPage" :disabled="currentPage >= totalPages">Next Page</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useItemStore } from '../stores/item'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  setup() {
    const router = useRouter()
    const itemStore = useItemStore()
    const { items, totalItems } = storeToRefs(itemStore)

    const currentPage = ref(1)
    const itemsPerPageOptions = [10, 20, 50]
    const itemsPerPage = ref(10) // Default to 10 items per page
    const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

    const fetchItems = async () => {
      await itemStore.fetchItems(currentPage.value, itemsPerPage.value)
    }

    const prevPage = async () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1
        await fetchItems()
      }
    }

    const nextPage = async () => {
      currentPage.value += 1
      await fetchItems()
    }

    const editItem = (id: number) => {
      try {
        router.push(`/edit/${id}`)
      } catch (error) {
        console.error('Failed to edit item', error)
      }
    }

    const deleteItem = async (id: number) => {
      try {
        await itemStore.removeItem(id)
        await fetchItems()
      } catch (error) {
        console.error('Failed to delete item', error)
      }
    }

    const confirmDelete = async (id: number) => {
      try {
        if (window.confirm('Are you sure you want to delete this item?')) {
          await deleteItem(id)
        }
      } catch (error) {
        console.error('Failed to confirm delete', error)
      }
    }

    onMounted(fetchItems)

    return {
      items,
      editItem,
      confirmDelete,
      currentPage,
      itemsPerPage,
      totalPages,
      prevPage,
      nextPage,
      itemsPerPageOptions,
      fetchItems
    }
  }
})
</script>

<style scoped lang="scss">
$primary-color: #42b983;
$danger-color: #e74c3c;
$success-color: #42b983;
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
  padding: $small-padding;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;

  &.edit {
    background-color: $success-color;
    color: #fff;
    margin-right: 5px;

    &:hover {
      background-color: darken($success-color, 10%);
    }
  }

  &.delete {
    background-color: $danger-color;
    color: #fff;

    &:hover {
      background-color: darken($danger-color, 10%);
    }
  }
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .items-per-page {
    label {
      margin-right: 10px;
    }

    select {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid $border-color;
    }
  }

  button {
    background-color: #42b983;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    border-radius: 5px;

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
