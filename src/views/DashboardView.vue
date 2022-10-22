<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-app-bar-nav-icon width="40" height="40">
          <v-icon>mdi-account</v-icon>
        </v-app-bar-nav-icon>
        <v-col cols="1">
          <v-tool-bar-title style="font-size: 14px">
            22-12351233{{ userdata.username }}
          </v-tool-bar-title>
        </v-col>

        <v-btn
          v-for="link in links"
          :key="link"
          text
          :class="{ selected: section == link }"
          @click.stop="section = link"
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
      <v-container>
        <v-row>
          <v-col cols="auto">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-if="detail == false">
                  <popup-view
                    @submit="create_issue"
                    :user="userdata.username"
                  />
                </v-list-item>
                <v-list-item v-if="detail == true">
                  <v-btn icon width="40" height="40" @click="modify_issue">
                    <v-icon>mdi-file-edit</v-icon>
                  </v-btn>
                </v-list-item>
                <v-list-item v-if="detail == true">
                  <v-btn icon width="40" height="40" @click="delete_issue">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item>
                  <v-btn icon width="40" height="40" @click="logout">
                    <v-icon>mdi-logout</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-row v-if="detail == false">
              <v-col v-for="info in infos[section]" :key="info.id" cols="12">
                <dashboardCardView
                  :info="info"
                  :icons="icons"
                  @cardclicked="get_detail(info)"
                />
              </v-col>
              <v-col v-if="section == 'profile'">
                <SignUpView />
              </v-col>
            </v-row>
            <DetailsView v-else :info="curr_issue" :icons="icons" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import dashboardCardView from "../components/dashboardCardView.vue";
import popupView from "../components/popupView.vue";
import DetailsView from "../components/DetailsView.vue";
import SignUpView from "./SignUpView.vue";
export default {
  components: {
    dashboardCardView,
    popupView,
    DetailsView,
    SignUpView,
  },
  data() {
    return {
      userdata: { ...this.$route.params },
      detail: false,
      section: "issue",
      curr_info: null,
      links: ["issue", "notice", "standard", "application", "profile"],
      icons: [
        "mdi-music-accidental-sharp",
        "mdi-format-title",
        "mdi-account",
        "mdi-receipt-text-check",
        "mdi-calendar",
        "mdi-calendar",
        "mdi-calendar",
      ],
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
    get_detail(info) {
      const url = "/${this.section}/";
      this.$axios
        .get(url, {
          headers: {
            Authorization: this.userdata.token,
          },
          params: {
            issueId: info.id,
          },
        })
        .then((response) => {
          this.curr_info = response.data.issues;
          this.curr_info["standard"] = response.data.standard;
          this.detail = true;
        })
        .catch((error) => {
          alert(error.response.message);
        });
      this.detail = true;
      this.curr_info = info;
      this.curr_info["standard"] = {
        "2급": "13:55",
        "3급": "15:00",
        특: "13:10",
        "1급": "13:30",
      };
    },
    create_issue(newissue) {
      this.$axios
        .post(
          "/issue/regist",
          {},
          {
            headers: {
              Authorization: this.userdata.token,
            },
            data: { ...newissue },
          }
        )
        .catch((error) => {
          alert(error.response.message + error.response.resultOfStandard);
        });
      this.get_issue();
    },
    delete_issue() {
      this.$axios
        .delete("/issue/", {
          headers: {
            Authorization: this.userdata.token,
          },
          data: {
            issueId: this.curr_issue.id,
          },
        })
        .catch((error) => {
          alert(error.response.message);
        });
      this.get_issue();
      this.detail = false;
      this.curr_issue = null;
    },
    modify_issue() {},
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
    get_issue() {
      this.$axios
        .get("/issue/", {
          headers: {
            Authorization: this.userdata.token,
          },
        })
        .then((response) => {
          this.issue = { ...response.data.issues };
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
  created() {
    console.log(this.userdata.token);
    console.log("created");
    this.get_issue();
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
</style>
