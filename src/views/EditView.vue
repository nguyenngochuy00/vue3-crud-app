<template>
  <div>
    <Form :isEdit="true" @submitForm="handleFormSubmit"></Form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Form from '../components/Form.vue'
import { useItemStore } from '../stores/item'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Edit',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form
  },
  setup() {
    const itemStore = useItemStore()
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id as string

    const handleFormSubmit = async ({ values }: any) => {
      try {
        await itemStore.editItem({ id, ...values })
        router.push(`/details/${id}`)
      } catch (error) {
        console.error('Failed to update item', error)
      }
    }

    return {
      handleFormSubmit
    }
  }
})
</script>
