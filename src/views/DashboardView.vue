<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container :class="['py-0 fill-height', 'prevent_overflow']">
        <v-app-bar-nav-icon width="40" height="40">
          <v-icon>mdi-account</v-icon>
        </v-app-bar-nav-icon>
        <v-col cols="auto">
          <v-tool-bar-title style="font-size: 14px">
            22-12351233{{ userdata.username }}
          </v-tool-bar-title>
        </v-col>
        <v-btn
          v-for="link in links"
          :key="link"
          text
          :class="{ selected: section == link }"
          @click.stop="dbswitch(link)"
        >
          {{ link }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3 ma-0 pa-0">
      <boardView
        v-if="section != 'profile'"
        :curr_info="{ ...curr_info }"
        :section="section"
        :detailprop="detail"
        :infos="infos"
        @sync_detail="
          (d) => {
            detail = d;
          }
        "
        @modify_info="modify_info"
        @delete_info="delete_info"
        @create_info="create_info"
        @get_detail="get_detail"
        @logout="logout"
      />
      <profileView v-else :curr_info="{ ...curr_info }" :userdata="userdata" />
    </v-main>
  </v-app>
</template>

<script>
import profileView from "./profileView.vue";
import boardView from "./boardView.vue";
export default {
  components: {
    boardView,
    profileView,
  },
  data() {
    return {
      userdata: { ...this.$route.params },
      detail: false,
      section: "issue",
      curr_info: null,
      links: ["issue", "notice", "standard", "application", "profile"],
      infos: {
        issue: [
          {
            id: "BSUds+6TLZ8Jqwa",
            type: "issue",
            subject: "멀리뛰기",
            issuer_id: "supervisor",
            mandatory: 1,
            created_at: "2022-10-19T11:14:00.000Z",
            updated_at: "2022-10-19T11:14:00.000Z",
          },
          {
            id: "BSUds+6TLZ8Jqwb",
            type: "issue2",
            subject: "높이뛰기",
            issuer_id: "supervisor",
            mandatory: 1,
            created_at: "2022-10-19T11:14:00.000Z",
            updated_at: "2022-10-19T11:14:00.000Z",
          },
          {
            id: "BSUds+6TLZ8Jqwc",
            type: "issue2",
            subject: "높이뛰기",
            issuer_id: "supervisor",
            mandatory: 1,
            created_at: "2022-10-19T11:14:00.000Z",
            updated_at: "2022-10-19T11:14:00.000Z",
          },
        ],
        notice: [
          {
            id: "BSUds+6TLZ8Jqwa",
            type: "notices",
            subject: "멀리뛰기",
            issuer_id: "supervisor",
            mandatory: 1,
            created_at: "2022-10-19T11:14:00.000Z",
            updated_at: "2022-10-19T11:14:00.000Z",
          },
        ],
      },
    };
  },
  methods: {
    dbswitch(link) {
      this.curr_info = null;
      this.section = link;
      if (this.section == "profile") {
        this.get_detail(this.userdata.username);
      } else {
        this.get_info();
      }
      this.detail = false;
    },
    get_detail(id) {
      const url = `/${this.section}/`;
      this.$axios
        .get(url, {
          headers: {
            Authorization: this.userdata.token,
          },
          params: {
            Id: id,
          },
        })
        .then((response) => {
          this.curr_info = { ...response.data[this.section] };
          if ("standard" in response.data) {
            this.curr_info["standard"] = response.data.standard;
          }
          this.detail = true;
        })
        .catch((error) => {
          alert(error.response.message);
        });
      this.detail = true;
      this.curr_info = { id: "12-1234" };
    },
    create_info(newinfo) {
      this.$axios
        .post(
          `/${this.section}/regist`,
          { ...newinfo },
          {
            headers: {
              Authorization: this.userdata.token,
            },
          }
        )
        .then(() => {
          this.get_info();
        })
        .catch((error) => {
          alert(error.response.message + error.response.resultOfStandard);
          this.get_info();
        });
    },
    delete_info() {
      this.$axios
        .delete(`/${this.section}/`, {
          headers: {
            Authorization: this.userdata.token,
          },
          data: {
            Id: this.curr_info.id,
          },
        })
        .then(() => {
          this.get_info();
          this.curr_info = null;
        })
        .catch((error) => {
          alert(error.response.message);
          this.get_info();
          this.curr_info = null;
        });
      this.detail = false;
    },
    modify_info() {},
    logout() {
      this.$axios
        .post(
          "/auth/logout",
          {},
          {
            headers: {
              Authorization: this.userdata.token,
            },
          }
        )
        .then(() => {
          this.$router.replace("/");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    get_info() {
      this.$axios
        .get(`/${this.section}/`, {
          headers: {
            Authorization: this.userdata.token,
          },
        })
        .then((response) => {
          this.infos[this.section] = { ...response.data[this.section] };
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
  created() {
    console.log(this.userdata.token);
    console.log("created");
    this.get_info();
  },
};
</script>

<style lang="scss" scoped>
.expanding-search {
  font-size: 14px;
}
.selected {
  color: #3949ab;
}
.prevent_overflow {
  flex-wrap: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
