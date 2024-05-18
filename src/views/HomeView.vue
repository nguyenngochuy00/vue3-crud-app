<template>
  <h1>Items</h1>
  <ol>
    <li v-for="item in items" :key="item.id">
      <p><strong>Title:</strong> {{ item.title }}</p>
      <p><strong>Genre:</strong> {{ item.genre }}</p>
      <p><strong>Director:</strong> {{ item.director }}</p>
      <!-- <router-link :to="{ name: 'Edit', params: { id: item.id } }">Edit</router-link>
        <button @click="deleteItem(item.id)">Delete</button> -->
      <router-link :to="`/details/${item.id}`">Details</router-link>
      <!-- <router-link :to="{ name: 'Details', params: { id: item.id } }">Details</router-link> -->
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
  data() {
    return {}
  },
  setup() {
    const itemStore = useItemStore()

    onMounted(() => {
      itemStore.fetchItems()
    })
    const { items } = storeToRefs(itemStore)

    // const deleteItem = (id: number) => {
    //   itemStore.removeItem(id)
    // }

    // const navigateToDetails = () => {
    //   router.push('/:id')
    // }

    return {
      items
      // deleteItem
      // navigateToDetails
    }
  }
})
</script>
