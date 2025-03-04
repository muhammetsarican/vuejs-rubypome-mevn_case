<template>
  <div class="flex justify-center items-center h-dvh bg-slate-100">
    <!-- // ! Done:Bad practice: Inline styles everywhere -->
    <div
      class="bg-white flex flex-col items-center gap-5 p-7 rounded-lg shadow-2xl"
    >
      <h1 class="text-3xl font-bold px-5 py-3">Randevu Sistemi</h1>

      <!-- // ! Done:Bad practice: No form validation -->
      <div class="flex flex-col gap-3 p-3">
        <!-- // ! Done:Bad practice: Poor variable names -->
        <div>
          <select
            class="border p-2 rounded-md min-w-76 text-sm outline-none"
            v-model="date"
          >
            <option value="">Tarih Seçin</option>
            <option v-for="date in uniqueDates" :key="date" :value="date">
              {{ new Date(date).toLocaleDateString("tr-TR") }}
            </option>
          </select>
          <p
            class="text-xs px-2 text-red-500 font-light"
            v-if="_getErrors && _getErrors.label === 'date'"
          >
            *{{ _getErrors.message }}
          </p>
        </div>
        <div>
          <select
            class="border p-2 rounded-md min-w-76 text-sm outline-none"
            :disabled="!date"
            v-model="time"
          >
            <option value="">Saat Seçin</option>
            <option v-for="s in filteredTimes" :key="s.time" :value="s.time">
              {{ s.time }}
            </option>
          </select>
          <p
            class="text-xs px-2 text-red-500 font-light"
            v-if="_getErrors && _getErrors.label === 'time'"
          >
            *{{ _getErrors.message }}
          </p>
        </div>
        <!-- // ! Done:Bad practice: No loading states or error handling -->
        <button
          class="flex justify-center items-center my-3 p-2 rounded-md min-w-76 bg-green-500 text-white hover:bg-green-700"
          @click="onSubmit"
          :disabled="isLoading || (!this.date && !this.time)"
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

      <!-- // ! Done:Bad practice: No pagination or filtering -->
      <div
        class="flex flex-col gap-3 w-full justify-start border border-slate-300 rounded-lg p-3"
      >
        <h2 class="text-xl font-bold">Kayıtlı Randevularım :</h2>
        <div
          class="grid grid-cols-2 gap-1"
          v-if="_getAppointments && _getAppointments.length > 0"
        >
          <div
            class="w-fit px-3 py-1 rounded-md bg-green-300 text-gray-700"
            v-for="appointment in _getAppointments"
            :key="appointment.id"
          >
            {{
              new Date(
                [appointment.date, appointment.time].join(",")
              ).toLocaleString("tr-TR")
            }}
          </div>
        </div>
        <p
          class="text-xs font-semibold rounded-md bg-red-500 text-white p-2"
          v-else
        >
          Randevu bulunamadı...
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { LoaderCircle } from "lucide-vue-next";
import joi from "joi";
import { validate } from "../utils/validate";
export default {
  data() {
    return {
      date: "",
      time: "",
      isLoading: false,
      appointmentSchema: joi.object({
        date: joi.string().min(3).max(15).required(),
        time: joi.string().min(3).max(15).required(),
      }),
    };
  },
  components: {
    LoaderCircle,
  },
  computed: {
    ...mapGetters([
      "_getAppointments",
      "_getSlots",
      "_getCurrentUser",
      "_getErrors",
    ]),
    filteredTimes() {
      if (!this.date) return [];
      const temp = this._getSlots.filter((slot) => slot.date === this.date);
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
      const data = {
        date: this.date,
        time: this.time,
      };
      const errors = validate(this.appointmentSchema, data);
      if (errors) {
        this.$store.commit("setErrors", errors);
        return;
      }
      this.isLoading = true;
      this.$appAxios
        .request(`/appointment/${this._getCurrentUser._id}`, {
          method: "post",
          data,
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