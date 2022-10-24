<template>
  <v-container>
    <v-row justify="center">
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
                @click.stop="profile_readonly = submit(edit_request)"
              >
                Submit
              </v-btn>
            </template>
          </profileFormView>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import profileFormView from "../components/profileFormView.vue";
export default {
  name: "profileView",
  components: {
    profileFormView,
  },
  data() {
    return {
      profile_readonly: true,
    };
  },
  props: {
    curr_info: {
      type: Object,
      required: true,
    },
    userdata: {
      type: Object,
      required: true,
    },
  },
  methods: {
    edit_request(regdata) {
      return new Promise((resolve, reject) => {
        this.$axios
          .post(
            "/profile/edit/",
            { ...regdata },
            {
              headers: {
                Authorization: this.userdata.token,
              },
            }
          )
          .then(() => {
            this.$router.replace("/");
            resolve();
          })
          .catch((error) => {
            alert(error.response.data.message);
            reject();
          });
      });
    },
  },
  computed: {
    info: {
      get() {
        return this.curr_info;
      },
      set(newVal) {
        this.$emit("update:dateSettting", newVal);
      },
    },
  },
};
</script>

<style></style>
