<template>
  <div id="app">
    <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/create">Create</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style scoped lang="scss">
$font-family: 'Avenir, Helvetica, Arial, sans-serif';
$color-primary: #42b983;
$color-text: #2c3e50;
$hover-bg-color: #42b983;
$hover-text-color: #fff;
$margin-top: 60px;
$padding: 20px;
$nav-margin-bottom: 30px;
$link-margin: 0 15px;
$link-padding: 10px 15px;
$border-radius: 5px;
$transition-duration: 0.3s;

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-text;
  margin-top: $margin-top;
  padding: $padding;

  nav {
    margin-bottom: $nav-margin-bottom;

    a {
      font-weight: bold;
      color: $color-primary;
      text-decoration: none;
      margin: $link-margin;
      padding: $link-padding;
      border-radius: $border-radius;
      transition:
        background-color $transition-duration,
        color $transition-duration;

      &:hover {
        background-color: $hover-bg-color;
        color: $hover-text-color;
      }

      &.router-link-exact-active {
        background-color: $hover-bg-color;
        color: $hover-text-color;
      }
    }
  }
}
</style>
