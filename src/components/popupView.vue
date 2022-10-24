<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon width="40" height="40" v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add {{ section }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="Object.keys(standard || {})"
                  label="Type"
                  v-model="test.type"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="standard === null ? [] : standard[test.type]"
                  label="Subject"
                  v-model="test.subject"
                  required
                ></v-select>
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="test.mandatory"
                  label="madatory"
                  color="indigo"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click.stop="[(dialog = false), reset()]"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click.stop="[(dialog = false), submit()]"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const initialData = () => ({
  dialog: false,
  menu: false,
  test: { mandatory: false },
  standard: null,
});
export default {
  name: "popupView",
  data: () => initialData(),
  props: {
    section: String,
  },
  methods: {
    submit() {
      this.$emit("create_info", { ...this.test });
      this.reset();
    },
    reset: function () {
      Object.assign(this.$data, initialData());
    },
    get_standard() {
      this.$axios
        .post("/standard", {
          headers: {
            Authorization: this.userdata.token,
          },
        })
        .then((response) => {
          this.standard = response.data.standards;
        })
        .catch(() => null);
      this.get_issue();
    },
  },
  mounted() {
    this.reset();
  },
};
</script>
<style></style>
