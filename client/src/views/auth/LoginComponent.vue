<template>
  <div class="p-20 bg-slate-100 h-dvh flex justify-center items-center">
    <!-- // ! Fixed:Bad practice: Inline styles everywhere -->
    <div
      class="bg-white p-7 w-fit h-fit shadow-2xl rounded-xl flex flex-col items-center gap-5"
    >
      <h1 class="text-3xl font-bold px-5 py-3">Oturum Aç</h1>

      <!-- Bad practice: No form validation -->
      <div class="flex flex-col gap-3 p-3">
        <input
          class="border p-2 rounded-md min-w-76 text-sm outline-none"
          v-model="mail"
          placeholder="E-posta adresiniz"
        />
        <input
          class="border p-2 rounded-md min-w-76 text-sm outline-none"
          v-model="password"
          type="password"
          placeholder="Şifreniz"
        />

        <!-- // ! Done: Bad practice: No loading states or error handling -->
        <button
          class="flex justify-center items-center my-3 p-2 rounded-md min-w-76 bg-green-500 text-white hover:bg-green-700"
          @click="onSubmit"
          :disabled="isLoading || (!this.mail && !this.password)"
        >
          <LoaderCircle
            class="animate-spin"
            :size="24"
            :stroke-width="2"
            v-if="isLoading"
          />
          <span v-else>Oturum Aç</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { LoaderCircle } from "lucide-vue-next";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      mail: "",
      password: "",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["_getCurrentUser"]),
  },
  watch: {
    "$store.getters._getCurrentUser": {
      handler: function () {
        if (this._getCurrentUser) {
          this.$router.push({ name: "Appointments" });
        }
      },
    },
  },
  components: {
    LoaderCircle,
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      this.$appAxios
        .request("/user/login", {
          method: "post",
          data: {
            mail: this.mail,
            password: this.password,
          },
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          return response.data;
        })
        .then((data) => {
          this.$store.commit("saveUser", data.message.user);
          this.$appAxios.setHeader(data.message.tokens.access_token);
          this.$router.push({ name: "Appointments" });
        })
        .catch((err) => {
          console.log(err.message);
          this.isLoading = false;
        });
    },
  },
};
</script>