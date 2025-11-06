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
                    :style="{ 'border-color': stepperDummy > 1 ? '#1976D2' : '#e0e0e0' }"
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
                    :style="{ 'border-color': stepperDummy > 2 ? '#1976D2' : '#e0e0e0' }"
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
                    :style="{ 'border-color': stepperDummy > 3 ? '#1976D2' : '#e0e0e0' }"
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
                    :style="{ 'border-color': stepperDummy > 4 ? '#1976D2' : '#e0e0e0' }"
                    class="mx-2"
                  ></v-divider>
                </v-stepper-header>
              </v-stepper>

              <v-form ref="form" @submit.prevent="validateAndProceed">
                <v-card class="my-2 pa-4 card-shadow">
                  <v-card-title class="text-h6 card-title-responsive mb-2">
                    SELECT APPLICATION
                  </v-card-title>
                  <v-divider class="mb-4"></v-divider>
                  <v-card-text>
                    <v-card class="mb-4 card-section">
                      <v-card-title class="text-h6 card-title-responsive section-title">
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-format-list-bulleted</v-icon
                        >
                        TYPE OF APPLICATION
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-radio-group
                          v-model="selectedApplicationType"
                          :rules="[(v) => !!v || 'Please select an application type.']"
                          mandatory
                          hide-details
                          class="mt-0 pt-0"
                        >
                          <v-row>
                            <v-col cols="12" md="6">
                              <v-card
                                :class="{
                                  'card-selected': selectedApplicationType === 'partial',
                                }"
                                @click="selectedApplicationType = 'partial'"
                                class="pa-4 custom-radio-card"
                                flat
                              >
                                <div class="d-flex align-center">
                                  <v-radio :value="'partial'"></v-radio>
                                  <div class="flex-grow-1 ml-2">
                                    <div class="text-h6 radio-card-title-responsive">
                                      Partial
                                    </div>
                                  </div>
                                  <v-icon
                                    :color="
                                      selectedApplicationType === 'partial'
                                        ? 'blue'
                                        : 'grey'
                                    "
                                    >mdi-home</v-icon
                                  >
                                </div>
                              </v-card>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-card
                                :class="{
                                  'card-selected': selectedApplicationType === 'complete',
                                }"
                                @click="selectedApplicationType = 'complete'"
                                class="pa-4 custom-radio-card"
                                flat
                              >
                                <div class="d-flex align-center">
                                  <v-radio :value="'complete'"></v-radio>
                                  <div class="flex-grow-1 ml-2">
                                    <div class="text-h6 radio-card-title-responsive">
                                      Complete
                                    </div>
                                  </div>
                                  <v-icon
                                    :color="
                                      selectedApplicationType === 'complete'
                                        ? 'blue'
                                        : 'grey'
                                    "
                                    >mdi-truck</v-icon
                                  >
                                </div>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-radio-group>
                      </v-card-text>
                    </v-card>
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-end mt-6 mb-8">
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
  name: "BuildingPermitPageWithApplicationStep",
  data() {
    return {
      currentStep: 0,
      notificationsVisible: false,
      steps: [
        "Fill up the Unified Application Form",
        "Download Filled-up Unified Application Form and Completion Permits",
      ],
      selectedApplicationType: null,
      isValidating: false,
      stepperDummy: 1, // for visual stepper only
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
    async validateAndProceed() {
      this.isValidating = true;
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.isValidating = false;
        this.stepperDummy = 2;
        this.$router.push("/applicant/OPowner");
      }
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

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.custom-radio-card {
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  border-radius: 10px;
}

.custom-radio-card:hover {
  border-color: #bbdefb;
  box-shadow: 0 0 8px rgba(25, 118, 210, 0.1);
}

.card-selected {
  border: 2px solid #1976d2;
  box-shadow: 0 0 12px rgba(25, 118, 210, 0.2);
  background-color: #e3f2fd !important;
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
