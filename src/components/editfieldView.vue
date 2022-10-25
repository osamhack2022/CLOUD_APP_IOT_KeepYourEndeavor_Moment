<template>
  <div>
    <p v-if="!edit">{{ value }}</p>
    <slot v-else name="input_field"></slot>
  </div>
</template>

<script>
export default {
  name: "editfieldView",
  data() {
    return {};
  },
  props: {
    edit: {
      type: Boolean,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
};
</script>

<style></style>
