import { createStore } from "vuex";

export default createStore({
    state: {
        user: null,
        appointments: null,
        slots: null
    },
    mutations: {
        saveUser(state, user) {
            state.user = user;
        },
        setAppointments(state, appointments) {
            if (!state.appointments) {
                state.appointments = appointments;
            }
            else {
                state.appointments.push(appointments);
            }
        },
        setSlots(state, slots) {
            state.slots = slots;
        },
    },
    getters: {
        _getCurrentUser(state) {
            return state.user;
        },
        _getAppointments(state) {
            return state.appointments;
        },
        _getSlots(state) {
            return state.slots;
        }
    }
})