<template>
  <div class="flex justify-center items-center h-dvh bg-slate-100">
    <!-- // ! Done:Bad practice: Inline styles everywhere -->
    <div
      class="bg-white flex flex-col items-center gap-5 p-7 rounded-lg shadow-2xl"
    >
      <h1 class="text-3xl font-bold px-5 py-3">Kayıt Ol</h1>

      <!-- Bad practice: No form validation -->
      <div class="flex flex-col gap-3 p-3">
        <input
          class="border p-2 rounded-md min-w-76 text-sm outline-none"
          v-model="fullname"
          placeholder="Adınız"
        />
        <input
          class="border p-2 rounded-md min-w-76 text-sm outline-none"
          v-model="mail"
          placeholder="E-posta adresiniz"
        />
        <input
          class="border p-2 rounded-md min-w-76 text-sm outline-none"
          type="password"
          v-model="password"
          placeholder="Şifreniz"
        />

        <!-- // ! Done:Bad practice: No loading states or error handling -->
        <button
          class="flex justify-center items-center my-3 p-2 rounded-md min-w-76 bg-blue-500 text-white hover:bg-blue-700"
          @click="onSubmit"
          :disabled="isLoading || (!this.mail && !this.password)"
        >
          <LoaderCircle
            class="animate-spin"
            :size="24"
            :stroke-width="2"
            v-if="isLoading"
          />
          <span v-else>Kayıt Ol</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { LoaderCircle } from "lucide-vue-next";
export default {
  data() {
    return {
      fullname: "",
      mail: "",
      password: "",
      isLoading: false,
    };
  },
  components: {
    LoaderCircle,
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      this.$appAxios
        .request("/user/register", {
          method: "post",
          data: {
            fullname: this.fullname,
            mail: this.mail,
            password: this.password,
          },
        })
        .then((response) => response.data)
        .then((data) => {
          this.$store.commit("saveUser", data.message.user);
          this.$appAxios.setHeader(data.message.tokens.access_token);
          this.$router.push({ name: "Appointments" });
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.message);
          this.isLoading = false;
        });
    },
  },
};
</script>