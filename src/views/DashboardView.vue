<template>
  <div class="indigo lighten-5">
    <v-app-bar color="indigo" dark outlined flat>
      <v-toolbars>Tests</v-toolbars>

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
      <v-btn icon width="40" height="40">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

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
              <v-list-item @click="() => {}">
                <v-list-item-title>LogOut</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar-nav-icon>
        <span style="text-justify: center; font-size: 16px; float: right">
          {{ username }}
        </span>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="test in tests" :key="test.id" cols="12">
            <v-card>
              <v-subheader>{{ test.title }}</v-subheader>

              <v-list two-line>
                <template v-for="(v, k, i) in test">
                  <v-list-item :key="k">
                    <v-list-item-icon>
                      <v-icon>{{ testsicons[i] }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ k }}</v-list-item-title>

                      <v-list-item-subtitle>
                        {{ test[k] }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="i !== 6"
                    :key="`divider-${i}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      testsicons: [
        "mdi-music-accidental-sharp",
        "mdi-format-title",
        "mdi-account",
        "mdi-receipt-text-check",
        "mdi-calendar",
        "mdi-calendar",
        "mdi-calendar",
      ],
      tests: [
        {
          id: 21,
          title: "test notificaton1",
          author: 10234,
          subject: "subject7",
          deadline: "2022.10.06",
          created: "2022.10.03",
          changed: "2022.10.05",
        },
        {
          id: 22,
          title: "test notificaton2",
          author: 10235,
          subject: "subject6",
          deadline: "2022.10.02",
          created: "2022.10.01",
          changed: "2022.10.01",
        },
      ],
      username: "username",
    };
  },
};
</script>

<style lang="scss" scoped>
.expanding-search {
  font-size: 14px;
}
</style>
