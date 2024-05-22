<template>
  <div class="form-container">
    <h1>HuyNN45</h1>
    <h1>{{ isEdit ? 'Edit Item' : 'Create Item' }}</h1>
    <form @submit.prevent="submitForm" class="item-form">
      <div class="form-group">
        <input v-model="title" placeholder="Title" type="text" class="form-input" />
        <ErrorMessage name="title" class="form-error" />
      </div>
      <div class="form-group">
        <input v-model="genre" placeholder="Genre" type="text" class="form-input" />
        <ErrorMessage name="genre" class="form-error" />
      </div>
      <div class="form-group">
        <input v-model="director" placeholder="Director" type="text" class="form-input" />
        <ErrorMessage name="director" class="form-error" />
      </div>
      <div class="form-group">
        <input v-model="releaseYear" placeholder="Release Year" type="number" class="form-input" />
        <ErrorMessage name="releaseYear" class="form-error" />
      </div>
      <div class="form-group">
        <input v-model="rating" placeholder="Rating" type="number" step="0.1" class="form-input" />
        <ErrorMessage name="rating" class="form-error" />
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useForm, useField, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name: 'Form',
  components: { ErrorMessage },
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
    const id = route.params.id as string
    const updateStatus = ref<'idle' | 'success' | 'error'>('idle')

    const schema = yup.object({
      title: yup.string().required('Title is required'),
      genre: yup.string().required('Genre is required'),
      director: yup.string().required('Director is required'),
      releaseYear: yup
        .number()
        .required('Release Year is required')
        .min(1888, 'Year must be after 1888')
        .max(new Date().getFullYear(), 'Year must be this year or earlier'),
      rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Rating must be at least 0')
        .max(10, 'Rating must be at most 10'),
      isPopular: yup.boolean()
    })

    const { handleSubmit, resetForm, errors } = useForm({
      validationSchema: schema,
      initialValues: {
        title: '',
        genre: '',
        director: '',
        releaseYear: 0,
        rating: 0,
        isPopular: false
      }
    })

    const { value: title } = useField('title')
    const { value: genre } = useField('genre')
    const { value: director } = useField('director')
    const { value: releaseYear } = useField('releaseYear')
    const { value: rating } = useField('rating')
    const { value: isPopular } = useField('isPopular')

    const fetchItem = async () => {
      if (props.isEdit) {
        const fetchedItem = await itemStore.fetchItem(id)
        if (fetchedItem) {
          resetForm({
            values: {
              title: fetchedItem.title,
              genre: fetchedItem.genre,
              director: fetchedItem.director,
              releaseYear: fetchedItem.releaseYear,
              rating: fetchedItem.rating,
              isPopular: fetchedItem.isPopular
            }
          })
        }
      }
    }

    onMounted(fetchItem)

    const submitForm = handleSubmit(async (values) => {
      if (props.isEdit) {
        try {
          await itemStore.editItem({ id, ...values })
          updateStatus.value = 'success'
          router.push(`/details/${id}`)
        } catch (error) {
          updateStatus.value = 'error'
        }
      } else {
        await itemStore.createItem(values)
        resetForm()
        router.push('/home')
      }
    })

    return {
      title,
      genre,
      director,
      releaseYear,
      rating,
      isPopular,
      submitForm,
      errors
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

      .form-error {
        color: #ff0000;
        font-size: 12px;
        margin-top: 5px;
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
