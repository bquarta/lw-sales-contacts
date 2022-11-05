<script>
import { mapGetters, mapActions } from 'vuex';
import ContactCard from './shared/ContactCard.vue';

export default {
    props: {
        contacts: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isDropdown: true,
            selectedCountry: ''
        }
    },
    computed: {
        ...mapGetters(['allContacts'])
    },
    components: {
        ContactCard
    }
}  
</script>

<template>
    <transition-group name="company" tag="ul" class="content__list">
        <contact-card v-for="contact in contacts" :key="contact.guid" :contact="contact" />
    </transition-group>
</template>