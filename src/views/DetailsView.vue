<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>{{ testinfo.title }}</v-card-title>
        <v-list>
          <template v-for="(v, k, i) in testinfo">
            <v-list-item :key="k">
              <v-list-item-icon>
                <v-icon>{{ testsicons[i] }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ k }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ testinfo[k] }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>participations</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    testinfo: {
      type: Object,
      required: true,
    },
    testsicons: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
