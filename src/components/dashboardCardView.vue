<template>
  <v-card @click="$emit('cardclicked')" flat rounded="lg" width="1000">
    <v-card-title>{{ info.title }}</v-card-title>
    <v-list>
      <template v-for="(v, k, i) in info">
        <v-list-item :key="k">
          <v-list-item-icon>
            <v-icon>{{ icons[i] }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ k }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ info[k] }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
    icons: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
