<template>
  <v-container>
    <v-row justify="center" class="prevent_overflow">
      <v-col cols="auto">
        <v-sheet rounded="lg">
          <v-list color="transparent">
            <v-list-item v-if="detail == false">
              <popup-view
                :section="section"
                @create_info="
                  (i) => {
                    $emit('create_info', i);
                  }
                "
              />
            </v-list-item>
            <v-list-item v-if="detail == true && edit == false">
              <v-btn icon width="40" height="40" @click.stop="edit = true">
                <v-icon>mdi-file-edit</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item v-if="detail == true && edit == true">
              <v-btn
                icon
                width="40"
                height="40"
                @click.stop="(obj) => modify({ ...obj })"
              >
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item v-if="detail == true">
              <v-btn icon width="40" height="40" @click="$emit('delete_info')">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <v-btn icon width="40" height="40" @click="$emit('logout')">
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col>
        <v-row v-if="detail == false">
          <template v-for="info in infos[section]">
            <v-col :key="info.id" cols="12" xs="12" sm="12" md="6" lg="6">
              <dashboardCardView
                :info="info"
                :section="section"
                @cardclicked="[$emit('get_detail', info.id), (edit = false)]"
              />
            </v-col>
          </template>
        </v-row>
        <DetailsView
          v-if="detail == true"
          :info="curr_info"
          :section="section"
          :edit="edit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dashboardCardView from "../components/dashboardCardView.vue";
import popupView from "../components/popupView.vue";
import DetailsView from "../components/DetailsView.vue";
export default {
  components: {
    dashboardCardView,
    popupView,
    DetailsView,
  },
  data: () => ({
    edit: false,
  }),
  props: {
    curr_info: {
      type: Object,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    detailprop: {
      type: Boolean,
      required: true,
    },
    infos: {
      type: Object,
      required: true,
    },
  },
  methods: {
    modify(obj) {
      this.$axios.post(
        "url",
        { ...obj },
        {
          headers: {},
        }
      );
      this.edit = false;
    },
  },
  computed: {
    detail: {
      get() {
        return this.detailprop;
      },
      set() {
        this.$emit("sync_detail", this.detail);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.prevent_overflow {
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>
