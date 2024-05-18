<!-- <template>
  <div>
    <h1>Edit Item</h1>
    <form @submit.prevent="editItem">
      <input v-model="title" placeholder="Movie Title" required />
      <input v-model="genre" placeholder="Genre" required />
      <input v-model="director" placeholder="Director" required />
      <input v-model="releaseYear" placeholder="Release Year" type="number" required />
      <input v-model="rating" placeholder="Rating" type="number" step="0.1" required />
      <label>
        Popular:
        <input v-model="isPopular" type="checkbox" />
      </label>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '../stores/item'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Edit',
  setup() {
    const itemStore = useItemStore()
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id as string

    const title = ref('')
    const genre = ref('')
    const director = ref('')
    const releaseYear = ref<number | null>(null)
    const rating = ref<number | null>(null)
    const isPopular = ref(false)

    const updateStatus = ref<'idle' | 'success' | 'error'>('idle')

    // Fetch item data when the component is mounted
    const fetchItem = async () => {
      const fetchedItem = await itemStore.fetchItem(id)
      if (fetchedItem) {
        title.value = fetchedItem.title
        genre.value = fetchedItem.genre
        director.value = fetchedItem.director
        releaseYear.value = fetchedItem.releaseYear
        rating.value = fetchedItem.rating
        isPopular.value = fetchedItem.isPopular
      }
    }

    // Call fetchItem when the component is mounted
    onMounted(fetchItem)

    const editItem = async () => {
      try {
        // Edit item using the updated values from the form
        await itemStore.editItem({
          id,
          title: title.value,
          genre: genre.value,
          director: director.value,
          releaseYear: releaseYear.value!,
          rating: rating.value!,
          isPopular: isPopular.value
        })
        updateStatus.value = 'success'
        router.push(`/details/${id}`)
      } catch (error) {
        updateStatus.value = 'error'
      }
    }

    return {
      title,
      genre,
      director,
      releaseYear,
      rating,
      isPopular,
      editItem,
      updateStatus
    }
  }
})
</script> -->

<template>
  <Form :isEdit="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Form from '../components/Form.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Edit',
  components: {
    Form
  }
})
</script>
