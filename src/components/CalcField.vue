<script setup lang="ts">
import { useSlots } from 'vue'

defineSlots<{
  heading?: () => any
  default: () => any
}>()

const slots = useSlots()
</script>

<template>
  <div class="mcw-calc-field">
    <h2 v-if="slots.heading" class="cdx-label m-0 text-lg">
      <span class="cdx-label__label__text">
        <slot name="heading">Calculator</slot>
      </span>
    </h2>

    <slot />
  </div>
</template>

<style>
.mcw-calc-field {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 1em;
}

.dark .mcw-calc-field {
  border-color: #595959;
}
</style>
