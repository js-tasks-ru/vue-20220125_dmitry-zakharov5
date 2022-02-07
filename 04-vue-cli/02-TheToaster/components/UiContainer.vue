<template>
  <div class="container">
    <slot>Тут должен быть текст</slot>
  </div>
</template>

<script>
export default {
  name: 'UiContainer',
};
</script>

<style scoped>
.container {
  display: flex;
}
</style>