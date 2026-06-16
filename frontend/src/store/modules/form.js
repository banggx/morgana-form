import { defineStore } from 'pinia';
import { getForms } from '@/api/form';

export const useFormStore = defineStore('form', {
  state: () => ({
    forms: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchForms() {
      this.loading = true;
      try {
        const res = await getForms();
        this.forms = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});