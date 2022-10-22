<template>
  <v-app id="login">
    <v-main class="grey lighten-3">
      <v-container fluid fill-height>
        <v-row justify="center" class="prevent_overflow">
          <v-card flat rounded="lg">
            <v-progress-linear
              :indeterminate="server_await"
              color="indigo"
            ></v-progress-linear>
            <h1
              class="mt-8"
              style="text-align: center; color: rgba(0, 0, 0, 0.7)"
            >
              Login
            </h1>
            <v-card-title class="justify-center" style="width: 450px">
              <v-col class="ma-1 pa-0" cols="10">
                <v-text-field
                  label="ID"
                  color="#3F51B5"
                  prepend-inner-icon="mdi-account"
                  @input="IDformatting($event)"
                  @keyup.enter="loginclicked"
                  :value="id"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="ma-1 pa-0" cols="10">
                <v-text-field
                  :type="visibility ? 'text' : 'password'"
                  label="Password"
                  color="#3F51B5"
                  prepend-inner-icon="mdi-lock"
                  @click:append="visibility = !visibility"
                  @keyup.enter="loginclicked"
                  v-model="pwd"
                  :append-icon="visibility ? 'mdi-eye' : 'mdi-eye-off'"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="ma-3 pa-0" cols="10">
                <v-btn block outlined color="indigo" @click.stop="loginclicked">
                  Login
                </v-btn>
              </v-col>
              <v-col class="mb-7 ma-1 pa-0" cols="10">
                <router-link to="/signup" style="text-decoration: none">
                  <v-btn block outlined color="indigo"> Register </v-btn>
                </router-link>
              </v-col>
            </v-card-title>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    visibility: false,
    server_await: false,
    id: "",
    pwd: "",
    userdata: {
      username: null,
      token: null,
    },
  }),
  methods: {
    loginclicked: function () {
      this.server_await = true;
      this.$axios
        .post("/auth/signin/", {
          id: this.id,
          pwd: this.pwd,
        })
        .then((response) => {
          console.log(response.data.message);
          this.userdata.username = this.id;
          this.userdata.token = response.data.token;
          this.$router.replace({
            name: "dashboard",
            params: { ...this.userdata },
          });
          this.server_await = false;
        })
        .catch((error) => {
          alert(error.response.data.message);
          this.id = null;
          this.pwd = null;
          this.server_await = false;
          this.userdata.token = "asdf";
          this.$router.replace({
            name: "dashboard",
            params: { ...this.userdata },
          });
        });
    },
    IDformatting(event) {
      this.id = "";
      event = event.replace(/[^0-9]/g, "");
      if (event.length >= 3) {
        event = event.substr(0, 2) + "-" + event.substr(2);
      }
      if (event.length > 11) {
        event = event.substr(0, 11);
      }
      this.id = event;
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
