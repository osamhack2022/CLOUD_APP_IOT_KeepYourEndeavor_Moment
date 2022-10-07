<template>
  <v-app id="login">
    <v-main class="indigo lighten-3">
      <v-container fluid fill-height>
        <v-layout align-center row wrap>
          <v-flex xs12>
            <v-row justify="center">
              <v-card>
                <h1
                  class="mt-8"
                  style="text-align: center; color: rgba(0, 0, 0, 0.7)"
                >
                  Login
                </h1>
                <v-card-title class="justify-center" style="width: 450px">
                  <v-col class="ma-1 pa-0" md="10">
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
                  <v-col class="ma-1 pa-0" md="10">
                    <v-text-field
                      :type="visibility ? 'text' : 'password'"
                      label="Password"
                      color="#3F51B5"
                      prepend-inner-icon="mdi-lock"
                      @click:append="visibility = !visibility"
                      @keyup.enter="loginclicked"
                      :append-icon="visibility ? 'mdi-eye' : 'mdi-eye-off'"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="ma-3 pa-0" md="10">
                    <v-btn
                      block
                      outlined
                      color="indigo"
                      @click.stop="loginclicked"
                    >
                      Login
                    </v-btn>
                  </v-col>
                  <v-col class="mb-7 ma-1 pa-0" md="10">
                    <router-link to="/signup" style="text-decoration: none">
                      <v-btn block outlined color="indigo"> Register </v-btn>
                    </router-link>
                  </v-col>
                </v-card-title>
              </v-card>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    visibility: false,
    id: "",
    pwd: "",
  }),
  methods: {
    loginclicked() {
      this.$emit("loginclicked", { id: this.id, pwd: this.pwd });
      this.$router.replace("/dashboard");
    },
    IDformatting(event) {
      this.id = "";
      console.log(this.id);
      event = event.replace(/[^0-9]/g, "");
      if (event.length >= 3) {
        event = event.substr(0, 2) + "-" + event.substr(2);
      }
      if (event.length > 11) {
        event = event.substr(0, 11);
      }
      console.log(event);
      this.id = event;
    },
  },
};
</script>
