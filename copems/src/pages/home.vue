<template>
  <div class="page-wrapper">
    <v-main>
      <v-container fluid class="pa-0">
        <section class="hero-section d-flex align-center justify-center">
          <v-container class="hero-content text-left">
            <h1 class="hero-title">
              One Stop Shop for<br />Construction Permits
            </h1>
            <p class="hero-subtitle">
              Fast, Efficient, and Convenient Permit Processing in Naga City
            </p>
            <div class="d-flex mt-6">
              <v-btn color="#2962FF" dark large to="/login">
                <v-icon left>mdi-file-edit-outline</v-icon>
                Apply Now
              </v-btn>
            </div>
          </v-container>
        </section>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import nagaImage from "@/assets/naga.png";

export default {
  name: "HomePage",
  data() {
    return {
      backgroundImageUrl: nagaImage,
    };
  },
  methods: {
    goToLogin() {
      window.location.href = "/alogin";
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  background-color: #f7f7f7;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

/* Hero section with local background image */
.hero-section {
  width: 100%;
  min-height: calc(100vh - 88px);
  background-image: url("@/assets/naga.png");

  /* Retaining the fix to show the whole image */
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0 16px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
}

.hero-section::before {
  content: none;
}

.hero-content {
  /* KEY CHANGE: Setting the max-width here aligns it with the App Bar content */
  max-width: 1600px; /* Aligns with the 1600px set on the App Bar's v-container */
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  box-shadow: none;
}

.v-btn.v-size--large {
  height: 48px;
}

.v-btn.text-white {
  color: white !important;
  border-color: white;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
