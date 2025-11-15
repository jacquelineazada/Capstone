<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 content-area">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="3" class="pa-0">
            <v-card
              flat
              class="pa-4 quick-guide-card d-flex flex-column justify-space-between elevation-2"
              style="border-right: 1px solid #e0e0e0; height: 100%; background: #fcfcff"
            >
              <div>
                <h4 class="mb-2 text-h5 font-weight-bold text-blue-darken-3">
                  Occupancy Permit Application
                </h4>
                <div class="text-subtitle-2 mb-6 text-blue-grey-darken-1">
                  Follow these steps to complete your application
                </div>
                <v-card
                  v-for="(step, index) in steps"
                  :key="index"
                  flat
                  :color="localCurrentStep === index + 1 ? 'blue-lighten-5' : '#f6f8fa'"
                  class="d-flex align-center pa-3 mb-4 rounded-lg quick-guide-step"
                  :class="{
                    'clickable-step': index === 0,
                    'active-step': localCurrentStep === index + 1,
                  }"
                  @click="goToStep(index + 1)"
                  :elevation="localCurrentStep === index + 1 ? 3 : 0"
                  style="transition: box-shadow 0.16s, background 0.16s"
                >
                  <v-avatar
                    :color="localCurrentStep === index + 1 ? 'primary' : '#2563EB'"
                    size="36"
                    class="white--text mr-3 quick-guide-avatar"
                  >
                    <span class="text-h6 font-weight-bold">
                      {{ index + 1 }}
                    </span>
                  </v-avatar>
                  <div class="font-weight-bold text-body-1 step-label">
                    {{ step }}
                  </div>
                </v-card>
              </div>
              <v-spacer></v-spacer>
              <div class="mt-4">
                <v-btn
                  block
                  color="white"
                  variant="flat"
                  to="/login"
                  class="text-capitalize font-weight-bold logout-btn-white"
                  @click="handleLogout"
                >
                  <v-icon left color="black">mdi-logout</v-icon>
                  <span style="color: #222; font-weight: bold">Logout</span>
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="9" class="pa-6 main-content-bg">
            <div class="main-content-wrapper">
              <v-container fluid class="px-0 mx-auto" style="max-width: 1200px">
                <v-stepper
                  v-model="stepperDummy"
                  alt-labels
                  flat
                  class="mb-4 mt-2 stepper-elevated"
                >
                  <v-stepper-header>
                    <v-stepper-item
                      title="Application"
                      value="1"
                      :complete="stepperDummy > 1"
                      :color="stepperDummy >= 1 ? 'blue-darken-1' : 'grey lighten-2'"
                      class="stepper-item-custom"
                    ></v-stepper-item>
                    <v-divider
                      :thickness="3"
                      :style="{
                        'border-color': stepperDummy > 1 ? '#1976D2' : '#e0e0e0',
                      }"
                      class="mx-2"
                    ></v-divider>
                    <v-stepper-item
                      title="Owner/Applicant"
                      value="2"
                      :complete="stepperDummy > 2"
                      :color="stepperDummy >= 2 ? 'blue-darken-1' : 'grey lighten-2'"
                      class="stepper-item-custom"
                    ></v-stepper-item>
                    <v-divider
                      :thickness="3"
                      :style="{
                        'border-color': stepperDummy > 2 ? '#1976D2' : '#e0e0e0',
                      }"
                      class="mx-2"
                    ></v-divider>
                    <v-stepper-item
                      title="Application Details"
                      value="3"
                      :complete="stepperDummy > 3"
                      :color="stepperDummy >= 3 ? 'blue-darken-1' : 'grey lighten-2'"
                      class="stepper-item-custom"
                    ></v-stepper-item>
                    <v-divider
                      :thickness="3"
                      :style="{
                        'border-color': stepperDummy > 3 ? '#1976D2' : '#e0e0e0',
                      }"
                      class="mx-2"
                    ></v-divider>
                    <v-stepper-item
                      title="Signatories Details"
                      value="4"
                      :complete="stepperDummy > 4"
                      :color="stepperDummy >= 4 ? 'blue-darken-1' : 'grey lighten-2'"
                      class="stepper-item-custom"
                    ></v-stepper-item>
                    <v-divider
                      :thickness="3"
                      :style="{
                        'border-color': stepperDummy > 4 ? '#1976D2' : '#e0e0e0',
                      }"
                      class="mx-2"
                    ></v-divider>
                  </v-stepper-header>
                </v-stepper>

                <v-card class="my-2 pa-4 card-shadow">
                  <v-card-title class="text-h6 card-title-responsive mb-2">
                    APPLICATION DETAILS
                  </v-card-title>
                  <v-divider class="mb-4"></v-divider>
                  <v-card-text>
                    <v-form ref="form" v-model="formValid">
                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-clipboard-text</v-icon
                          >
                          Project Details
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12">
                              <div class="plain-label">Project Name:</div>
                              <div class="plain-value">{{ projectName }}</div>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-map-marker</v-icon
                          >
                          LOCATION OF PROJECT
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12" sm="4">
                              <div class="plain-label">BLK. No.:</div>
                              <div class="plain-value">{{ blkNo }}</div>
                            </v-col>
                            <v-col cols="12" sm="4">
                              <div class="plain-label">Street:</div>
                              <div class="plain-value">{{ street }}</div>
                            </v-col>
                            <v-col cols="12" sm="4">
                              <div class="plain-label">Barangay:</div>
                              <div class="plain-value">{{ barangay || "N/A" }}</div>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <div class="plain-label">City/Municipal of:</div>
                              <div class="plain-value">{{ cityMunicipality }}</div>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-home-group</v-icon
                          >
                          USE OR CHARACTER OF OCCUPANCY
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12">
                              <div class="plain-label">Group:</div>
                              <div class="plain-value">{{ occupancyGroup }}</div>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-file-document-multiple</v-icon
                          >
                          PROJECT DETAILS
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12" md="6">
                              <div class="plain-label">OCCUPANCY CLASSIFIED:</div>
                              <div class="plain-value">{{ occupancyClassified }}</div>
                            </v-col>
                            <v-col cols="12" md="6">
                              <div class="plain-label">Date of Completion:</div>
                              <div class="plain-value">{{ dateOfCompletion }}</div>
                            </v-col>
                            <v-col cols="12" md="6">
                              <div class="plain-label">NO. OF UNITS:</div>
                              <div class="plain-value">{{ numberOfUnits }}</div>
                            </v-col>
                            <v-col cols="12" md="6">
                              <div class="plain-label">NO. OF STOREYS:</div>
                              <div class="plain-value">{{ numberOfStoreys }}</div>
                            </v-col>
                            <v-col cols="12" md="12">
                              <div class="plain-label">TOTAL FLOOR AREA (SQ. M):</div>
                              <div class="plain-value">{{ totalFloorArea }}</div>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-end mt-6 mb-8">
                  <v-btn
                    color="blue-grey-4"
                    class="btn-rounded mr-2"
                    elevation="2"
                    @click="goBack"
                    variant="tonal"
                  >
                    <v-icon left>mdi-arrow-left</v-icon>Back
                  </v-btn>
                  <v-btn
                    color="blue-darken-3"
                    class="btn-rounded"
                    elevation="2"
                    @click="goNext"
                    variant="elevated"
                  >
                    Next<v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </v-container>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UnifiedApplicationPage",
  data() {
    return {
      // --- Sidebar Steps (from image_db897b.png) ---
      localCurrentStep: 3,
      notificationsVisible: false,
      steps: [
        "Fill up the Unified Application Form",
        "Download Filled-up Unified Application Form and Completion Permits",
      ],
      // Visual stepper (follows OPtype style)
      stepperDummy: 3,

      // --- Existing Form/Project Data ---
      formValid: false,
      formSubmitted: false,
      projectName: "Proposed Residential Building - 3 Storey",
      blkNo: "Lot 10",
      street: "Emerald St.",
      barangay: "Concepcion Grande",
      cityMunicipality: "Naga City",
      occupancyGroup: "Group A (Residential)",
      occupancyClassified: "Single-Family Dwelling",
      numberOfUnits: "1",
      numberOfStoreys: "3",
      totalFloorArea: "150.75",
      dateOfCompletion: "2024-09-01",
      rules: {
        required: (value) => !!value || "This field is required.",
      },
    };
  },
  methods: {
    handleLogout() {
      console.log("User logged out");
    },
    // Only updates the sidebar steps
    goToStep(stepNumber) {
      this.localCurrentStep = stepNumber;
      console.log(`Going to step: ${stepNumber}`);
    },
    showNotifications() {
      this.notificationsVisible = true;
      console.log("Toggling notifications menu");
    },
    goNext() {
      // Route to OPsignatories page
      this.$router.push("/applicant/OPsignatories");
    },
    goBack() {
      // Route to OPowner page
      this.$router.push("/applicant/OPowner");
    },
  },
});
</script>

