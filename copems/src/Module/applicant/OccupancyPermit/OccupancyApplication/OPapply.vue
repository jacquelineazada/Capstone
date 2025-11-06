<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app>
      <v-toolbar-title class="text-h5 font-weight-bold page-title-gradient">
        <v-icon color="white" class="mr-2">mdi-office-building</v-icon>
        Construction Permit Management System
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        v-model="notificationsVisible"
        :close-on-content-click="false"
        location="bottom right"
        max-width="380"
        :offset="[92, 2]"
        transition="slide-y-transition"
        content-class="notification-menu-popover"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon class="mr-2" v-bind="props">
            <v-badge content="2" color="red" dot floating overlap>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card class="notifications-card pa-0" elevation="12" width="380">
          <div class="d-flex justify-space-between align-center pa-4">
            <div class="text-h6 font-weight-bold text-grey-darken-4">Notifications</div>
            <v-btn icon size="small" variant="text" @click="notificationsVisible = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <v-divider></v-divider>

          <v-list class="pa-4 list-notifications">
            <v-card color="green-lighten-5" class="pa-3 mb-4 notification-item" flat>
              <div class="d-flex align-start">
                <v-icon color="green-darken-2" class="mr-3 mt-1">mdi-check-circle</v-icon>
                <div>
                  <div class="font-weight-bold text-green-darken-4 mb-1">
                    Application Submitted Successfully
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    Application ID: BP-2025-001
                    <span class="font-weight-bold ml-1">3 hours ago</span>
                  </div>
                  <p class="text-body-2 text-green-darken-4 mt-2">
                    Your building permit application has been successfully submitted and
                    is now being processed.
                  </p>
                </div>
              </div>
            </v-card>

            <v-card color="blue-lighten-5" class="pa-3 notification-item" flat>
              <div class="d-flex align-start">
                <v-icon color="info" class="mr-3 mt-1">mdi-information</v-icon>
                <div>
                  <div class="font-weight-bold text-blue-darken-4 mb-1">
                    Building Permit Application Number Assigned
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    Application ID: BP-2025-001
                    <span class="font-weight-bold ml-1">3 hours ago</span>
                  </div>
                  <p class="text-body-2 text-blue-darken-4 mt-2">
                    Your building permit application number **BP-2025-001** has been
                    assigned. Please use this number for all future communications.
                  </p>
                </div>
              </div>
            </v-card>
          </v-list>
          <div class="text-center pb-2">
            <v-btn variant="text" color="primary" size="small"> View All </v-btn>
          </div>
        </v-card>
      </v-menu>
    </v-app-bar>

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
                  :elevation="currentStep === index ? 3 : 0"
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
                  color="blue-darken-3"
                  variant="flat"
                  to="/login"
                  class="text-capitalize font-weight-bold"
                  @click="handleLogout"
                >
                  <v-icon left>mdi-logout</v-icon>
                  Logout
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="9" class="pa-6 main-content-bg">
            <v-card flat class="released-permit-card">
              <div class="d-flex justify-space-between align-center mb-6 px-6 pt-6">
                <div class="d-flex align-center">
                  <v-icon class="mr-2" size="24" color="grey-darken-3"
                    >mdi-file-document-outline</v-icon
                  >
                  <h2 class="text-h6 font-weight-medium text-grey-darken-4">
                    Released Building Permit
                  </h2>
                </div>
                <v-chip
                  color="blue-darken-1"
                  variant="flat"
                  size="small"
                  class="font-weight-bold"
                >
                  <v-icon start size="18">mdi-check-circle</v-icon>
                  Released
                </v-chip>
              </div>

              <div class="px-6 pb-6">
                <v-card flat class="pa-3 mb-6 permit-number-box">
                  <div
                    class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                  >
                    BUILDING PERMIT NUMBER
                  </div>
                  <div class="text-h5 font-weight-bold text-blue-darken-2">
                    BP-2025-001
                  </div>
                </v-card>

                <v-row dense class="mb-4">
                  <v-col cols="12" sm="6">
                    <div
                      class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                    >
                      APPLICATION DATE
                    </div>
                    <div class="d-flex align-center text-body-1 text-grey-darken-3">
                      <v-icon size="20" class="mr-2" color="grey-darken-1"
                        >mdi-calendar-month</v-icon
                      >
                      <span class="font-weight-medium">January 15, 2024</span>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div
                      class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                    >
                      RELEASE DATE
                    </div>
                    <div class="d-flex align-center text-body-1 text-grey-darken-3">
                      <v-icon size="20" class="mr-2" color="grey-darken-1"
                        >mdi-calendar-check</v-icon
                      >
                      <span class="font-weight-medium">March 20, 2024</span>
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>

                <v-row dense class="mb-4">
                  <v-col cols="12" sm="6">
                    <div
                      class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                    >
                      PERMIT STATUS
                    </div>
                    <div class="d-flex align-center text-body-1" style="color: #2e7d32">
                      <v-icon size="10" class="mr-2" color="#2e7d32">mdi-circle</v-icon>
                      <span class="font-weight-bold" style="color: #2e7d32"
                        >Active & Valid</span
                      >
                    </div>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <div
                      class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                    >
                      VALIDITY PERIOD
                    </div>
                    <div class="text-body-1 text-grey-darken-3 font-weight-medium">
                      Valid until March 20, 2026
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>

                <div class="mb-6">
                  <div
                    class="text-caption font-weight-medium text-uppercase text-grey-darken-1 mb-1"
                  >
                    AUTHORIZED PROJECT
                  </div>
                  <div class="text-h6 font-weight-bold text-grey-darken-4 mb-1">
                    Geguaman Residential Building
                  </div>
                  <div class="text-body-2 text-grey-darken-2">
                    456 Main St., Brgy. San Isidro, Naga City
                  </div>
                </div>
              </div>

              <v-card-actions class="d-flex justify-end pt-0 pb-4 px-6">
                <v-btn
                  color="white"
                  variant="flat"
                  elevation="2"
                  size="large"
                  class="text-capitalize font-weight-bold action-button-styled"
                  style="color: #1976d2; background-color: white"
                  to="/applicant/OPtype"
                >
                  Apply for Occupancy Permit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BuildingPermitPage",
  data() {
    return {
      currentStep: 0,
      notificationsVisible: false,
      steps: [
        "Fill up the Unified Application Form",
        "Download Filled-up Unified Application Form and Completion Permits",
      ],
    };
  },
  methods: {
    handleLogout() {
      console.log("User logged out");
    },
    goToStep(index) {
      this.currentStep = index;
      if (index === 0) {
        this.$router.push("/applicant/OPtype");
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
  background: linear-gradient(90deg, #fafdff 70%, #f3f7ff 100%);
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

.released-permit-card {
  margin: 0;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 8px !important;
  padding: 0 !important;
}

.permit-number-box {
  border: 1px solid #e0eeef;
  background-color: #f7f9fc;
  border-radius: 6px !important;
}

.action-button-styled {
  border-radius: 50px !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) !important;
  padding: 0 24px !important;
  height: 48px !important;
  color: #1976d2 !important;
  background-color: white !important;
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
</style>
