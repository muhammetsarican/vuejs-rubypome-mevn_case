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
        <option v-for="date in uniqueDates" :key="date" :value="date">
          {{ date }}
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
        @click="onSubmit"
        :disabled="isLoading"
        style="
          width: 100%;
          padding: 5px;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
        "
      >
        <LoaderCircle
          class="animate-spin"
          :size="22"
          :stroke-width="2"
          v-if="isLoading"
        />
        <span v-else>Kaydet</span>
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
      <div v-if="_getAppointments && _getAppointments.length > 0">
        <div
          v-for="a in _getAppointments"
          :key="a.id"
          style="padding: 10px; border-bottom: 1px solid #ddd"
        >
          {{ a.name }} - {{ a.date }} {{ a.time }}
        </div>
      </div>
      <p v-else>Randevu bulunamadı...</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { LoaderCircle } from "lucide-vue-next";
export default {
  data() {
    return {
      name: "",
      date: "",
      time: "",
      isLoading: false,
    };
  },
  components: {
    LoaderCircle,
  },
  computed: {
    ...mapGetters(["_getAppointments", "_getSlots", "_getCurrentUser"]),
    filteredTimes() {
      if (!this.date) return [];
      const temp = this._getSlots.filter((slot) => slot.date === this.date);
      console.log("filtered times:", temp);
      return temp;
    },
    // ? for list same dates only one time
    uniqueDates() {
      if (!this._getSlots) return null;
      return new Set(this._getSlots.map((slot) => slot.date));
    },
  },
  watch: {
    "this._getCurrentUser": {
      handler() {
        if (this._getCurrentUser) {
          this.fetchAppointments();
          this.fetchSlots();
        }
      },
      immediate: true,
    },
  },
  methods: {
    fetchAppointments() {
      if (!this._getCurrentUser) return;
      this.$appAxios
        .request(`/appointment/${this._getCurrentUser._id}`)
        .then((response) => response.data)
        .then((data) => this.$store.commit("setAppointments", data.message))
        .catch((err) => console.log(err.message));
    },
    fetchSlots() {
      this.$appAxios
        .request("/appointment/slot-appointments")
        .then((response) => response.data)
        .then((data) => this.$store.commit("setSlots", data.message))
        .catch((err) => console.log(err.message));
    },
    onSubmit() {
      if (!this._getCurrentUser) return;
      this.isLoading = true;
      this.$appAxios
        .request(`/appointment/${this._getCurrentUser._id}`, {
          method: "post",
          data: {
            date: this.date,
            time: this.time,
          },
        })
        .then((response) => response.data)
        .then((data) => {
          this.$store.commit("setAppointments", data.message);
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