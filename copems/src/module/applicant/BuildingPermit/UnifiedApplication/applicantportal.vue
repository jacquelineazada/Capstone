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
            <div class="text-h6 font-weight-bold text-grey-darken-4">
              Notifications
            </div>
            <v-btn
              icon
              size="small"
              variant="text"
              @click="notificationsVisible = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <v-divider></v-divider>

          <v-list class="pa-4 list-notifications">
            <v-card
              color="green-lighten-5"
              class="pa-3 mb-4 notification-item"
              flat
            >
              <div class="d-flex align-start">
                <v-icon color="green-darken-2" class="mr-3 mt-1"
                  >mdi-check-circle</v-icon
                >
                <div>
                  <div class="font-weight-bold text-green-darken-4 mb-1">
                    Application Submitted Successfully
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    Application ID: BP-2025-0808-001
                    <span class="font-weight-bold ml-1">3 hours ago</span>
                  </div>
                  <p class="text-body-2 text-green-darken-4 mt-2">
                    Your building permit application has been successfully
                    submitted and is now being processed.
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
                    Application ID: BP-2025-0808-001
                    <span class="font-weight-bold ml-1">3 hours ago</span>
                  </div>
                  <p class="text-body-2 text-blue-darken-4 mt-2">
                    Your building permit application number **BP-2025-0808-001**
                    has been assigned. Please use this number for all future
                    communications.
                  </p>
                </div>
              </div>
            </v-card>
          </v-list>
          <div class="text-center pb-2">
            <v-btn variant="text" color="primary" size="small">
              View All
            </v-btn>
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
              style="
                border-right: 1px solid #e0e0e0;
                height: 100%;
                background: #fcfcff;
              "
            >
              <div>
                <h4 class="mb-2 text-h5 font-weight-bold text-blue-darken-3">
                  Building Permit Application
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
            <v-card flat class="pa-4 rounded-lg application-info-card mb-6">
              <div class="d-flex justify-space-between align-center mb-4">
                <h2 class="text-h4 font-weight-bold text-grey-darken-4">
                  Application BP-2025-0808-001
                </h2>
                <span
                  class="text-subtitle-1 font-weight-medium text-grey d-flex align-center"
                >
                  BP-2025-0808-001
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    color="blue-darken-3"
                    class="ml-2"
                    @click="notificationsVisible = true"
                  >
                    <v-icon>mdi-bell-ring-outline</v-icon>
                  </v-btn>
                </span>
              </div>

              <v-row dense class="text-body-2">
                <v-col cols="6" sm="3" class="pr-4">
                  <div class="font-weight-bold text-grey-darken-1 mb-1">
                    Submission Date:
                  </div>
                  <div class="text-h6 font-weight-medium text-grey-darken-3">
                    January 15, 2024
                  </div>
                </v-col>

                <v-col cols="6" sm="3" class="pr-4 mt-4 mt-sm-0">
                  <div class="font-weight-bold text-grey-darken-1 mb-1">
                    Current Status:
                  </div>
                  <div class="text-h6 font-weight-medium text-success-darken-1">
                    Submitted Application
                  </div>
                </v-col>

                <v-col cols="6" sm="3" class="mt-4 mt-sm-0">
                  <div class="font-weight-bold text-grey-darken-1 mb-1">
                    Last Updated:
                  </div>
                  <div class="text-h6 font-weight-medium text-grey-darken-3">
                    2 minutes ago
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <v-card flat class="pa-4 elevation-1 rounded-lg">
              <h3 class="text-h6 font-weight-bold text-blue-darken-3 mb-6">
                <v-icon color="blue-darken-3" class="mr-2">
                  mdi-chart-timeline-variant
                </v-icon>
                Application Status Tracker
              </h3>

              <v-timeline
                direction="vertical"
                side="end"
                line-thickness="4"
                line-color="grey-lighten-3"
                class="application-timeline"
              >
                <v-timeline-item
                  v-for="(status, index) in applicationStatuses"
                  :key="index"
                  size="small"
                  :icon="status.icon"
                  :dot-color="status.dotColor"
                  class="mb-4"
                >
                  <template v-slot:opposite>
                    <v-chip
                      :color="status.chipColor"
                      label
                      class="font-weight-bold"
                      size="small"
                    >
                      {{ status.status }}
                    </v-chip>
                  </template>

                  <div>
                    <h4 class="text-body-1 font-weight-bold mb-1">
                      {{ status.title }}
                    </h4>
                    <p class="text-caption mb-1">
                      Application ID: BP-2025-0808-001
                      <span v-if="status.submittedDate" class="ml-2"
                        >Submitted: {{ status.submittedDate }}</span
                      >
                      <span v-if="status.awaiting" class="ml-2">{{
                        status.awaiting
                      }}</span>
                    </p>
                    <p class="text-body-2">
                      {{ status.description }}
                    </p>
                  </div>
                </v-timeline-item>
              </v-timeline>
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
        "Upload Building Plans & Lot Plans",
        "Download Filled-up Unified Application Form and Required Ancillary Permits",
      ],
      applicationStatuses: [
        {
          title: "Submitted Application",
          description:
            "Your application has been successfully submitted and is now in the review process.",
          status: "Completed",
          icon: "mdi-check-circle",
          dotColor: "blue",
          chipColor: "green-lighten-1",
          submittedDate: "January 15, 2024",
        },
        {
          title: "PDF Plan Verification",
          description:
            "Plan verification will begin shortly. Your submitted building plans will be reviewed for completeness and accuracy.",
          status: "Not Started",
          icon: "mdi-account-clock",
          dotColor: "blue",
          chipColor: "grey",
          awaiting: "Awaiting review",
        },
        {
          title: "Evaluation of Plans",
          description:
            "Comprehensive evaluation will begin after PDF plan verification is complete.",
          status: "Not Started",
          icon: "mdi-magnify",
          dotColor: "blue",
          chipColor: "grey",
          awaiting: "Pending verification completion",
        },
        {
          title: "Final Approval",
          description:
            "Final approval and permit issuance will proceed after successful evaluation.",
          status: "Not Started",
          icon: "mdi-list-status",
          dotColor: "blue",
          chipColor: "grey",
          awaiting: "Awaiting previous stages",
        },
      ],
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

.application-info-card {
  border: 1px solid #e0e0e0;
  box-shadow: none !important;
  background-color: white;
}

.application-timeline {
  padding-left: 20px;
}
.v-timeline-item:deep(.v-timeline-item__opposite) {
  text-align: right !important;
  padding-right: 16px;
  min-width: 100px;
}
.v-timeline-item:deep(.v-timeline-item__body) {
  padding-left: 16px !important;
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