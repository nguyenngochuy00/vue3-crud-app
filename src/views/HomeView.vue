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
          <td>{{ item.title }}</td>
          <td>{{ item.genre }}</td>
          <td>{{ item.director }}</td>
          <td>
            <router-link :to="`/details/${item.id}`" class="actions">Detail</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useItemStore } from '../stores/item'
import { storeToRefs } from 'pinia'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  setup() {
    const itemStore = useItemStore()

    const fetchItem = () => {
      itemStore.fetchItems()
    }

    onMounted(fetchItem)

    const { items } = storeToRefs(itemStore)

    return {
      items
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
</style>