<style scoped>
/* ================================================= */
/* --- Styles from Application Shell (Original) --- */
/* ================================================= */
/* Removed .no-scroll to restore main window scrolling */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 24px;
}
.main-content-bg {
  background: #f6fafd;
}
.page-title-gradient {
  color: white;
}
.quick-guide-card {
  min-height: 100%;
  background: #fcfcff;
  border-right: 1px solid #e0e0e0;
}
.quick-guide-step {
  transition: background 0.2s, box-shadow 0.2s;
}
.quick-guide-step:hover {
  background: #e3f0ff !important;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
}
.active-step {
  background: #e7efff !important;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
}
.quick-guide-avatar {
  transition: background 0.2s;
}
.step-label {
  color: #23407c;
}
.notifications-card {
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}
.list-notifications {
  overflow-y: auto;
}
.notification-item {
  border-radius: 8px !important;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* ================================================= */
/* --- Styles for Main Content --- */
/* ================================================= */

/* Gradient Title */
.gradient-text {
  background: linear-gradient(90deg, #1976d2 20%, #1565c0 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stepper-elevated {
  background: transparent;
  border-radius: 14px;
  box-shadow: none;
  padding: 20px 0;
}

.stepper-item-custom .v-stepper-item__step {
  box-shadow: 0 1px 4px 0 rgba(25, 118, 210, 0.13);
  transition: background 0.2s;
}

/* Ensure active step number circle is blue */
:deep(.v-stepper-item--selected .v-stepper-item__step) {
  background-color: #1976d2 !important;
  color: #fff !important;
}

/* Merged/Updated Card Shadow Style */
.card-shadow {
  box-shadow: 0 2px 8px 0 rgba(25, 118, 210, 0.08);
  border-radius: 18px;
  border: 1.5px solid #e3eafc;
}

.card-section {
  background: #f7fafd;
  border-radius: 12px;
  border: 1px solid #e3eafc;
}

.section-title {
  color: #1976d2;
  font-weight: bold;
  font-size: 1.09rem;
  letter-spacing: 0.01em;
}

.textfield-50 .v-input__control {
  min-height: 50px;
  border-radius: 8px;
}

.input-label {
  font-size: 0.85rem;
  color: #2a2a2a;
  margin-bottom: 4px;
  font-weight: 500;
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.plain-label {
  font-size: 0.88rem;
  color: #444;
  font-weight: 500;
  margin-bottom: 2px;
}
.plain-value {
  font-size: 1.08rem;
  color: #222;
  /* UPDATED font-weight to 700 (bold) to match the sample image style */
  font-weight: 700;
  min-height: 32px;
  margin-bottom: 18px;
  word-break: break-word;
}

.page-title-responsive {
  font-size: 1.4rem;
  letter-spacing: 0.02em;
}

@media (max-width: 1200px) {
  .page-title-responsive {
    font-size: 1.12rem !important;
  }
}

@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
}

@media (max-width: 800px) {
  .card-title-responsive {
    font-size: 1.02rem !important;
  }
  .section-title {
    font-size: 0.92rem !important;
  }
}

@media (max-width: 600px) {
  .v-stepper-item .v-stepper-item__title {
    display: none;
  }
  .page-title-responsive {
    font-size: 0.95rem !important;
  }
  .card-title-responsive,
  .section-title {
    font-size: 0.98rem !important;
  }
  .card-shadow,
  .card-section {
    padding: 6px !important;
  }
}

@media (max-width: 480px) {
  .v-card-title {
    font-size: 0.88rem !important;
  }
  .btn-rounded {
    min-width: 90px;
    font-size: 0.9rem;
  }
}
</style>
