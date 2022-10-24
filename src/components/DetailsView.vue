<template>
  <v-row>
    <v-col cols="8">
      <v-card flat rounded="lg">
        <v-card-title>
          {{ info.id }}
        </v-card-title>
        <v-list>
          <template v-for="(v, k, i) in info">
            <v-list-item :key="k">
              <v-list-item-icon>
                <v-icon>{{ icons[i] }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <editfieldView
                  :label="k"
                  :edit="edit"
                  :value="info[k]"
                  @change="
                    (i) => {
                      info_edited[k] = i;
                    }
                  "
                />
                <p>{{ info_edited[k] }}</p>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card flat rounded="lg">
        <v-card-title>participations</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import editfieldView from "./editfieldView.vue";
export default {
  name: "detailsView",
  components: { editfieldView },
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
    edit: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    info_edited: {
      get() {
        return { ...this.info };
      },
    },
  },
  methods: {
    save() {},
  },
};
</script>

<style></style>
