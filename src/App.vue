<script setup>
import TheFilter from './components/TheFilter.vue'
import ContactList from './components/ContactList.vue'
import { useStore } from 'vuex'
import { computed } from '@vue/reactivity'

const mapActions = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store._actions).map(
      action => [action, value => store.dispatch(action, value)]
    )
  )
}

mapActions().getContinents();
mapActions().getCountries();
mapActions().getContacts();


const mapGetters = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.getters).map(
      getter => [getter, computed(() => store.getters[getter])]
    )
  )
}
</script>

<template>
  <the-filter />
  <!--<contact-list />-->
</template>

<style lang="scss">
html {
  background-color: initial;
}
</style>
