<template>
  <div>
    <Form :isEdit="false" @submitForm="handleFormSubmit"></Form>
  </div>
</template>

<script lang="ts">
import Form from '../components/Form.vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '../stores/item'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Create',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form
  },
  setup() {
    const itemStore = useItemStore()
    const router = useRouter()

    const handleFormSubmit = async ({ values }) => {
      try {
        await itemStore.createItem(values)
        router.push('/home')
      } catch (error) {
        console.error('Failed to create item', error)
      }
    }

    return {
      handleFormSubmit
    }
  }
})
</script>
