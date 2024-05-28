<template>
  <div class="user">
    <h1>HuyNN45</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'User'
}
</script>

<style scoped lang="scss">
$primary-color: #42b983;
$background-color: #fff;
$box-shadow: rgba(0, 0, 0, 0.1);
$border-radius: 10px;
$margin: 20px;
$padding: 20px;
$max-width: 100%;
$width: 100vw;
$h1-margin-bottom: 20px;

.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: $margin auto;
  padding: $padding;
  background-color: $background-color;
  box-shadow: 0 2px 10px $box-shadow;
  border-radius: $border-radius;
  width: $width;
  max-width: $max-width;
  box-sizing: border-box;

  h1 {
    color: $primary-color;
    margin-bottom: $h1-margin-bottom;
  }
}
</style>
