<script>
import { mapGetters, mapActions } from 'vuex';
import Icon from "./shared/Icon.vue"
import ContactList from "./ContactList.vue"

export default {
  components: {
    Icon,
    ContactList
  },

  data() {
    return {
      continents: [],
      companies: [],
      contacts: [],
      dropdown: { height: 0 },
      filters: {
        continents: {},
        countries: {},
      },
      menus: {
        continents: false,
        countries: false,
      }
    }
  },

  computed: {
    activeMenu() {
      return Object.keys(this.menus).reduce(($$, set, i) => (this.menus[set]) ? i : $$, -1)
    },

    contactsList() {
      let { continents: continents, countries: countr } = this.activeFilters

      return this.contacts.filter(({ countries, countries: kauntri }) => {
        return !countr.length || countr.every(cnt => {
          let filteredCountries = countries.filter(c => {
            const name = c.name
            return name === cnt
          })

          if (filteredCountries.length)
            return true

          return false
        })
      })
    },

    activeFilters() {
      let { continents, countries } = this.filters

      return {
        continents: Object.keys(continents).filter(c => continents[c]),
        countries: Object.keys(countries).filter(c => countries[c]),
      }
    },

    ...mapGetters(['allContinents', 'allCountries', 'allContacts'])
  },

  watch: {
    activeMenu(index, from) {
      if (index === from) return;

      this.$nextTick(() => {
        if (!this.$refs.menu || !this.$refs.menu[index]) {
          this.dropdown.height = 0
        } else {
          this.dropdown.height = `${this.$refs.menu[index].clientHeight + 26}px`
        }
      })
    }
  },

  methods: {
    setFilter(filter, option) {

      if (filter === 'continents') {
        this.updateCountryFilters()
      }

      setTimeout(() => {
        this.clearFilter(filter, option, this.filters[filter][option])
      }, 100)
    },

    clearFilter(filter, except, active) {
      Object.keys(this.filters[filter]).forEach(option => {
        this.filters[filter][option] = except === option && !active
      })
    },

    clearAllFilters() {
      Object.keys(this.filters).forEach(this.clearFilter)
      this.updateCountryFilters()
    },

    setMenu(menu, active) {
      Object.keys(this.menus).forEach(tab => {
        this.menus[tab] = !active && tab === menu
      })
    },

    updateCountryFilters() {
      setTimeout(() => {
        const activeContinents = this.allContinents.filter(c => this.activeFilters.continents.includes(c.name));

        this.filters.countries = {};

        if (activeContinents.length) {
          console.log('active Continents!')

          activeContinents.forEach(continent => {
            let filteredCountries = continent.countries;

            continent.countries.forEach(country => {
              this.filters.countries[country.name] = false
            });
          })
        }
        else {
          this.allContinents.forEach(continent => {
            continent.countries.forEach(country => {
              this.filters.countries[country.name] = false
            })
          })
        }


        activeContinents.forEach(continent => {
          let filteredCountries = continent.countries;

          continent.countries.forEach(country => {
            this.filters.countries[country.name] = false
          });
        })
      }, 200)
    }
  },

  mounted() {
    setTimeout(() => {
      this.continents = this.allContinents

      this.allContinents.forEach((continent) => {
        this.filters.continents[continent.name] = false
      })
    }, 500)

    setTimeout(() => {
      this.contacts = this.allContacts

      this.allContacts.forEach(({ countries }) => {
        countries.forEach(country => {
          this.filters.countries[country.name] = false
        })
      })
    }, 500)
  }
}
</script>

<template>
  <nav class="nav">
    <menu class="nav__controls">
      <li v-for="(active, menu) in menus" class="nav__label" :class="{
        'nav__label--active': active,
        'nav__label--filter': activeFilters[menu].length
      }" @click="setMenu(menu, active)">
        {{ menu }}
      </li>

      <li class="nav__label nav__label--clear" @click="clearAllFilters">Clear all</li>
    </menu>
  </nav>

  <transition-group name="dropdown" tag="section" class="dropdown" :style="dropdown">
    <menu v-for="(options, filter) in filters" class="filters" v-show="menus[filter]" ref="menu" :key="filter">
      <li v-for="(active, option) in options" class="filters__item" :class="{ 'filters__item--active': active }"
        :key="option" @click="setFilter(filter, option)">
        {{ option }}
      </li>
    </menu>
  </transition-group>

  <contact-list :contacts="contactsList" />
</template>

<style lang="sass" />