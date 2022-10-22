<template>
  <div>
    <v-app id="signup">
      <v-main class="grey lighten-3">
        <v-container fluid fill-height>
          <v-row justify="center">
            <v-card flat style="width: 600px" rounded="lg">
              <profileFormView :readonly="false" :password="true">
                <template v-slot:header>
                  <v-col class="ma-0 pa-5" md="15">
                    <h1 style="color: rgba(0, 0, 0, 0.8)">SignUp</h1>
                  </v-col>
                </template>
                <template v-slot:tooltip>
                  <span style="font-size: 13px"
                    >1개 이상의 소속명을 기입하여야 합니다.</span
                  >
                </template>
                <template v-slot:button="{ submit }">
                  <router-link to="/" style="font-size: 14px"
                    >이미 계정이 있으신가요?
                  </router-link>
                  <v-btn block outlined color="indigo" @click.stop="submit">
                    submit
                  </v-btn>
                </template>
              </profileFormView>
            </v-card>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import profileFormView from "../components/profileFormView.vue";
export default {
  name: "LoginView",
  components: { profileFormView },
  data: () => ({}),
};
</script>

<style lang="scss" scoped></style>
