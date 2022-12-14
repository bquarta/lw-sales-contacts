<script>
import { mapGetters } from "vuex";
import ContactList from "./ContactList.vue";

export default {
  components: { ContactList },

  data() {
    return {
      dropdown: { height: 0 },
      filters: { continents: {}, countries: {} },
      menus: { continents: false, countries: false },
    };
  },

  computed: {
    imagePath() {
      return (
        window.location.origin + "/wp-content/plugins/lawo-api-client/images/"
      );
    },
    isFilters() {
      return (
        this.activeFilters.countries.length ||
        (this.activeFilters.continents.length &&
          this.activeFilters.countries.length)
      );
    },

    activeMenu() {
      return Object.keys(this.menus).reduce(
        ($$, set, i) => (this.menus[set] ? i : $$),
        -1
      );
    },

    activeFilters() {
      let { continents, countries } = this.filters;

      return {
        continents: Object.keys(continents).filter((c) => continents[c]),
        countries: Object.keys(countries).filter((c) => countries[c]),
      };
    },

    activeMenu() {
      const activeMenu = Object.keys(this.menus).reduce(
        ($$, set, i) => (this.menus[set] ? i : $$),
        -1
      );
      return activeMenu;
    },

    companiesList() {
      let { countries: countryFilters } = this.activeFilters;
      let activeContinents = this.allContinents.filter((c) =>
        this.activeFilters.continents.includes(c.name)
      );
      let unsortedList = [];

      activeContinents.forEach((continent) => {
        unsortedList = [...unsortedList, ...continent.countries];
      });

      const sortedList = unsortedList.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      return this.allCompanies.filter(({ countries }) => {
        if (!countryFilters.length) {
          if (!sortedList.length) {
            return true;
          } else {
            const found = countries.filter((c) => {
              const x = sortedList.filter((continentCountry) => {
                return false; //c.name === continentCountry.name;
              });
              return x.length ? true : false;
            });

            return found.length ? true : false;
          }
        } else {
          return countryFilters.every((country) => {
            let filteredCountries = countries.filter((c) => c.name === country);
            return filteredCountries.length ? true : false;
          });
        }
      });
    },

    contactsList() {
      let { countries: countryFilters } = this.activeFilters;
      let activeContinents = this.allContinents.filter((c) =>
        this.activeFilters.continents.includes(c.name)
      );
      let unsortedList = [];

      activeContinents.forEach((continent) => {
        unsortedList = [...unsortedList, ...continent.countries];
      });

      const sortedList = unsortedList.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      return this.allContacts.filter(({ countries }) => {
        if (!countryFilters.length) {
          if (!sortedList.length) {
            return true;
          } else {
            const found = countries.filter((c) => {
              const x = sortedList.filter((continentCountry) => {
                return false; //c.name === continentCountry.name;
              });
              return x.length ? true : false;
            });

            return found.length ? true : false;
          }
        } else {
          return countryFilters.every((country) => {
            let filteredCountries = countries.filter((c) => c.name === country);
            return filteredCountries.length ? true : false;
          });
        }
      });
    },

    ...mapGetters(["allContinents", "allContacts", "allCompanies"]),
  },

  methods: {
    setFilter(filter, option) {
      if (filter === "continents") {
        this.updateCountryFilters();
      }

      setTimeout(() => {
        this.clearFilter(filter, option, this.filters[filter][option]);

        // Close active Filter-Tab after filter has been selected
        this.menus[filter] = !this.menus[filter];
      }, 100);
    },

    clearFilter(filter, except, active) {
      Object.keys(this.filters[filter]).forEach((option) => {
        this.filters[filter][option] = except === option && !active;
      });
    },

    clearAllFilters() {
      Object.keys(this.filters).forEach(this.clearFilter);
      this.updateCountryFilters();
    },

    setMenu(menu, active) {
      Object.keys(this.menus).forEach((tab) => {
        this.menus[tab] = !active && tab === menu;
      });
    },

    updateCountries(list) {
      let unsortedList = [];

      list.forEach((continent) => {
        unsortedList = [...unsortedList, ...continent.countries];
      });

      const sortedList = unsortedList.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      sortedList.forEach((country) => {
        this.filters.countries[country.name] = false;
      });
    },

    updateCountryFilters() {
      setTimeout(() => {
        const activeContinents = this.allContinents.filter((c) =>
          this.activeFilters.continents.includes(c.name)
        );

        this.filters.countries = {};

        if (activeContinents.length) this.updateCountries(activeContinents);
        else this.updateCountries(this.allContinents);
      }, 200);
    },

    updateCompanies(list) {
      let unsortedList = [];

      list.forEach((continent) => {
        unsortedList = [...unsortedList, ...continent.countries];
      });

      const sortedList = unsortedList.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      sortedList.forEach((country) => {
        this.filters.countries[country.name] = false;
      });
    },

    updateCompanyFilters() {
      setTimeout(() => {
        const activeContinents = this.allContinents.filter((c) =>
          this.activeFilters.continents.includes(c.name)
        );

        this.filters.companies = {};

        if (activeContinents.length) this.updateCompanies(activeContinents);
        else this.updateCompanies(this.allCompanies);
      }, 200);
    },
  },

  watch: {
    activeMenu(index, from) {
      if (index === from) return;

      this.$nextTick(() => {
        if (!this.$refs.menu || !this.$refs.menu[index]) {
          this.dropdown.height = 0;
        } else {
          this.dropdown.height = `${
            this.$refs.menu[index].clientHeight + 26
          }px`;
        }
      });
    },
  },

  mounted() {
    setTimeout(() => {
      this.allContinents.forEach((continent) => {
        this.filters.continents[continent.name] = false;
      });

      this.updateCountryFilters();
    }, 3000);
  },
};
</script>

<template>
  <nav class="nav">
    <figure>
      <img :src="imagePath + 'filter.svg'" />
    </figure>

    <div
      v-for="(active, menu) in menus"
      class="nav__label"
      :class="{
        'nav__label--active': active,
        'nav__label--filter': activeFilters[menu].length,
      }"
      @click="setMenu(menu, active)"
    >
      <span v-if="activeFilters[menu].length">
        <template v-for="(key, filter) in filters[menu]">
          <template v-if="key">{{ filter }}</template>
        </template>
      </span>
      <span v-else>Filter {{ menu }}</span>
    </div>

    <div class="nav__label nav__label--clear" @click="clearAllFilters">
      <img :src="imagePath + 'refresh.svg'" />
    </div>
  </nav>

  <transition-group
    name="dropdown"
    tag="section"
    class="dropdown"
    :style="dropdown"
  >
    <ul
      v-for="(options, filter) in filters"
      class="filters"
      v-show="menus[filter]"
      ref="menu"
      :key="filter"
    >
      <li
        v-for="(active, option) in options"
        class="filters__item"
        :class="{ 'filters__item--active': active }"
        :key="option"
        @click="setFilter(filter, option)"
      >
        {{ option }}
      </li>
    </ul>
  </transition-group>

  <contact-list
    v-if="isFilters"
    :contacts="contactsList"
    :companies="companiesList"
  />
  <div class="filters__info" v-else>
    <p>Please select a continent and country from the filter above.</p>
  </div>
</template>

<style lang="sass" />
