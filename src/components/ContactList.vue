<script>
import CompanyCard from "./shared/CompanyCard.vue";
import ContactCard from "./shared/ContactCard.vue";

export default {
  props: {
    contacts: {
      type: Object,
      required: true,
    },
    companies: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isDropdown: true,
      selectedCountry: "",
    };
  },
  components: {
    CompanyCard,
    ContactCard,
  },
};
</script>

<template>
  <transition-group name="company" tag="section" class="sc_list">
    <contact-card
      v-for="contact in contacts"
      :key="contact.guid"
      :contact="contact"
    />
    <company-card
      v-for="company in companies"
      :key="company.guid"
      :contact="company"
    />
  </transition-group>
</template>
