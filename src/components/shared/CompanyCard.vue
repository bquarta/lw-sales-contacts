<script>
import QrCode from "qrcode.vue";
import axios from "axios";

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
    imagePath() {
      return (
        window.location.origin + "/wp-content/plugins/lawo-api-client/images/"
      );
    },
    vCardName() {
      return "Lawo_" + this.contact.name + ".vcf";
    },
    vCardLink() {
      const vCard = new Blob([this.contact.vCard], { type: "text/vcard" });
      return window.URL.createObjectURL(vCard);
    },
  },
  methods: {
    send() {
      this.decrypt().then((email) => {
        location.href = "mailto:" + email;
      });
    },
    encrypt() {
      return new Promise((resolve, reject) => {
        axios
          .post("https://lapi.ocean-erp.de/encrpyt?input=" + this.contact.email)
          .then((response) => {
            resolve(response.data);
          });
      });
    },
    decrypt() {
      return new Promise((resolve, reject) => {
        this.encrypt().then((x) => {
          axios
            .post("https://lapi.ocean-erp.de/decrpyt?input=" + x)
            .then((response) => {
              resolve(response.data);
            });
        });
      });
    },
  },
};
</script>

<template>
  <div class="sc_card">
    <div class="sc_wrapper">
      <div class="sc_section">
        <figure class="sc_user-image" @click="toggleDetails">
          <img v-if="(contact.image != null && contact.image != '')" :src="imagePath + 'user-images/' + contact.image" />
          <img v-else :src="imagePath + 'user-images/p_no-image.jpg'" />
        </figure>

        <div class="sc_userinfo">
          <!-- <div v-if="contact.countries.length > 1" class="sc_country">
            {{ contact.countries.length }} Countries
          </div>
          <div v-else-if="contact.countries.length == 1" class="sc_country">
            {{ contact.countries[0].name }}
          </div> -->

          <div class="sc_name">
            {{ contact.name }}
          </div>

          <!--
          <div v-if="contact.countries.length > 1 && contact.salesCompanies.length > 1">
            {{ contact.salesCompanies.length }} Companies
          </div>
          <div v-else-if="contact.salesCompanies.length == 1">
            <template v-if="contact.salesCompanies[0].isExternal">
              {{ contact.salesCompanies[0].name }}
            </template>
          </div>    
          -->
        </div>
      </div>

      <div class="sc_section">
        <div v-if="detailsAreVisible" class="sc_details">
          <div class="sc_detail-item">
            <figure v-if="contact.phone.length > 0">
              <img
                class="sc_detail-item-icon"
                :src="imagePath + 'phone-call.svg'"
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
                :src="imagePath + 'phone-call.svg'"
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
              <img class="sc_detail-item-icon" :src="imagePath + 'email.svg'" />
            </figure>
            <a href="#" @click="send()"> Email </a>
          </div>
          <div class="sc_detail-item">
            <figure v-if="contact.website.length > 0">
              <img class="sc_detail-item-icon" :src="imagePath + 'web.svg'" />
            </figure>
            <a v-if="contact.website.length > 0" :href="contact.website">{{
              contact.website
            }}</a>
          </div>
        </div>

        <figure class="sc_qrcode">
          <a :download="vCardName" :href="vCardLink" title="Download VCard">
            <qr-code :value="contact.vCard" :size="qrSize" level="Q" />
          </a>
        </figure>
      </div>
    </div>

    <div class="sc-button-container">
      <button class="sc-button">
        <a class="" :download="vCardName" :href="vCardLink">Download VCard</a>
      </button>
    </div>
    <div class="sc_card-oblique company"></div>
  </div>
</template>
