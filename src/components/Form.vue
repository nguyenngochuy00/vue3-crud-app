<template>
  <div class="form-container">
    <h1>{{ isEdit ? 'Edit Item' : 'Create Item' }}</h1>
    <form @submit.prevent="handleSubmit" class="item-form">
      <div class="form-group">
        <input v-model="title" placeholder="Title" required class="form-input" />
      </div>
      <div class="form-group">
        <input v-model="genre" placeholder="Genre" required class="form-input" />
      </div>
      <div class="form-group">
        <input v-model="director" placeholder="Director" required class="form-input" />
      </div>
      <div class="form-group">
        <input
          v-model="releaseYear"
          placeholder="Release Year"
          type="number"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <input
          v-model="rating"
          placeholder="Rating"
          type="number"
          step="0.1"
          required
          class="form-input"
        />
      </div>
      <div class="form-group form-checkbox">
        <label>
          Popular:
          <input v-model="isPopular" type="checkbox" />
        </label>
      </div>
      <button type="submit" class="form-button">{{ isEdit ? 'Save' : 'Create' }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useItemStore } from '../stores/item'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
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

<style scoped lang="scss">
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;

  h1 {
    text-align: center;
    color: #42b983;
    margin-bottom: 20px;
  }

  .item-form {
    display: flex;
    flex-direction: column;

    .form-group {
      margin-bottom: 15px;

      .form-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        font-size: 16px;
        transition: border-color 0.3s;

        &:focus {
          border-color: #42b983;
          outline: none;
        }
      }
    }

    .form-checkbox {
      display: flex;
      align-items: center;

      label {
        font-size: 16px;
        color: #333;
      }

      input[type='checkbox'] {
        margin-left: 10px;
        width: 20px;
        height: 20px;
      }
    }

    .form-button {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      background-color: #42b983;
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #369d77;
      }
    }
  }
}

@media (max-width: 768px) {
  .form-container {
    margin: 20px;
    padding: 15px;
  }
}
</style>
