import type { Item } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useItemStore = defineStore('itemStore', {
  state: () => {
    return {
      items: <Item[]>[],
      totalItems: 0
    }
  },
  actions: {
    async fetchItems() {
      try {
        const res = await axios.get('https://playground.mockoon.com/movies')
        this.items = res.data
      } catch (error) {
        console.error('Failed to fetch items', error)
      }
    },
    // async fetchItems(page: number, limit: number) {
    //   const response = await axios.get(
    //     `https://playground.mockoon.com/movies?page=${page}&limit=${limit}`
    //   )
    //   this.items = response.data
    //   this.totalItems = response.data
    // },
    async fetchItem(id: string) {
      try {
        const res = await axios.get<Item>(`https://playground.mockoon.com/movies/${id}`)
        return res.data
      } catch (error) {
        console.error('Failed to fetch item', error)
      }
    },
    async createItem(item: Omit<Item, 'id'>) {
      try {
        const res = await axios.post<Item>('https://playground.mockoon.com/movies', item)
        this.items.push(res.data)
      } catch (error) {
        console.error('Failed to create item', error)
      }
    },
    async editItem(updatedItem: Item) {
      try {
        const res = await axios.put<Item>(
          `https://playground.mockoon.com/movies/${updatedItem.id}`,
          updatedItem
        )
        const index = this.items.findIndex((item: any) => item.id === updatedItem.id)
        if (index !== -1) {
          this.items[index] = res.data
        }
      } catch (error) {
        console.error('Failed to edit item', error)
      }
    },
    async removeItem(id: string) {
      try {
        await axios.delete(`https://playground.mockoon.com/movies/${id}`)
        this.items = this.items.filter((item: any) => item.id !== id)
      } catch (error) {
        console.error('Failed to remove item', error)
      }
    }
  }
})
