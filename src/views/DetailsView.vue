<template>
  <div>
    <h1>Item Detail</h1>
    <div v-if="item">
      <p><strong>Title:</strong> {{ item.title }}</p>
      <p><strong>Genre:</strong> {{ item.genre }}</p>
      <p><strong>Director:</strong> {{ item.director }}</p>
      <p><strong>Release Year:</strong> {{ item.releaseYear }}</p>
      <p><strong>Rating:</strong> {{ item.rating }}</p>
      <p><strong>Popular:</strong> {{ item.isPopular ? 'Yes' : 'No'}}</p>
      <button @click="editItem()">Edit</button>
      <button @click="confirmDelete()">Delete</button>
    </div>
    <div v-else>
      <p>Not found item</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type Item, useItemStore } from '../stores/item'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name: 'Details',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const itemStore = useItemStore()
    const item = ref<Item | null>(null)

    const fetchItem = async () => {
      const fetchedItem = await itemStore.fetchItem(route.params.id as string)
      item.value = fetchedItem
    }

    onMounted(fetchItem)

    const editItem = () => {
      if (item.value) {
        router.push(`/edit/${item.value.id}`)
      }
    }

    const deleteItem = () => {
      if (item.value) {
        itemStore.removeItem(item.value.id)
        router.push('/home')
      }
    }

    const confirmDelete = () => {
      if (window.confirm('Are you sure you want to delete this item?')) {
        deleteItem()
      }
    }

    return {
      item,
      editItem,
      confirmDelete
    }
  }
})
</script>
