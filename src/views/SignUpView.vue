<template>
  <div>
    <v-app id="signup">
      <v-main class="grey lighten-3">
        <v-container fluid fill-height>
          <v-row justify="center">
            <v-card flat style="width: 600px" rounded="lg">
              <v-form class="ma-2">
                <v-progress-linear
                  :indeterminate="server_await"
                  color="grey"
                ></v-progress-linear>
                <v-col class="ma-0 pa-5" md="15">
                  <h1 style="color: rgba(0, 0, 0, 0.8)">SignUp</h1>
                </v-col>
                <v-col class="ma-0 px-5 py-0" md="15">
                  <v-text-field
                    color="#3F51B5"
                    label="ID"
                    prepend-inner-icon="mdi-account"
                    @input="IDformatting($event)"
                    :value="regdata.id"
                    required
                    :rules="rule"
                  ></v-text-field>
                  <v-text-field
                    :type="visibility ? 'text' : 'password'"
                    label="Password"
                    color="#3F51B5"
                    prepend-inner-icon="mdi-lock"
                    v-model="regdata.pwd"
                    @click:append="visibility = !visibility"
                    :append-icon="visibility ? 'mdi-eye' : 'mdi-eye-off'"
                    required
                    :rules="rule"
                  ></v-text-field>
                  <v-text-field
                    color="#3F51B5"
                    label="Name"
                    v-model="regdata.name"
                    required
                  ></v-text-field>
                  <v-row>
                    <v-col md="15">
                      <v-select
                        :items="rank_items"
                        color="#3F51B5"
                        label="Rank"
                        v-model="regdata.class"
                        required
                      ></v-select>
                    </v-col>
                    <v-col md="15">
                      <v-select
                        :items="authority_items"
                        color="#3F51B5"
                        label="Authority"
                        v-model="regdata.authority"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-divider></v-divider>
                <div>
                  <v-col class="ma-0 pa-5 pb-0" md="15">
                    <span style="font-size: 13px"
                      >1개 이상의 소속명을 기입하여야 합니다.</span
                    >
                  </v-col>
                  <v-col class="ma-0 px-5 py-1" md="15">
                    <v-layout>
                      <v-row class="ma-0 pr-2">
                        <v-text-field
                          outlined
                          color="#3F51B5"
                          label="Cmd"
                          v-model="regdata.cmd"
                          required
                        ></v-text-field>
                      </v-row>
                      <v-row class="ma-0 pl-2">
                        <v-text-field
                          outlined
                          color="#3F51B5"
                          label="Cps"
                          v-model="regdata.cps"
                          required
                        ></v-text-field>
                      </v-row>
                    </v-layout>
                    <v-layout>
                      <v-row class="ma-0 pa-0">
                        <v-text-field
                          outlined
                          color="#3F51B5"
                          label="Div"
                          v-model="regdata.division"
                          required
                        ></v-text-field>
                      </v-row>
                      <v-row class="ma-0 pr-2 pl-4">
                        <v-text-field
                          outlined
                          color="#3F51B5"
                          label="Br"
                          v-model="regdata.br"
                          required
                        ></v-text-field>
                      </v-row>
                      <v-row class="ma-0 pr-4 pl-2">
                        <v-text-field
                          outlined
                          color="#3F51B5"
                          label="Bn"
                          v-model="regdata.bn"
                          required
                        ></v-text-field>
                      </v-row>
                      <v-row class="ma-0 pa-0">
                        <v-text-field
                          outlined
                          color="#3F51B5"
                          label="Co"
                          v-model="regdata.co"
                          required
                        ></v-text-field>
                      </v-row>
                    </v-layout>
                    <v-layout>
                      <v-row class="ma-0 pr-2">
                        <v-text-field
                          outlined
                          color="#3F51B5"
                          label="Etc"
                          v-model="regdata.etc"
                          required
                        ></v-text-field>
                      </v-row>
                      <v-row class="ma-0 pl-2">
                        <v-text-field
                          outlined
                          color="#3F51B5"
                          label="Position"
                          v-model="regdata.position"
                          required
                        ></v-text-field>
                      </v-row>
                    </v-layout>
                  </v-col>
                </div>
                <v-col class="ma-0 px-5 py-1" md="15">
                  <router-link to="/" style="font-size: 14px"
                    >이미 계정이 있으신가요?
                  </router-link>
                </v-col>
                <v-col class="ma-0 pt-0 px-5" md="15">
                  <v-btn block outlined color="indigo" @click.stop="submit">
                    submit
                  </v-btn>
                </v-col>
              </v-form>
            </v-card>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    server_await: false,
    visibility: false,
    rank_items: ["이병", "일병", "상병", "병장"],
    authority_items: ["군무원", "병사", "간부", "등록자", "개설자"],
    peer_url: null,
    regdata: {
      id: "",
    },
    rule: [(v) => !!v || "required"],
  }),
  methods: {
    IDformatting(event) {
      this.regdata.id = "";
      console.log(this.regdata.id);
      event = event.replace(/[^0-9]/g, "");
      if (event.length >= 3) {
        event = event.substr(0, 2) + "-" + event.substr(2);
      }
      if (event.length > 11) {
        event = event.substr(0, 11);
      }
      console.log(event);
      this.regdata.id = event;
    },
    submit: function () {
      if (this.regdata.id == "" || this.regdata.pwd === undefined) {
        alert("ID와 비밀번호는 필수사항입니다.");
        return;
      }
      this.server_await = true;
      console.log({ ...this.regdata });
      this.$axios
        .post("/auth/signup/", { ...this.regdata })
        .then((response) => {
          alert(response.data.message);
          this.peer_url = response.data.peer_url;
          this.$router.replace("/");
          this.server_await = false;
        })
        .catch((error) => {
          alert(error.response.data.message);
          this.server_await = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
