<template>
  <div class="bg-slate-300">
    <div
      class="container mx-auto border-b border-gray-300 p-5 text-gray-700 flex justify-between items-center"
    >
      <h1 class="uppercase text-4xl bg-white p-1 rounded-md">RubyPome</h1>
      <div class="flex gap-3 items-center" v-if="_getCurrentUser">
        <router-link
          to="/appointments"
          class="bg-white rounded-full text-sm px-3 p-2 hover:bg-green-500 hover:text-white hover:font-semibold"
          >Appointments</router-link
        >
        <div
          class="flex gap-1 items-center p-3 rounded-full text-sm font-medium bg-white"
        >
          <User :size="24" :stroke-width="2" />
          <p class="inline" v-if="_getCurrentUser.fullname">
            {{ _getCurrentUser.fullname }}
          </p>
          <p class="inline" v-else>{{ _getCurrentUser.mail }}</p>
        </div>
      </div>
      <div
        class="flex items-center bg-white rounded-full divide-x divide-slate-300 text-sm overflow-hidden"
        v-else
      >
        <router-link
          to="/login"
          class="ps-3 pe-1 py-2 hover:bg-green-500 hover:text-white hover:font-semibold"
          >Oturum Aç</router-link
        >
        <router-link
          to="/register"
          class="ps-1 pe-3 py-2 hover:bg-green-500 hover:text-white hover:font-semibold"
          >Kayıt Ol</router-link
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { User } from "lucide-vue-next";
export default {
  computed: {
    ...mapGetters(["_getCurrentUser"]),
  },
  components: {
    User,
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