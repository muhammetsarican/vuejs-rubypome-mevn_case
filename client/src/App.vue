<template>
  <div>
    <div v-if="_getCurrentUser">
      <router-link to="/appointments">Appointments</router-link>
      <p v-if="_getCurrentUser.fullname">{{ _getCurrentUser.fullname }}</p>
      <p v-else>{{ _getCurrentUser.mail }}</p>
    </div>
    <div v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["_getCurrentUser"]),
  },
  mounted() {
    this.$appAxios
      .request("/user/check-token", {
        method: "get",
      })
      .then((response) => response.data)
      .then((data) => {
        this.$store.commit("saveUser", data.message.user);
        this.$appAxios.setHeader(data.message.tokens.access_token);
      })
      .catch((err) => console.log(err.message));
  },
};
</script>