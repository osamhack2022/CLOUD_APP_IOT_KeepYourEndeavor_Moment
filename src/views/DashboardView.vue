<template>
  <div class="indigo lighten-5">
    <v-app-bar color="indigo" dark outlined flat>
      <v-toolbar-title>Moment</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-col cols="12" sm="4" md="2">
        <v-text-field
          class="expanding-search mt-6"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          dense
          filled
        ></v-text-field>
      </v-col>
      <v-btn icon width="40" height="40">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <popup-view
        @submit="create_issue"
        :user="userdata.username"
        v-if="detail == false"
      />
      <div v-else>
        <v-btn icon width="40" height="40" @click="modify_issue">
          <v-icon>mdi-file-edit</v-icon>
        </v-btn>
        <v-btn icon width="40" height="40" @click="delete_issue">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </div>

      <v-divider class="mx-4" vertical></v-divider>

      <div class="mr-2" style="display: flex; align-items: center">
        <v-app-bar-nav-icon width="40" height="40">
          <v-menu bottom right :offset-y="true">
            <template v-slot:activator="{ on, attrs }">
              <v-btn width="40" height="40" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-account-details</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="logout">
                <v-list-item-title>LogOut</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar-nav-icon>
        <span style="text-justify: center; font-size: 16px; float: right">
          {{ userdata.username }}
        </span>
      </div>
    </v-app-bar>

    <v-main>
      <v-container class="py-8 px-6" fluid fill-height>
        <v-row v-if="detail == false">
          <v-col v-for="issue in issues" :key="issue.id" cols="12">
            <dashboardCardView
              :testinfo="issue"
              :testsicons="testsicons"
              @cardclicked="get_detail_issue(issue)"
            />
          </v-col>
        </v-row>
        <DetailsView v-else :testinfo="curr_issue" :testsicons="testsicons" />
      </v-container>
    </v-main>
  </div>
</template>
<script>
import dashboardCardView from "../components/dashboardCardView.vue";
import popupView from "../components/popupView.vue";
import DetailsView from "./DetailsView.vue";
export default {
  components: {
    dashboardCardView,
    popupView,
    DetailsView,
  },
  data() {
    return {
      userdata: { ...this.$route.params },
      detail: false,
      curr_issue: null,
      testsicons: [
        "mdi-music-accidental-sharp",
        "mdi-format-title",
        "mdi-account",
        "mdi-receipt-text-check",
        "mdi-calendar",
        "mdi-calendar",
        "mdi-calendar",
      ],
      issues: [
        {
          id: "BSUds+6TLZ8Jqwa",
          type: "측정시험",
          subject: "멀리뛰기",
          issuer_id: "supervisor",
          mandatory: 1,
          created_at: "2022-10-19T11:14:00.000Z",
          updated_at: "2022-10-19T11:14:00.000Z",
        },
      ],
    };
  },
  methods: {
    get_detail_issue(issue) {
      this.$axios
        .get("/issue/", {
          headers: {
            Authorization: this.userdata.token,
          },
          params: {
            issueId: issue.id,
          },
        })
        .then((response) => {
          this.curr_issue = response.data.issues;
          this.curr_issue["standard"] = response.data.standard;
          this.detail = true;
        })
        .catch((error) => {
          alert(error.response.message);
        });
      this.detail = true;
      this.curr_issue = issue;
      this.curr_issue["standard"] = {
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
</style>
