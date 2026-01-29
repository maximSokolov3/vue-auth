<template>
  <div class="card relative mt-16 max-w-5xl mx-auto">
    <h1 class="card-title text-lg leading-tight sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
      {{ title }}
      <slot name="header" />
    </h1>

    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style scoped></style>
