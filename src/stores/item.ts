import type { Item } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useItemStore = defineStore('itemStore', {
  state: () => {
    return {
      items: <Item[]>[]
    }
  },
  actions: {
    async fetchItems() {
      const response = await axios.get('https://playground.mockoon.com/movies')
      this.items = response.data
    },
    async fetchItem(id: string) {
      const response = await axios.get<Item>(`https://playground.mockoon.com/movies/${id}`)
      return response.data
    },
    async createItem(item: Omit<Item, 'id'>) {
      const response = await axios.post<Item>('https://playground.mockoon.com/movies', item)
      this.items.push(response.data)
    },
    async editItem(updatedItem: Item) {
      const response = await axios.put<Item>(
        `https://playground.mockoon.com/movies/${updatedItem.id}`,
        updatedItem
      )
      const index = this.items.findIndex((item: any) => item.id === updatedItem.id)
      if (index !== -1) {
        this.items[index] = response.data
      }
    },
    async removeItem(id: string) {
      await axios.delete(`https://playground.mockoon.com/movies/${id}`)
      this.items = this.items.filter((item: any) => item.id !== id)
    }
  }
})
