<template>
  <Form :isEdit="true"></Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Form from '../components/Form.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Edit',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form
  }
})
</script>
