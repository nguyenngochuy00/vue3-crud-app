<template>
  <div class="details-container">
    <h1>Item Detail</h1>
    <div v-if="item" class="item-details">
      <p><strong>Title:</strong> {{ item.title }}</p>
      <p><strong>Genre:</strong> {{ item.genre }}</p>
      <p><strong>Director:</strong> {{ item.director }}</p>
      <p><strong>Release Year:</strong> {{ item.releaseYear }}</p>
      <p><strong>Rating:</strong> {{ item.rating }}</p>
      <p><strong>Popular:</strong> {{ item.isPopular ? 'Yes' : 'No' }}</p>
      <div class="buttons">
        <button @click="editItem()" class="btn btn-edit">Edit</button>
        <button @click="confirmDelete()" class="btn btn-delete">Delete</button>
      </div>
    </div>
    <div v-else>
      <p>Item not found</p>
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

<style scoped lang="scss">
.details-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    color: #42b983;
    margin-bottom: 20px;
  }

  .item-details {
    p {
      font-size: 16px;
      margin: 10px 0;

      strong {
        color: #333;
      }
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;

        &-edit {
          background-color: #42b983;
          color: #fff;

          &:hover {
            background-color: #369d77;
          }
        }

        &-delete {
          background-color: #ff4b5c;
          color: #fff;

          &:hover {
            background-color: #e04150;
          }
        }
      }
    }
  }

  p {
    text-align: center;
    color: #42b983;
  }
}

@media (max-width: 768px) {
  .details-container {
    margin: 20px;
    padding: 15px;
  }

  .item-details {
    p {
      font-size: 14px;
    }

    .buttons {
      flex-direction: column;

      .btn {
        width: 100%;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
