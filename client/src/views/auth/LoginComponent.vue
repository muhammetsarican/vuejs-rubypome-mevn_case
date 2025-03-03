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
        @click="save"
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
        Oturum aç
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
    };
  },

  mounted() {
    this.fetchData();
    this.fetchSlots();
  },
  methods: {
    async fetchData() {
      const res = await fetch("http://localhost:4040/api/appointments");
      const data = await res.json();
      console.log("appointments:", data);
      this.appointments = data;
    },
    async fetchSlots() {
      const res = await fetch(
        "http://localhost:4040/api/appointment/slot-appointments"
      );
      const data = await res.json();
      console.log("slots:", data);
      this.slots = data.message;
    },
    async save() {
      const res = await fetch("http://localhost:4040/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.n,
          date: this.d,
          time: this.t,
        }),
      });
      const data = await res.json();
      console.log("save response:", data);

      location.reload();
    },
  },
};
</script>