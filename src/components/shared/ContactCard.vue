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
          <div v-if="contact.countries.length > 1" class="sc_country">
            {{ contact.countries.length }} Countries
          </div>
          <div v-else-if="contact.countries.length == 1" class="sc_country">
            {{ contact.countries[0].name }}
          </div>

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
            <span v-if="contact.phone.length > 0">Phone:</span>
            {{ contact.phone }}
          </div>
          <div class="sc_detail-item">
            <span>Mobile:</span> {{ contact.mobile }}
          </div>
          <div class="sc_detail-item">
            <span>Email:</span> {{ contact.email }}
          </div>
          <div class="sc_detail-item">
            <span>Web:</span> {{ contact.website }}
          </div>
        </div>

        <figure class="sc_qrcode">
          <qr-code :value="contact.vCard" :size="qrSize" level="Q" />
        </figure>

        <button class="sc-button et_pb_button_wrapper">
          <a
            class="et_pb_button et_pb_promo_button"
            :download="vCardName"
            :href="vCardLink"
            >Visitenkarte speichern</a
          >
        </button>
      </div>
    </div>

    <div class="sc_card-oblique"></div>
  </div>
</template>
