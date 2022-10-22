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
      <v-container>
        <v-row justify="center" class="prevent_overflow">
          <v-col cols="auto">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-if="detail == false">
                  <popup-view
                    @submit="create_issue"
                    :user="userdata.username"
                    :section="section"
                  />
                </v-list-item>
                <v-list-item v-if="detail == true">
                  <v-btn icon width="40" height="40" @click="modify_info">
                    <v-icon>mdi-file-edit</v-icon>
                  </v-btn>
                </v-list-item>
                <v-list-item v-if="detail == true">
                  <v-btn icon width="40" height="40" @click="delete_info">
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

          <v-col cols="auto">
            <v-row v-if="detail == false">
              <v-col v-for="info in infos[section]" :key="info.id">
                <dashboardCardView
                  :info="info"
                  :icons="icons"
                  @cardclicked="get_detail(info.id)"
                />
              </v-col>
            </v-row>
            <v-row v-if="section == 'profile'" justify="center">
              <v-col cols="auto">
                <v-card flat style="width: 600px" rounded="lg">
                  <profileFormView
                    :readonly="profile_readonly"
                    :password="!profile_readonly"
                    :userInfo="{ ...curr_info }"
                  >
                    <template v-slot:button="{ submit }">
                      <v-btn
                        v-if="profile_readonly"
                        block
                        outlined
                        color="indigo"
                        @click.stop="profile_readonly = false"
                      >
                        Edit
                      </v-btn>
                      <v-btn
                        v-else
                        block
                        outlined
                        color="indigo"
                        @click.stop="profile_readonly = submit()"
                      >
                        Submit
                      </v-btn>
                    </template>
                  </profileFormView>
                </v-card>
              </v-col>
            </v-row>
            <DetailsView
              v-if="detail == true"
              :info="curr_info"
              :icons="icons"
            />
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
import profileFormView from "../components/profileFormView.vue";
export default {
  components: {
    dashboardCardView,
    popupView,
    DetailsView,
    profileFormView,
  },
  data() {
    return {
      userdata: { ...this.$route.params },
      detail: false,
      section: "issue",
      curr_info: null,
      links: ["issue", "notice", "standard", "application", "profile"],
      profile_readonly: true,
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
    create_issue(newissue) {
      this.$axios
        .post(
          `/${this.section}/regist`,
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
      this.get_info();
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
        .catch((error) => {
          alert(error.response.message);
        });
      this.get_info();
      this.detail = false;
      this.curr_info = null;
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
  overflow-x: auto;
}
</style>
