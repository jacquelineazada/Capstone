<template>
  <div class="page-wrapper">

    <v-main>
      <v-container class="main-content">
        <div class="header-section">
          <h1>ONE-STOP SHOP SERVICES</h1>
          <p>
            Streamlined government services designed to make your transactions faster,
            easier, and more convenient. Access multiple permits and clearances in one
            location.
          </p>
        </div>

        <v-row justify="center">
          <v-col cols="12" md="4">
            <v-card class="service-card">
              <v-card-text>
                <div class="icon-container">
                  <v-icon size="32" color="#2962FF">mdi-map-marker</v-icon>
                </div>
                <h3 class="card-title">Locational Clearance</h3>
                <p class="card-description">
                  Obtain official clearance for your business location. Required for
                  establishing commercial operations and ensuring compliance with zoning
                  regulations.
                </p>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-btn block color="#2962FF" dark large to="/">Apply now</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="service-card">
              <v-card-text>
                <div class="icon-container">
                  <v-icon size="32" color="#2962FF">mdi-home-city</v-icon>
                </div>
                <h3 class="card-title">Building Permit</h3>
                <p class="card-description">
                  Secure your construction permit for new buildings, renovations, or
                  structural modifications. Ensures safety compliance and legal
                  construction standards.
                </p>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-btn block color="#2962FF" dark large to="/">Apply now</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="service-card">
              <v-card-text>
                <div class="icon-container">
                  <v-icon size="32" color="#2962FF">mdi-key-variant</v-icon>
                </div>
                <h3 class="card-title">Occupancy Permit</h3>
                <p class="card-description">
                  Get authorization to occupy your completed building. Certifies that your
                  structure meets all safety requirements and building codes for
                  occupancy.
                </p>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-btn block color="#2962FF" dark large to="/">Apply now</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import ApplicantHeader from "@/components/ApplicantHeader.vue";

export default {
  name: "ServicesPage",
};
</script>

<style scoped>
.page-wrapper {
  background-color: rgb(255, 255, 255); /* Light grey background for the page */
  min-height: 100vh;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.main-content {
  padding-top: 4px;
  padding-bottom: 5px;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
}

.header-section h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.header-section p {
  font-size: 1rem;
  color: #6c757d;
  max-width: 750px;
  margin: 0 auto;
  line-height: 1.7;
}

.service-card {
  border-radius: 19px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  border: none;
  background-color: #ffffff;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.v-card__text {
  padding: 32px 24px 16px 24px;
}

.icon-container {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #eaf2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px auto;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

.card-description {
  font-size: 0.95rem;
  color: #7f8c8d;
  line-height: 1.5;
  min-height: 110px; /* Ensures cards have a similar height */
}

.v-card__actions {
  background-color: transparent;
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  box-shadow: none;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .header-section h1 {
    font-size: 1.75rem;
  }
}
</style>
