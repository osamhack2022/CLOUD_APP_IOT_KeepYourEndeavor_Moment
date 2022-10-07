<template>
  <div>
    <v-app id="signup">
      <v-main class="indigo lighten-3">
        <v-container fluid fill-height>
          <v-layout align-center row wrap>
            <v-flex xs12>
              <v-row justify="center">
                <v-card style="width: 600px">
                  <v-form class="ma-2" style="background-color: #e8eaf6">
                    <v-col class="ma-0 pa-5" md="15">
                      <h1 style="color: rgba(0, 0, 0, 0.8)">SignUp</h1>
                    </v-col>
                    <v-col class="ma-0 pa-5" md="15">
                      <v-text-field
                        color="#3F51B5"
                        label="ID"
                        prepend-inner-icon="mdi-account"
                        @input="IDformatting($event)"
                        :value="id"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="ma-0 pa-5" md="15">
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
                    <v-col class="ma-0 pa-5" md="15">
                      <v-text-field
                        color="#3F51B5"
                        label="Name"
                        v-model="name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="ma-0 pa-5" md="15">
                      <v-select
                        :items="items"
                        color="#3F51B5"
                        label="Rank"
                      ></v-select>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col class="ma-0 pa-5" md="15">
                      <v-layout>
                        <v-row class="ma-0 pa-0">
                          <v-text-field
                            outlined
                            color="#3F51B5"
                            label="Div"
                            v-model="div"
                            required
                          ></v-text-field>
                        </v-row>
                        <v-row class="ma-0 pr-2 pl-4">
                          <v-text-field
                            outlined
                            color="#3F51B5"
                            label="Br"
                            v-model="br"
                            required
                          ></v-text-field>
                        </v-row>
                        <v-row class="ma-0 pr-4 pl-2">
                          <v-text-field
                            outlined
                            color="#3F51B5"
                            label="Bn"
                            v-model="bn"
                            required
                          ></v-text-field>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                          <v-text-field
                            outlined
                            color="#3F51B5"
                            label="Co"
                            v-model="co"
                            required
                          ></v-text-field>
                        </v-row>
                      </v-layout>
                    </v-col>
                    <v-col class="ma-0 pl-5 pr-5" md="15">
                      <v-text-field
                        outlined
                        color="#3F51B5"
                        label="Position"
                        v-model="position"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="ma-0 pl-5 pr-5" md="15">
                      <v-btn
                        block
                        outlined
                        color="indigo"
                        @click.stop="loginclicked"
                      >
                        submit
                      </v-btn>
                    </v-col>
                  </v-form>
                </v-card>
              </v-row>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    visibility: false,
    id: "",
    pwd: "",
    name: null,
    items: ["이병", "일병", "상병", "병장"],
    div: null,
    br: null,
    bn: null,
    co: null,
    position: null,
  }),
  methods: {
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

<style lang="sass" scoped></style>
>
