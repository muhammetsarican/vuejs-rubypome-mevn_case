import { createStore } from "vuex";

export default createStore({
    state: {
        user: null,
        appointments: null,
        slots: null,
        errors: null,
        apiErrors: null,
    },
    mutations: {
        saveUser(state, user) {
            state.user = user;
        },
        setAppointments(state, appointments) {
            if (!state.appointments) {
                if (appointments.length) {
                    state.appointments = appointments;
                }
                else {
                    state.appointments = [appointments];
                }
            }
            else {
                state.appointments.push(appointments);
            }
        },
        setSlots(state, slots) {
            state.slots = slots;
        },
        setErrors(state, errors) {
            state.errors = errors;
            setTimeout(() => { state.errors = null }, 5000);
        },
        setApiErrors(state, apiErrors) {
            state.apiErrors = apiErrors;
            setTimeout(() => { state.apiErrors = null }, 5000);
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
        },
        _getErrors(state) {
            return state.errors;
        },
        _getApiErrors(state) {
            return state.apiErrors;
        },
    }
})