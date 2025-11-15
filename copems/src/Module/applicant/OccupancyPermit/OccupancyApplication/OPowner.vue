<template>
  <v-app>
    <v-main class="no-scroll">
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
                  :color="currentStep === index ? 'blue-lighten-5' : '#f6f8fa'"
                  class="d-flex align-center pa-3 mb-4 rounded-lg quick-guide-step"
                  :class="{
                    'clickable-step': index === 0,
                    'active-step': currentStep === index,
                  }"
                  @click="goToStep(index)"
                  elevation="currentStep === index ? 3 : 0"
                  style="transition: box-shadow 0.16s, background 0.16s"
                >
                  <v-avatar
                    :color="currentStep === index ? 'primary' : '#2563EB'"
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
              <v-stepper
                v-model="stepperDummy"
                alt-labels
                flat
                class="mb-6 stepper-elevated"
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

              <v-form ref="form" @submit.prevent="validateAndProceed">
                <v-card class="my-2 pa-4 card-shadow">
                  <v-card-title class="text-h6 card-title-responsive mb-2">
                    OWNER/APPLICANT DETAILS
                  </v-card-title>
                  <v-divider class="mb-4"></v-divider>
                  <v-card-text>
                    <v-card class="mb-4 card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-account</v-icon
                          >
                          OWNER/APPLICANT
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12" sm="6" md="4">
                              <div class="plain-label">Last Name:</div>
                              <div class="plain-value">
                                {{ applicantData.lastName }}
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <div class="plain-label">First Name:</div>
                              <div class="plain-value">
                                {{ applicantData.firstName }}
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <div class="plain-label">Middle Name:</div>
                              <div class="plain-value">
                                {{ applicantData.middleInitial }}
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-card class="card-section">
                        <v-card-title class="text-h6 card-title-responsive section-title">
                          <v-icon left color="blue-darken-3" class="mr-2"
                            >mdi-map-marker</v-icon
                          >
                          ADDRESS
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row dense>
                            <v-col cols="12" sm="6" md="3">
                              <div class="plain-label">No. Street:</div>
                              <div class="plain-value">
                                {{ applicantData.street }}
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <div class="plain-label">Barangay:</div>
                              <div class="plain-value">
                                {{ applicantData.barangay }}
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <div class="plain-label">City/Municipality:</div>
                              <div class="plain-value">
                                {{ applicantData.city }}
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <div class="plain-label">Contact No.:</div>
                              <div class="plain-value">
                                {{ applicantData.contactNo }}
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-text>
                    </v-card>
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-end mt-6 mb-8">
                  <v-btn
                    color="blue-grey-4"
                    class="btn-rounded mr-2"
                    elevation="2"
                    variant="tonal"
                    @click="goBack"
                  >
                    <v-icon left>mdi-arrow-left</v-icon>Back
                  </v-btn>
                  <v-btn
                    color="blue-darken-3"
                    class="btn-rounded"
                    elevation="2"
                    @click="validateAndProceed"
                    variant="elevated"
                  >
                    Next<v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BuildingPermitPageWithStepper",
  data() {
    return {
      currentStep: 1,
      notificationsVisible: false,
      steps: [
        "Fill up the Unified Application Form",
        "Download Filled-up Unified Application Form and Completion Permits",
      ],
      applicantData: {
        lastName: "DELA CRUZ",
        firstName: "JUAN",
        middleInitial: "P.",
        street: "123 Main St.",
        barangay: "San Roque",
        city: "Legazpi City",
        contactNo: "0917-123-4567",
      },
      stepperDummy: 2, // for visual stepper only
    };
  },
  methods: {
    handleLogout() {
      console.log("User logged out");
    },
    goToStep(index) {
      this.currentStep = index;
    },
    showNotifications() {
      this.notificationsVisible = true;
      console.log("Toggling notifications menu");
    },
    validateAndProceed() {
      this.$router.push("/applicant/OPlocation");
    },
    goBack() {
      this.$router.push("/applicant/OPtype");
    },
  },
};
</script>

<style scoped>
.no-scroll {
  overflow: hidden !important;
}
.v-main.no-scroll {
  height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  background: #f6fafd;
}
.content-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 24px;
}
.main-content-bg {
  background: #f6fafd;
  border-radius: 0 24px 24px 0;
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

:deep(.v-stepper-item--selected .v-stepper-item__step) {
  background-color: #1976d2 !important;
  color: #fff !important;
}

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
.plain-label {
  font-size: 0.8rem;
  color: #616161;
  font-weight: 500;
  margin-bottom: 2px;
}

.plain-value {
  font-size: 1rem;
  color: #212121;
  font-weight: 600;
  padding: 6px 0;
  min-height: 38px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 12px;
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
  font-weight: 600;
  letter-spacing: 0.03em;
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
