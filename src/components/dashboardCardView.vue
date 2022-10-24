<template>
  <v-card @click.stop="$emit('cardclicked')" flat rounded="lg">
    <v-card-title> Title {{ info.title }}</v-card-title>
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
  data: () => ({
    icons: [
      "mdi-music-accidental-sharp",
      "mdi-format-title",
      "mdi-account",
      "mdi-receipt-text-check",
      "mdi-calendar",
      "mdi-calendar",
      "mdi-calendar",
    ],
  }),
  props: {
    info: {
      type: Object,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
