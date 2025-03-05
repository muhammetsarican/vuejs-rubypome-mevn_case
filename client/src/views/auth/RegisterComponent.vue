<template>
  <!-- // ! Done:Bad practice: Inline styles everywhere -->
  <div
    class="bg-white flex flex-col items-center gap-5 p-7 rounded-lg shadow-2xl"
  >
    <h1 class="text-3xl font-bold px-5 py-3">Kayıt Ol</h1>

    <!-- // ! Done:Bad practice: No form validation -->
    <div class="flex flex-col gap-3 p-3">
      <div>
        <input
          class="border p-2 rounded-md min-w-76 text-sm outline-none"
          v-model="fullname"
          placeholder="Adınız"
        />
        <p
          class="text-xs px-2 text-red-500 font-light"
          v-if="_getErrors && _getErrors.label === 'fullname'"
        >
          *{{ _getErrors.message }}
        </p>
      </div>
      <div>
        <input
          class="border p-2 rounded-md min-w-76 text-sm outline-none"
          v-model="mail"
          placeholder="E-posta adresiniz"
        />
        <p
          class="text-xs px-2 text-red-500 font-light"
          v-if="_getErrors && _getErrors.label === 'mail'"
        >
          *{{ _getErrors.message }}
        </p>
      </div>
      <div>
        <input
          class="border p-2 rounded-md min-w-76 text-sm outline-none"
          type="password"
          v-model="password"
          placeholder="Şifreniz"
        />
        <p
          class="text-xs px-2 text-red-500 font-light"
          v-if="_getErrors && _getErrors.label === 'password'"
        >
          *{{ _getErrors.message }}
        </p>
      </div>

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
</template>
<script>
import { LoaderCircle } from "lucide-vue-next";
import { hashPass } from "../../utils/hashOperations";
import joi from "joi";
import { validate } from "../../utils/validate";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fullname: "",
      mail: "",
      password: "",
      isLoading: false,
      registerSchema: joi.object({
        fullname: joi.string().min(3).max(30),
        mail: joi.string().min(3).max(50).required(),
        password: joi.string().min(8).max(70).required(),
      }),
    };
  },
  computed: {
    ...mapGetters(["_getErrors"]),
  },
  components: {
    LoaderCircle,
  },
  methods: {
    onSubmit() {
      const data = {
        fullname: this.fullname,
        mail: this.mail,
        password: this.password,
      };
      const errors = validate(this.registerSchema, data);
      if (errors) {
        this.$store.commit("setErrors", errors);
        return;
      }
      data.password = hashPass(data.password);
      this.isLoading = true;
      this.$appAxios
        .request("/user/register", {
          method: "post",
          data,
        })
        .then((response) => response.data)
        .then((data) => {
          this.$store.commit("saveUser", data.message.user);
          this.$appAxios.setHeader(data.message.tokens.access_token);
          this.$router.push({ name: "Appointments" });
          this.isLoading = false;
        })
        .catch((err) => {
          this.$store.commit("setApiErrors", err.response.data);
          this.isLoading = false;
        });
    },
  },
};
</script>