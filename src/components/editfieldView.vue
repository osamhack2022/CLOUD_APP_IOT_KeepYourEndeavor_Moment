<template>
  <p v-if="!edit">{{ value }}</p>
  <v-text-field
    v-else
    color="#3F51B5"
    :label="label"
    :prepend-inner-icon="icon"
    v-model="retval"
    required
    :rules="rules"
  ></v-text-field>
</template>

<script>
export default {
  name: "editfieldView",
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
    rules: {
      type: Array,
    },
  },
  computed: {
    retval: {
      get() {
        return this.value;
      },
      set() {
        this.$emit("change", this.retval);
        console.log(this.retval);
      },
    },
  },
};
</script>

<style></style>
