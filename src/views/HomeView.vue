<template>
  <h1>Items List</h1>
  <ol>
    <li v-for="item in items" :key="item.id">
      <p><strong>Title:</strong> {{ item.title }}</p>
      <p><strong>Genre:</strong> {{ item.genre }}</p>
      <p><strong>Director:</strong> {{ item.director }}</p>
      <router-link :to="`/details/${item.id}`">Detail</router-link>
    </li>
  </ol>
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
