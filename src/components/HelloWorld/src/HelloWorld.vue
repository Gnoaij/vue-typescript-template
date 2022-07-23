<script setup lang="ts"></script>

<template>
  <div class="hello-world">
    <h1>Hello World!</h1>
    <img src="@/assets/img/logo.svg" alt="Vue logo" />
  </div>
</template>

<style scoped lang="scss">
.hello-world {
  h1 {
    @include M.text-overflow(2);

    margin-top: 0;
  }

  img {
    width: 8rem;
    height: 8rem;
  }
}
</style>
