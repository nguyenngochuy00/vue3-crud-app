<template>
  <Form :isEdit="false"></Form>
</template>

<script lang="ts">
import Form from '../components/Form.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Create',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form
  }
})
</script>
