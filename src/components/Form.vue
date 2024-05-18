<template>
  <div>
    <h1>{{ isEdit ? 'Edit Item' : 'Create Item' }}</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="title" placeholder="Movie Title" required />
      <input v-model="genre" placeholder="Genre" required />
      <input v-model="director" placeholder="Director" required />
      <input v-model="releaseYear" placeholder="Release Year" type="number" required />
      <input v-model="rating" placeholder="Rating" type="number" step="0.1" required />
      <label>
        Popular:
        <input v-model="isPopular" type="checkbox" />
      </label>
      <button type="submit">{{ isEdit ? 'Save' : 'Create' }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useItemStore } from '../stores/item'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Form',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const itemStore = useItemStore()
    const router = useRouter()
    const route = useRoute()
    const title = ref('')
    const genre = ref('')
    const director = ref('')
    const releaseYear = ref<number | null>(null)
    const rating = ref<number | null>(null)
    const isPopular = ref(false)

    const id = route.params.id as string
    const updateStatus = ref<'idle' | 'success' | 'error'>('idle')

    const fetchItem = async () => {
      if (props.isEdit) {
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
    }

    onMounted(fetchItem)

    const handleSubmit = async () => {
      if (props.isEdit) {
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
      } else {
        await itemStore.createItem({
          title: title.value,
          genre: genre.value,
          director: director.value,
          releaseYear: releaseYear.value!,
          rating: rating.value!,
          isPopular: isPopular.value
        })
        title.value = ''
        genre.value = ''
        director.value = ''
        releaseYear.value = 0
        rating.value = 0
        isPopular.value = false
        router.push('/home')
      }
    }

    return {
      title,
      genre,
      director,
      releaseYear,
      rating,
      isPopular,
      handleSubmit
    }
  }
})
</script>
