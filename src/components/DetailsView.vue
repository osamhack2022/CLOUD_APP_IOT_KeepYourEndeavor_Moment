<template>
  <v-row>
    <v-col>
      <v-card flat rounded="lg">
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
    </v-col>
    <v-col>
      <v-card flat rounded="lg">
        <v-card-title>participations</v-card-title>
      </v-card>
    </v-col>
  </v-row>
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
