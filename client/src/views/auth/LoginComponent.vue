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
      Oturum Aç
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
        v-model="password"
        type="password"
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
        @disabled="isLoading"
        style="
          width: 100%;
          padding: 10px;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        "
      >
        {{ isLoading ? "loading..." : "Oturum Aç" }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mail: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      console.log("this.mail:", this.mail);
      console.log("this.password:", this.password);
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
          console.log(this.$appAxios);
        })
        .catch((err) => {
          console.log(err.message);
          this.isLoading = false;
        });
    },
  },
};
</script>