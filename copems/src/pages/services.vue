<template>
  <v-app>
    <v-main class="bg-grey-lighten-4 d-flex align-center justify-center">
      <div class="one-stop-container">
        <h1
          class="text-h4 text-sm-h3 text-center font-weight-bold mb-8 mb-sm-12"
        >
          ONE-STOP SHOP SERVICES
        </h1>

        <v-row justify="center" class="service-cards-row">
          <v-col cols="12" sm="6" lg="4">
            <v-card
              class="service-card text-center pa-6 ma-2 elevation-0 rounded-lg"
            >
              <v-icon size="48" color="#007bff" class="mb-4">
                mdi-map-marker-outline
              </v-icon>
              <div class="text-h6 font-weight-bold mb-2">
                Locational Clearance
              </div>
              <div
                class="text-caption text-medium-emphasis mb-6 card-description"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem
                velit viverra faucibus.
              </div>
              <v-btn
                color="#007bff"
                class="text-white apply-button"
                flat
                @click="showSmallDialog"
              >
                Apply now
              </v-btn>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <v-card
              class="service-card text-center pa-6 ma-2 elevation-0 rounded-lg"
            >
              <v-icon size="48" color="#007bff" class="mb-4">
                mdi-office-building
              </v-icon>
              <div class="text-h6 font-weight-bold mb-2">Building Permit</div>
              <div
                class="text-caption text-medium-emphasis mb-6 card-description"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem
                velit viverra faucibus.
              </div>

              <div class="d-flex align-center justify-center pt-2">
                <v-btn
                  color="#007bff"
                  class="text-white apply-button me-2"
                  flat
                  @click="showSmallDialog"
                >
                  Apply now
                </v-btn>
                <v-menu location="bottom end">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon
                      variant="text"
                      size="small"
                      v-bind="props"
                      class="more-options-btn"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list density="compact">
                    <v-list-item to="/applicant/noc">
                      <v-list-item-title
                        >Apply for Notice of Construction</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <v-card
              class="service-card text-center pa-6 ma-2 elevation-0 rounded-lg"
            >
              <v-icon size="48" color="#007bff" class="mb-4">
                mdi-key-outline
              </v-icon>
              <div class="text-h6 font-weight-bold mb-2">Occupancy Permit</div>
              <div
                class="text-caption text-medium-emphasis mb-6 card-description"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem
                velit viverra faucibus.
              </div>
              <v-btn
                color="#007bff"
                class="text-white apply-button"
                flat
                @click="showSmallDialog"
              >
                Apply now
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <v-dialog v-model="smallDialog" max-width="350">
        <v-card class="rounded-lg elevation-8">
          <v-card-title
            class="pa-4 d-flex align-center justify-center text-center primary-bg-color"
          >
            <v-icon left dark color="white" class="me-2"
              >mdi-information-outline</v-icon
            >
            <span class="text-white text-subtitle-1 font-weight-bold"
              >Service Application Info</span
            >
          </v-card-title>

          <v-card-text class="py-6 px-4 text-center">
            <v-icon size="40" color="green" class="mb-3"
              >mdi-check-circle-outline</v-icon
            >
            <div class="text-subtitle-1 font-weight-medium mb-1 text-black">
              Application Initiated
            </div>
            <p class="text-caption text-medium-emphasis">
              You are about to start the application process for this permit
              type.
            </p>
          </v-card-text>

          <v-card-actions class="px-4 pb-4">
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              color="#6c757d"
              @click="smallDialog = false"
              class="text-capitalize"
            >
              Cancel
            </v-btn>
            <v-btn
              color="#007bff"
              flat
              @click="smallDialog = false"
              class="text-white apply-button text-capitalize"
            >
              Proceed
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "OneStopShopServices",
  data() {
    return {
      smallDialog: false, // State for the new small dialog
    };
  },
  methods: {
    showSmallDialog() {
      this.smallDialog = true;
      console.log("Showing small info dialog.");
    },
    // The applyForNoticeOfConstruction method is no longer needed but kept for completeness,
    // though the template now uses 'to="/noc"' directly on the list item.
    applyNow(service) {
      this.showSmallDialog(); // Use the new dialog for the action
    },
    applyForNoticeOfConstruction() {
      // This method is now obsolete for the "Apply for Notice of Construction" list item
      // but can be used for other purposes if needed.
      this.showSmallDialog();
    },
  },
};
</script>

<style scoped>
/* Scoped styles to match the image design */

.bg-grey-lighten-4 {
  background-color: #f7f7f7 !important; /* Lighter background for the app */
}

.primary-bg-color {
  background-color: #007bff !important; /* Blue background for the dialog title */
}

.one-stop-container {
  /* Set max width to contain the content like in the image */
  max-width: 1200px;
  width: 95%;
  padding: 40px 20px; /* Padding for mobile view */
  background-color: white;
  border-radius: 20px; /* Rounded corners for the entire section */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

@media (min-width: 600px) {
  .one-stop-container {
    padding: 60px 40px;
  }
}

.service-cards-row {
  margin-left: -16px;
  margin-right: -16px;
}

.service-card {
  height: 100%; /* Ensures all cards are the same height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* Card styling: white background, light shadow */
  background-color: white !important;
  border: 1px solid #eee; /* Subtle border */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
  transition: box-shadow 0.3s ease;
}

.service-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.card-description {
  color: #6c757d !important; /* Grey text color for description */
  font-size: 0.85rem !important;
  flex-grow: 1; /* Pushes the button and menu to the bottom */
}

.apply-button {
  text-transform: none !important; /* Keep button text lowercase */
  font-weight: 500;
  border-radius: 6px;
  padding: 0 24px;
}

.more-options-btn {
  color: #6c757d; /* Slightly muted color for the dots icon */
}
</style>