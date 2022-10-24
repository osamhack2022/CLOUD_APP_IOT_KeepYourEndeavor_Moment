<template>
  <div>
    <v-progress-linear
      v-if="!readonly"
      rounded
      :indeterminate="server_await"
      color="indigo"
    ></v-progress-linear>
    <v-form class="pa-2">
      <slot name="header"></slot>
      <v-col class="ma-0 px-5 py-0" md="15">
        <v-text-field
          color="#3F51B5"
          label="ID"
          prepend-inner-icon="mdi-account"
          @input="IDformatting($event)"
          :value="regdata.id"
          required
          :rules="rule"
          :readonly="readonly"
          :disabled="readonly"
        ></v-text-field>
        <v-text-field
          v-if="password"
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
          :readonly="readonly"
          :disabled="readonly"
        ></v-text-field>
        <v-row>
          <v-col md="15">
            <v-select
              :items="rank_items"
              color="#3F51B5"
              label="Rank"
              v-model="regdata.class"
              required
              :readonly="readonly"
              :disabled="readonly"
            ></v-select>
          </v-col>
          <v-col md="15">
            <v-select
              :items="authority_items"
              color="#3F51B5"
              label="Authority"
              v-model="regdata.authority"
              required
              :readonly="readonly"
              :disabled="readonly"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-divider></v-divider>
      <v-col class="ma-0 pa-5 pb-0" md="15">
        <slot name="tooltip"></slot>
      </v-col>
      <v-col class="ma-0 px-5 pt-1 pb-0" md="15">
        <v-layout>
          <v-row class="ma-0 pr-2">
            <v-text-field
              outlined
              color="#3F51B5"
              label="Cmd"
              v-model="regdata.cmd"
              required
              :readonly="readonly"
              :disabled="readonly"
            ></v-text-field>
          </v-row>
          <v-row class="ma-0 pl-2">
            <v-text-field
              outlined
              color="#3F51B5"
              label="Cps"
              v-model="regdata.cps"
              required
              :readonly="readonly"
              :disabled="readonly"
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
              :readonly="readonly"
              :disabled="readonly"
            ></v-text-field>
          </v-row>
          <v-row class="ma-0 pr-2 pl-4">
            <v-text-field
              outlined
              color="#3F51B5"
              label="Br"
              v-model="regdata.br"
              required
              :readonly="readonly"
              :disabled="readonly"
            ></v-text-field>
          </v-row>
          <v-row class="ma-0 pr-4 pl-2">
            <v-text-field
              outlined
              color="#3F51B5"
              label="Bn"
              v-model="regdata.bn"
              required
              :readonly="readonly"
              :disabled="readonly"
            ></v-text-field>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-text-field
              outlined
              color="#3F51B5"
              label="Co"
              v-model="regdata.co"
              required
              :readonly="readonly"
              :disabled="readonly"
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
              :readonly="readonly"
              :disabled="readonly"
            ></v-text-field>
          </v-row>
          <v-row class="ma-0 pl-2">
            <v-text-field
              outlined
              color="#3F51B5"
              label="Position"
              v-model="regdata.position"
              required
              :readonly="readonly"
              :disabled="readonly"
            ></v-text-field>
          </v-row>
        </v-layout>
      </v-col>
      <v-col class="ma-0 px-5 pb-3 pt-0" md="15">
        <slot name="button" :submit="submit" :regdata="regdata"></slot>
      </v-col>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "profileFormView",
  data: () => ({
    server_await: false,
    visibility: false,
    rank_items: ["이병", "일병", "상병", "병장"],
    authority_items: ["군무원", "병사", "간부", "등록자", "개설자"],
    rule: [(v) => !!v || "required"],
  }),
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    password: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: () => ({ id: "" }),
    },
  },
  methods: {
    IDformatting(event) {
      this.regdata.id = "";
      event = event.replace(/[^0-9]/g, "");
      if (event.length >= 3) {
        event = event.substr(0, 2) + "-" + event.substr(2);
      }
      if (event.length > 11) {
        event = event.substr(0, 11);
      }
      this.regdata.id = event;
    },
    submit: function (request) {
      if (
        this.regdata.id == "" ||
        this.regdata.pwd === undefined ||
        this.regdata.pwd === ""
      ) {
        alert("ID와 비밀번호는 필수사항입니다.");
        return;
      }
      console.log({ ...this.regdata });
      this.server_await = true;
      request({ ...this.regdata }).finally(() => {
        this.server_await = false;
      });
    },
  },
  computed: {
    regdata: function () {
      return this.userInfo;
    },
  },
};
</script>

<style></style>
