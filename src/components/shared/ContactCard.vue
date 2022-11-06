<script>
import QrCode from "qrcode.vue";

export default {
  components: {
    QrCode,
  },
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      detailsAreVisible: true,
      qrSize: 250,
    };
  },
  computed: {
    vCardName() {
      return (
        "Lawo_" + this.contact.firstName + "_" + this.contact.lastName + ".vcf"
      );
    },
    vCardLink() {
      const vCard = new Blob([this.contact.vCard], { type: "text/vcard" });
      return window.URL.createObjectURL(vCard);
    },
  },
};
</script>

<template>
  <div class="sc_card">
    <div class="sc_wrapper">
      <div class="sc_section">
        <figure class="sc_user-image" @click="toggleDetails">
          <img
            :src="'wp-content/plugins/lawo-api-client/images/no-image.jpg'"
          />
        </figure>

        <div class="sc_userinfo">
          <!-- <div v-if="contact.countries.length > 1" class="sc_country">
            {{ contact.countries.length }} Countries
          </div>
          <div v-else-if="contact.countries.length == 1" class="sc_country">
            {{ contact.countries[0].name }}
          </div> -->

          <div class="sc_name">
            {{ contact.firstName }} {{ contact.lastName }}
          </div>

          <!-- Todo: Filter -->
          <div
            v-if="
              contact.countries.length > 1 && contact.salesCompanies.length > 1
            "
          >
            {{ contact.salesCompanies.length }} Companies
          </div>
          <div v-else-if="contact.salesCompanies.length == 1">
            {{ contact.salesCompanies[0].name }}
          </div>
        </div>
      </div>

      <div class="sc_section">
        <div v-if="detailsAreVisible" class="sc_details">
          <div class="sc_detail-item">
            <figure v-if="contact.phone.length > 0">
              <img
                class="sc_detail-item-icon"
                :src="'wp-content/plugins/lawo-api-client/images/phone-call.svg'"
              />
            </figure>
            <a v-if="contact.phone.length > 0" :href="'tel:' + contact.phone">{{
              contact.phone
            }}</a>
          </div>
          <div class="sc_detail-item">
            <figure v-if="contact.mobile.length > 0">
              <img
                class="sc_detail-item-icon"
                :src="'wp-content/plugins/lawo-api-client/images/phone-call.svg'"
              />
            </figure>
            <a
              v-if="contact.mobile.length > 0"
              :href="'tel:' + contact.mobile"
              >{{ contact.mobile }}</a
            >
          </div>
          <div class="sc_detail-item">
            <figure v-if="contact.email.length > 0">
              <img
                class="sc_detail-item-icon"
                :src="'wp-content/plugins/lawo-api-client/images/email.svg'"
              />
            </figure>
            {{ contact.email }}
          </div>
          <div class="sc_detail-item">
            <figure v-if="contact.website.length > 0">
              <img
                class="sc_detail-item-icon"
                :src="'wp-content/plugins/lawo-api-client/images/web.svg'"
              />
            </figure>
            <a v-if="contact.website.length > 0" :href="contact.website">{{
              contact.website
            }}</a>
          </div>
        </div>

        <figure class="sc_qrcode">
          <qr-code :value="contact.vCard" :size="qrSize" level="Q" />
        </figure>
      </div>
    </div>

    <div class="sc-button-container">
      <button class="sc-button">
        <a class="" :download="vCardName" :href="vCardLink"
          >Visitenkarte speichern</a
        >
      </button>
    </div>
    <div class="sc_card-oblique"></div>
  </div>
</template>
