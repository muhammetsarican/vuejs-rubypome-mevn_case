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
      Randevu Sistemi
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
      <!-- Bad practice: Poor variable names -->
      <select
        v-model="date"
        style="
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
        "
      >
        <option value="">Tarih Seçin</option>
        <option v-for="s in slots" :key="s.date + s.time" :value="s.date">
          {{ s.date }}
        </option>
      </select>

      <select
        v-model="time"
        style="
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
        "
      >
        <option value="">Saat Seçin</option>
        <option v-for="s in filteredTimes" :key="s.time" :value="s.time">
          {{ s.time }}
        </option>
      </select>

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
        Kaydet
      </button>
    </div>

    <!-- Bad practice: No pagination or filtering -->
    <div
      style="
        max-width: 600px;
        margin: 20px auto;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <h2 style="margin-bottom: 20px">Mevcut Randevular</h2>
      <div
        v-for="a in appointments"
        :key="a.id"
        style="padding: 10px; border-bottom: 1px solid #ddd"
      >
        {{ a.name }} - {{ a.date }} {{ a.time }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      date: "",
      time: "",
      slots: [],
      appointments: [],
    };
  },
  computed: {
    filteredTimes() {
      if (!this.date) return [];
      const temp = this.slots.filter((s) => s.date === this.date);
      console.log("filtered times:", temp);
      return temp;
    },
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
          name: this.name,
          date: this.date,
          time: this.time,
        }),
      });
      const data = await res.json();
      console.log("save response:", data);

      location.reload();
    },
  },
};
</script>