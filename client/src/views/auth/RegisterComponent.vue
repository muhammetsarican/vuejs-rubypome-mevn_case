<template>
  <div
    style="
      padding: 20px;
      font-family: Arial;
      background-color: #f0f0f0;
      min-height: 100vh;
    "
  >
    <!-- Bad practice: Inline styles everywhere -->
    <h1 style="color: blue; text-align: center; margin-bottom: 30px">
      Kayıt Ol
    </h1>

    <!-- Bad practice: No form validation -->
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <input
        v-model="fullname"
        style="
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
        "
        placeholder="Adınız"
      />
      <input
        v-model="mail"
        style="
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
        "
        placeholder="E-posta adresiniz"
      />
      <input
        type="password"
        v-model="password"
        style="
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
        "
        placeholder="Şifreniz"
      />

      <!-- Bad practice: No loading states or error handling -->
      <button
        @click="onSubmit"
        :disabled="isLoading"
        style="
          width: 100%;
          padding: 5px;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        "
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
          this.$$appAxios.setHeader(data.message.tokens.access_token);
          this.isLoading = false;
        })
        .then((err) => {
          console.log(err.message);
          this.isLoading = false;
        });
    },
  },
};
</script>