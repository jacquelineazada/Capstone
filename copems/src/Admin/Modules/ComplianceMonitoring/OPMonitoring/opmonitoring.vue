
<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <div class="drawer-header">
        <v-icon size="36" class="me-2" color="#007bff"
          >mdi-office-building</v-icon
        >
        <div>
          <div class="text-h7 font-weight-bold" style="line-height: 1.2">
            Occupancy Permit
          </div>
          <div class="text-caption font-weight-regular" style="color: #6c757d">
            Inspector Monitoring
          </div>
        </div>
      </div>
      <div class="d-flex flex-column" style="height: calc(100vh - 88px - 57px)">
        <v-list
          nav
          dense
          class="py-0 flex-grow-1 overflow-y-auto"
          style="font-size: 14px"
        >
          <v-list-item
            v-for="item in navItems"
            :key="item.title"
            :to="item.to"
            class="py-1"
          >
            <div class="d-flex align-center">
              <v-icon class="me-3">{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </div>
          </v-list-item>
        </v-list>
        <v-list nav dense class="py-0 mt-auto" style="font-size: 14px">
          <v-list-item link @click="logout" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-logout</v-icon>
              <span>Logout</span>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4">
      <div class="main-content-wrapper">
        <v-card class="main-card">
          <div class="card-header">
            <div class="text-h6 font-weight-bold">Occupancy Permit Admin</div>
            <div class="d-flex align-center">
              <v-menu :close-on-content-click="false" location="bottom end">
                <template v-slot:activator="{ props }">
                  <v-badge
                    color="red"
                    :content="unreadNotificationsCount"
                    overlap
                    class="me-2"
                    v-bind="props"
                  >
                    <v-icon size="20">mdi-bell</v-icon>
                  </v-badge>
                </template>
                <v-card min-width="300" max-width="400">
                  <v-card-title class="notification-title">
                    <span class="text-h6">Notifications</span>
                    <v-btn icon @click="closeNotifications"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card
                    v-for="(notification, index) in notifications"
                    :key="index"
                    color="blue-lighten-4"
                    class="ma-2"
                  >
                    <v-list-item class="d-flex flex-column align-start">
                      <div class="d-flex align-center">
                        <v-icon class="me-2" color="blue-darken-2"
                          >mdi-file-document-outline</v-icon
                        >
                        <div class="font-weight-bold">
                          Documents submitted for verification
                        </div>
                      </div>
                      <v-list-item-subtitle class="text-caption mt-1">
                        {{ notification.applicationId }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="text-caption">
                        {{ notification.time }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-card>
                </v-card>
              </v-menu>
              <v-btn text to="/profile" class="profile-btn">
                <v-avatar size="32" class="mx-2">
                  <v-img
                    alt="John"
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                  ></v-img>
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span class="text-caption font-weight-bold profile-text-name">
                    Jefrey R. Santos
                  </span>
                  <span
                    class="text-caption font-weight-medium profile-text-title"
                  >
                    Administrative
                  </span>
                </div>
              </v-btn>
            </div>
          </div>
          <v-divider></v-divider>

          <v-card-text class="flex-grow-1 pa-4">
            <v-row class="mb-6">
              <v-col
                v-for="card in statusCards"
                :key="card.title"
                cols="12"
                sm="6"
                md="3"
              >
                <v-card
                  color="white"
                  elevation="2"
                  @click="filterByStatus(card.status)"
                >
                  <v-card-text
                    class="d-flex align-center justify-space-between"
                  >
                    <div>
                      <div
                        class="text-h6 font-weight-bold"
                        :style="{ color: card.color }"
                      >
                        {{ card.title }}
                      </div>
                      <div
                        class="text-h4 font-weight-bold"
                        :style="{ color: card.color }"
                      >
                        {{ card.count }}
                      </div>
                    </div>
                    <v-icon size="48" :color="card.color">{{
                      card.icon
                    }}</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mb-4 align-center justify-end">
              <v-col cols="12" sm="10" md="6" class="d-flex justify-end">
                <v-text-field
                  v-model="search"
                  label="Search applicants..."
                  append-inner-icon="mdi-magnify"
                  density="compact"
                  variant="solo"
                  hide-details
                  single-line
                  :loading="loading"
                  @click:append-inner="onClick"
                  style="max-width: 300px; margin-right: 8px"
                ></v-text-field>

                <v-menu :close-on-content-click="false" location="bottom right">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="#007bff"
                      class="text-white"
                      prepend-icon="mdi-filter-variant"
                      v-bind="props"
                      style="height: 48px"
                    >
                      Filter
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="item in filterOptions"
                      :key="item.title"
                      @click="filterByStatus(item.status)"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
            <v-tabs
              v-model="currentTab"
              color="#007bff"
              slider-color="#007bff"
              class="mb-4"
            >
              <v-tab value="monitoring">Occupancy Monitoring</v-tab>
              <v-tab value="checklist">Occupancy Checklist</v-tab>
            </v-tabs>

            <v-window v-model="currentTab">
              <v-window-item value="monitoring">
                <v-card class="elevation-1">
                  <v-data-table
                    :headers="appliedApplicantsHeaders"
                    :items="filteredAppliedApplicants"
                    item-key="name"
                    class="elevation-0"
                    hide-default-footer
                  >
                    <template v-slot:item.name="{ item }">
                      <div class="d-flex align-center py-2">
                        <v-avatar
                          size="36"
                          :color="getAvatarColor(item.initials)"
                          class="me-2 text-white"
                        >
                          {{ item.initials }}
                        </v-avatar>
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                    <template v-slot:item.status="{ item }">
                      <v-chip :color="getStatusColor(item.status)" dark small>
                        {{ item.status }}
                      </v-chip>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <v-btn
                        v-if="item.status === 'Not yet started'"
                        color="#007bff"
                        class="text-white"
                        size="small"
                        @click="showNotifyDialog(item)"
                      >
                        Notify
                      </v-btn>
                      <v-btn
                        v-else-if="item.status === 'Inspection Completed'"
                        color="#007bff"
                        class="text-white"
                        size="small"
                        @click="showRemarksDialog(item)"
                      >
                        Remarks
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-window-item>

              <v-window-item value="checklist">
                <v-card class="elevation-1 pa-4">
                  <v-card-title
                    class="text-h6 font-weight-bold mb-3 d-flex align-center"
                  >
                    <v-icon color="green-darken-2" class="me-2"
                      >mdi-list-status</v-icon
                    >
                    Final Occupancy Checklist Requirements
                  </v-card-title>

                  <div
                    v-for="(group, groupIndex) in checklistData"
                    :key="groupIndex"
                    class="mb-4"
                  >
                    <v-list-item-title
                      class="text-subtitle-1 font-weight-bold py-2"
                      :class="`text-${group.iconColor}-darken-2`"
                      style="
                        border-bottom: 2px solid #e0e0e0;
                        margin-bottom: 8px;
                      "
                    >
                      <v-icon :color="group.iconColor" class="me-2">{{
                        group.icon
                      }}</v-icon>
                      {{ group.title }}
                    </v-list-item-title>

                    <v-list density="compact" class="py-0">
                      <v-list-item
                        v-for="(item, itemIndex) in group.items"
                        :key="itemIndex"
                        class="px-2 py-0"
                        :class="{ 'mb-2': itemIndex < group.items.length - 1 }"
                      >
                        <v-checkbox
                          v-model="item.isSubmitted"
                          :label="item.text"
                          density="compact"
                          hide-details
                          color="green-darken-1"
                        >
                        </v-checkbox>
                      </v-list-item>
                    </v-list>
                    <v-divider
                      v-if="groupIndex < checklistData.length - 1"
                      class="mt-4"
                    ></v-divider>
                  </div>

                  <v-alert
                    v-if="!checklistData.length"
                    type="info"
                    variant="tonal"
                    icon="mdi-information-outline"
                    class="mt-4"
                  >
                    No checklist data is currently available.
                  </v-alert>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </div>

      <v-dialog v-model="notifyDialog" max-width="450px">
        <v-card class="rounded-lg">
          <v-card-title
            class="d-flex align-center text-h6 font-weight-bold bg-blue-lighten-5 py-3"
          >
            <v-icon color="blue-darken-2" class="me-3"
              >mdi-bell-badge-outline</v-icon
            >
            Send Inspection Notification
          </v-card-title>
          <v-card-text class="py-6">
            <div class="d-flex align-center mb-4">
              <v-icon size="36" color="blue-darken-1" class="me-4"
                >mdi-email-send-outline</v-icon
              >
              <div>
                <p class="text-subtitle-1 font-weight-bold mb-1">
                  Send Reminder to Applicant
                </p>
                <p class="text-caption text-medium-emphasis">
                  You are about to send a notification to remind the applicant
                  that their inspection is not yet scheduled.
                </p>
              </div>
            </div>
            <v-divider class="my-3"></v-divider>
            <div class="mt-4">
              <p class="font-weight-medium mb-1">Applicant:</p>
              <p class="text-body-1 font-weight-bold text-blue-darken-2">
                {{ currentApplicant?.name }}
              </p>
              <p class="font-weight-medium mt-3 mb-1">Application No.:</p>
              <v-chip
                color="blue-lighten-1"
                class="font-weight-bold text-white"
              >
                {{ currentApplicant?.applicationNumber }}
              </v-chip>
            </div>
          </v-card-text>
          <v-card-actions class="bg-grey-lighten-4 pa-3">
            <v-spacer></v-spacer>
            <v-btn
              color="grey darken-1"
              variant="text"
              @click="notifyDialog = false"
              >Cancel</v-btn
            >
            <v-btn
              color="#007bff"
              class="text-white"
              variant="flat"
              @click="sendNotification"
              >Send Notification</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="remarksDialog" max-width="600px">
        <v-card class="rounded-lg">
          <v-card-title
            class="d-flex align-center text-h6 font-weight-bold bg-purple-lighten-5 py-3"
          >
            <v-icon color="purple-darken-2" class="me-3"
              >mdi-file-edit-outline</v-icon
            >
            Engineer's Inspection Report
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="py-5">
            <div class="mb-4">
              <p class="text-subtitle-1 font-weight-bold mb-1">
                Applicant Details
              </p>
              <div class="text-body-2 text-medium-emphasis">
                <span class="font-weight-medium">Application No.:</span>
                <span class="font-weight-bold text-purple-darken-2 ms-1">{{
                  currentRemarks.applicationNumber
                }}</span>
                <br />
                <span class="font-weight-medium">Applicant Name:</span>
                <span class="ms-1">{{ currentRemarks.applicantName }}</span>
              </div>
            </div>

            <v-divider class="mb-4"></v-divider>

            <p
              class="text-subtitle-1 font-weight-bold mb-3 d-flex align-center"
            >
              <v-icon size="20" color="purple-darken-2" class="me-2"
                >mdi-text-box-outline</v-icon
              >
              Inspection Findings:
            </p>
            <v-card
              variant="outlined"
              color="purple-darken-1"
              class="pa-4 rounded-lg"
            >
              <p class="text-body-2" style="white-space: pre-wrap">
                {{
                  currentRemarks.report ||
                  "No detailed report available. Inspection was marked as completed without specific remarks."
                }}
              </p>
            </v-card>
          </v-card-text>
          <v-card-actions class="bg-grey-lighten-4 pa-3">
            <v-spacer></v-spacer>
            <v-btn
              color="#007bff"
              class="text-white"
              variant="flat"
              @click="remarksDialog = false"
              >Close Report</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="logbookDialog" max-width="700px">
        <v-card>
          <v-card-title class="text-h5 bg-blue-grey-lighten-5">
            Inspection Logbook - {{ currentApplicant?.applicationNumber }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="mb-4 d-flex align-center">
              <h3 class="text-subtitle-1 font-weight-bold me-2">
                Current Status:
              </h3>
              <v-chip
                :color="getStatusColor(currentLogbook?.currentStatus)"
                size="large"
                class="font-weight-bold text-white"
              >
                {{ currentLogbook?.currentStatus || "Status Not Set" }}
              </v-chip>
            </div>
            <v-divider class="my-4"></v-divider>
            <h3 class="text-subtitle-1 font-weight-bold mb-3">
              Activity Timeline (Simplified)
            </h3>

            <v-timeline density="compact" side="end">
              <v-timeline-item
                v-for="(log, index) in simplifiedLogEntries"
                :key="index"
                :dot-color="getLogColor(log.status)"
                size="small"
                :icon="getLogIcon(log.status)"
              >
                <div class="d-flex justify-space-between align-center">
                  <div class="text-caption font-weight-bold text-grey-darken-1">
                    {{ log.date }}
                  </div>
                  <v-chip
                    size="x-small"
                    :color="getLogColor(log.status)"
                    class="text-white font-weight-bold"
                  >
                    {{ log.status }}
                  </v-chip>
                </div>
                <p class="mb-1 text-body-2 font-weight-medium">
                  {{ log.activity }}
                </p>
                <p class="text-caption text-medium-emphasis">
                  Reported by: {{ log.inspector }}
                </p>
              </v-timeline-item>
            </v-timeline>

            <v-alert
              v-if="
                !currentLogbook?.entries || currentLogbook.entries.length === 0
              "
              type="info"
              variant="tonal"
              icon="mdi-information-outline"
            >
              No inspection log entries have been recorded yet.
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="logbookDialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor">
        {{ snackbarText }}
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";

const search = ref("");
const loading = ref(false);
const currentTab = ref("monitoring");

const notifyDialog = ref(false);
const remarksDialog = ref(false);
const logbookDialog = ref(false);

const currentLogbook = ref(null);
const currentApplicant = ref(null);
const currentRemarks = ref({
  applicationNumber: "",
  report: "",
  applicantName: "",
});

const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("success");

const filterStatus = ref("Total");

const notifications = ref([
  {
    title: "Documents submitted for verification",
    applicationId: "OP-2025-0808-001",
    time: "Just now",
    read: false,
  },
]);

const navItems = [
  { title: "Dashboard", icon: "mdi-home-outline", to: "/dashboard" },
  {
    title: "Locational Clearance",
    icon: "mdi-map-marker-outline",
    to: "/locational-clearance",
  },
  {
    title: "Building Permit",
    icon: "mdi-file-document-outline",
    to: "/admin/ComplianceMonitoring",
  },
  {
    title: "Occupancy Permit",
    icon: "mdi-file-certificate-outline",
    to: "/occupancy-permit",
  },
];

const appliedApplicantsHeaders = [
  { title: "Applicant Name", key: "name", sortable: false },
  { title: "Application Number", key: "applicationNumber", sortable: false },
  { title: "Profession", key: "profession", sortable: false },
  { title: "Date Submitted", key: "dateSubmitted", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Action", key: "action", sortable: false },
];

const appliedApplicants = ref([
  {
    initials: "LF",
    name: "Laurence Francisco",
    applicationNumber: "OP-2024-808123-T",
    profession: "Civil Engineer",
    dateSubmitted: "04/02/2025",
    status: "Inspection Completed",
    logbook: {
      currentStatus: "Ready for Inspection",
      entries: [
        {
          date: "2025-04-15",
          activity: "Documents verified and complete.",
          inspector: "Admin",
          status: "Complete",
        },
      ],
    },
    engineerReport:
      "All structural components passed the final inspection. Minor recommendations on landscaping drainage have been noted by Engr. M. Cruz.",
  },
  {
    initials: "AC",
    name: "Aaron James Carter",
    applicationNumber: "OP-2024-808234-T",
    profession: "Architect",
    dateSubmitted: "04/02/2025",
    status: "Not yet started",
    logbook: { currentStatus: "Initial Review", entries: [] },
    engineerReport: "",
  },
  {
    initials: "MR",
    name: "Maria Rodriguez",
    applicationNumber: "OP-2024-808345-T",
    profession: "Civil Engineer",
    dateSubmitted: "04/02/2025",
    status: "Re-Inspection",
    logbook: {
      currentStatus: "Returned for Correction",
      entries: [
        {
          date: "2025-04-05",
          activity:
            "Application returned. Missing structural compliance report.",
          inspector: "Admin",
          status: "Incomplete",
        },
      ],
    },
    engineerReport:
      "Foundation failed initial density test. Re-inspection scheduled for next week after contractor fixes.",
  },
  {
    initials: "JS",
    name: "John Smith",
    applicationNumber: "OP-2024-808456-T",
    profession: "Architect",
    dateSubmitted: "04/03/2025",
    status: "Scheduled",
    logbook: { currentStatus: "Ready for Inspection", entries: [] },
    engineerReport: "",
  },
]);

// New Data for Occupancy Checklist
const checklistData = ref([
  {
    title: "Application & Permit Documents",
    icon: "mdi-file-edit-outline",
    iconColor: "blue",
    color: "blue-lighten-5",
    items: [
      {
        text: "Duly Accomplished Occupancy Permit Application Form",
        isSubmitted: true,
      },
      { text: "Copy of Approved Building Permit", isSubmitted: true },
      { text: "Copy of Approved Locational Clearance", isSubmitted: true },
      {
        text: "Photocopy of current Professional Tax Receipt (PTR)",
        isSubmitted: true,
      },
    ],
  },
  {
    title: "Construction Documents & Clearances",
    icon: "mdi-tools",
    iconColor: "orange",
    color: "orange-lighten-5",
    items: [
      { text: "As-Built Plans (5 sets)", isSubmitted: true },
      {
        text: "Logbook and Certificate of Completion (CE/ARCH)",
        isSubmitted: true,
      },
      {
        text: "Certificate of Final Electrical Inspection (CFEI)",
        isSubmitted: false,
      },
      {
        text: "Certificate of Final Plumbing Inspection (CFPI)",
        isSubmitted: true,
      },
      { text: "Fire Safety Inspection Certificate (FSIC)", isSubmitted: false },
      {
        text: "Clearance from other concerned agencies (e.g. CAAP, LLDA)",
        isSubmitted: true,
      },
    ],
  },
  {
    title: "Supporting Documents",
    icon: "mdi-folder-open-outline",
    iconColor: "teal",
    color: "teal-lighten-5",
    items: [
      { text: "Structural Stability Certification", isSubmitted: true },
      { text: "Water Testing / Potability Certificate", isSubmitted: false },
      { text: "Pictures of the finished building", isSubmitted: true },
    ],
  },
]);

const unreadNotificationsCount = computed(
  () => notifications.value.filter((n) => !n.read).length
);

const appliedApplicantsCount = computed(() => appliedApplicants.value.length);
const scheduledApplicantsCount = computed(
  () => appliedApplicants.value.filter((a) => a.status === "Scheduled").length
);
const inspectionCompletedCount = computed(
  () =>
    appliedApplicants.value.filter((a) => a.status === "Inspection Completed")
      .length
);
const reInspectionCount = computed(
  () =>
    appliedApplicants.value.filter((a) => a.status === "Re-Inspection").length
);

const statusCards = computed(() => [
  {
    title: "Total Applicants",
    count: appliedApplicantsCount.value,
    icon: "mdi-account-group",
    color: "#007bff",
    status: "Total",
  },
  {
    title: "Scheduled",
    count: scheduledApplicantsCount.value,
    icon: "mdi-calendar-check",
    color: "#ffc107",
    status: "Scheduled",
  },
  {
    title: "Inspection Completed",
    count: inspectionCompletedCount.value,
    icon: "mdi-check-circle-outline",
    color: "#28a745",
    status: "Inspection Completed",
  },
  {
    title: "Re-Inspection",
    count: reInspectionCount.value,
    icon: "mdi-alert-circle-outline",
    color: "#dc3545",
    status: "Re-Inspection",
  },
]);

const filterOptions = computed(() => [
  { title: "All", status: "Total" },
  { title: "Not yet started", status: "Not yet started" },
  { title: "Scheduled", status: "Scheduled" },
  { title: "Inspection Completed", status: "Inspection Completed" },
  { title: "Re-Inspection", status: "Re-Inspection" },
]);

const filteredAppliedApplicants = computed(() => {
  const searchTerm = search.value.toLowerCase();
  const filtered = appliedApplicants.value.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.applicationNumber.toLowerCase().includes(searchTerm);
    if (filterStatus.value === "Total" || !filterStatus.value) {
      return matchesSearch;
    }
    return (
      matchesSearch &&
      item.status.toLowerCase() === filterStatus.value.toLowerCase()
    );
  });
  return filtered;
});

const simplifiedLogEntries = computed(() => {
  if (!currentLogbook.value || !currentLogbook.value.entries) return [];

  return currentLogbook.value.entries
    .map((entry) => {
      let activity = entry.activity;
      let inspector = entry.inspector;
      let status = entry.status;

      if (status === "Complete") {
        activity = "Documents verified and application is complete.";
        status = "Ready for Inspection";
      } else if (status === "Incomplete") {
        activity = entry.activity;
        status = "Returned for Correction";
      } else if (status === "Started") {
        activity = "Application submitted and initial review started.";
        status = "Initial Review";
      }

      return { ...entry, activity, inspector, status };
    })
    .reverse();
});

function showSnackbar(message, color = "success") {
  snackbarText.value = message;
  snackbarColor.value = color;
  snackbar.value = true;
}

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}

function closeNotifications() {
  notifications.value.forEach((notification) => {
    notification.read = true;
  });
}

function filterByStatus(status) {
  filterStatus.value = status;
}

function getLogColor(status) {
  const colors = {
    "Initial Review": "blue",
    "Ready for Inspection": "green",
    "Returned for Correction": "red",
  };
  return colors[status] || "grey";
}

function getLogIcon(status) {
  const icons = {
    "Initial Review": "mdi-file-document-outline",
    "Ready for Inspection": "mdi-check-all",
    "Returned for Correction": "mdi-close-octagon",
  };
  return icons[status] || "mdi-circle-small";
}

function getStatusColor(status) {
  const statusColors = {
    "Inspection Completed": "green",
    "Re-Inspection": "red",
    Scheduled: "orange",
    "Not yet started": "blue-grey",
  };
  return statusColors[status] || "grey";
}

function getAvatarColor(initials) {
  const colors = { LF: "#007bff", AC: "#28a745", MR: "#dc3545", JS: "blue" };
  return colors[initials] || "grey";
}

function showNotifyDialog(item) {
  currentApplicant.value = item;
  notifyDialog.value = true;
}

function sendNotification() {
  showSnackbar(
    `Notification sent to applicant ${currentApplicant.value.name} for application ${currentApplicant.value.applicationNumber}.`,
    "info"
  );
  notifyDialog.value = false;
  currentApplicant.value = null;
}

function showRemarksDialog(item) {
  currentRemarks.value = {
    applicationNumber: item.applicationNumber,
    report: item.engineerReport,
    applicantName: item.name,
  };
  remarksDialog.value = true;
}

function logout() {
  console.log("Logged out");
}
</script>

<style scoped>
.header-container {
  max-width: 1600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.main-content-wrapper {
  display: flex;
  justify-content: center;
}

.main-card {
  width: 100%;
  max-width: 1300px;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 57px;
}

.header-text-small {
  font-size: 12px;
  font-weight: 400;
  color: white;
  line-height: 1.2;
}

.header-text-large {
  font-size: 15px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.drawer-header {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 57px;
}

.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
}

.profile-text-name {
  color: #555;
  white-space: nowrap;
}

.profile-text-title {
  color: #888;
  white-space: nowrap;
}

.notification-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```