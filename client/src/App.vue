<template>
  <div class="relative bg-slate-300">
    <div
      class="container mx-auto border-b border-gray-300 p-5 text-gray-700 flex justify-between items-center"
    >
      <router-link to="/" class="uppercase text-4xl bg-white p-1 rounded-md"
        >RubyPome</router-link
      >
      <div class="flex gap-3 items-center" v-if="_getCurrentUser">
        <router-link
          to="/appointments"
          class="bg-white rounded-full text-sm px-3 p-2 hover:bg-green-500 hover:text-white hover:font-semibold"
          >Appointments</router-link
        >
        <div
          class="group flex gap-1 items-center p-3 rounded-full text-sm font-medium bg-white hover:bg-red-500 hover:text-white cursor-pointer"
          @click="logout"
        >
          <User class="group-hover:hidden" :size="24" :stroke-width="2" />
          <DoorOpen class="hidden stroke-white group-hover:block" />
          <p class="inline group-hover:hidden" v-if="_getCurrentUser.fullname">
            {{ _getCurrentUser.fullname }}
          </p>
          <p class="inline group-hover:hidden" v-else>
            {{ _getCurrentUser.mail }}
          </p>
          <p class="hidden group-hover:block">Oturumu Kapat</p>
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
    <div class="flex justify-center items-center h-dvh bg-slate-100">
      <router-view></router-view>
    </div>
    <div
      class="fixed bottom-5 right-5 flex gap-3 items-center rounded-md bg-red-500 text-white p-5 shadow-2xl"
      v-if="_getApiErrors"
    >
      <CircleX />
      <p class="font-semibold capitalize">
        {{ _getApiErrors || "An error occured" }}
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { User, DoorOpen, CircleX } from "lucide-vue-next";
export default {
  computed: {
    ...mapGetters(["_getCurrentUser", "_getApiErrors"]),
  },
  components: {
    User,
    DoorOpen,
    CircleX,
  },
  mounted() {
    this.checkToken();
  },
  methods: {
    checkToken() {
      this.$appAxios
        .request("/user/check-token", {
          method: "get",
        })
        .then((response) => response.data)
        .then((data) => {
          this.$store.commit("saveUser", data.message.user);
          this.$appAxios.setHeader(data.message.tokens.access_token);
        })
        .catch((err) => this.$store.commit("setApiErrors", err.response.data));
    },
    logout() {
      if (confirm("Oturum kapatılacak emin misiniz?")) {
        this.$appAxios
          .request("/user/logout")
          .then((response) => response.data)
          .then(() => {
            this.$store.commit("saveUser", null);
            this.$appAxios.setHeader(null);
            this.$router.push({ name: "Login" });
          })
          .catch((err) =>
            this.$store.commit("setApiErrors", err.response.data)
          );
      }
    },
  },
};
</script>