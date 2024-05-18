<!-- <template>
  <div>
    <h1>Create Item</h1>
    <form @submit.prevent="createItem">
      <input v-model="title" placeholder="Movie Title" required />
      <input v-model="genre" placeholder="Genre" required />
      <input v-model="director" placeholder="Director" required />
      <input v-model="releaseYear" placeholder="Release Year" type="number" required />
      <input v-model="rating" placeholder="Rating" type="number" step="0.1" required />
      <label>
        Popular:
        <input v-model="isPopular" type="checkbox" />
      </label>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '../stores/item'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Create',
  setup() {
    const itemStore = useItemStore()
    const router = useRouter()
    const title = ref('')
    const genre = ref('')
    const director = ref('')
    const releaseYear = ref<number | null>(null)
    const rating = ref<number | null>(null)
    const isPopular = ref(false)

    const createItem = async (event: any) => {
      event.preventDefault()
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

    return {
      title,
      genre,
      director,
      releaseYear,
      rating,
      isPopular,
      createItem
    }
  }
})
</script> -->

<template>
  <Form :isEdit="false" />
</template>

<script lang="ts">
import Form from '../components/Form.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Create',
  components: {
    Form
  }
})
</script>
