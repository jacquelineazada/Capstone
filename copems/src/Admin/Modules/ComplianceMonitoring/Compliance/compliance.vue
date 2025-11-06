
<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <div class="drawer-header">
        <v-icon size="36" class="me-2" color="#007bff"
          >mdi-office-building</v-icon
        >
        <div>
          <div class="text-h7 font-weight-bold" style="line-height: 1.2">
            Construction Permit
          </div>
          <div class="text-caption font-weight-regular" style="color: #6c757d">
            Management System
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
            <div class="text-h6 font-weight-bold">Building Permit Admin</div>
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
                v-for="(card, index) in dynamicStatusCards"
                :key="index"
                cols="12"
                sm="6"
                md="3"
              >
                <v-card
                  v-if="card.title"
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
                      v-for="item in dynamicFilterOptions"
                      :key="item.title"
                      @click="filterByStatus(item.value)"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>

            <v-tabs v-model="activeTab" class="mb-4">
              <v-tab value="applied" @click="resetFilter('applied')">
                Applied Applicants
              </v-tab>
              <v-tab value="approved" @click="resetFilter('approved')">
                Approved Building Permit Statuses
              </v-tab>
            </v-tabs>

            <v-window v-model="activeTab">
              <v-window-item value="applied">
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
                        color="#007bff"
                        class="text-white"
                        size="small"
                        to="rqmonitoring"
                      >
                        View Details
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-window-item>

              <v-window-item value="approved">
                <v-card class="elevation-1">
                  <v-data-table
                    :headers="approvedPermitStatusesHeaders"
                    :items="filteredApprovedPermitStatuses"
                    item-key="applicationNumber"
                    class="elevation-0"
                    hide-default-footer
                  >
                    <template v-slot:item.status="{ item }">
                      <v-chip :color="getStatusColor(item.status)" dark small>
                        {{ item.status }}
                      </v-chip>
                    </template>
                    <template v-slot:item.nocSubmittedStatus="{ item }">
                      <v-chip
                        :color="item.nocSubmitted ? 'green' : 'red'"
                        dark
                        small
                      >
                        {{ item.nocSubmitted ? "Submitted" : "Pending" }}
                      </v-chip>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <div class="d-flex flex-wrap align-center">
                        <v-btn
                          v-if="!item.nocSubmitted"
                          color="white"
                          class="my-1 mx-1 border border-light-grey"
                          size="small"
                          @click="showEmailDialog(item)"
                        >
                          <span class="text-blue-grey-darken-4">Email</span>
                        </v-btn>

                        <v-btn
                          color="#007bff"
                          class="text-white my-1 mx-1"
                          size="small"
                          @click="showSetInspectionDialog(item)"
                        >
                          {{
                            item.inspectionSet
                              ? "Update Schedule"
                              : "Set Inspection"
                          }}
                        </v-btn>

                        <v-menu v-if="item.inspectionSet" location="bottom end">
                          <template v-slot:activator="{ props }">
                            <v-btn
                              v-bind="props"
                              icon
                              variant="text"
                              size="small"
                              class="my-1 mx-1 text-grey-darken-1"
                            >
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>
                          <v-list density="compact">
                            <v-list-item @click="showLogbookDialog(item)">
                              <v-list-item-title>View Report</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </template>
                  </v-data-table>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </div>

      <v-dialog v-model="emailDialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Compose Email</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>
              Email details for application
              <strong>{{ currentApplicant?.applicationNumber }}</strong
              >:
            </p>

            <v-text-field
              v-model="recipientEmail"
              label="Recipient Email"
              type="email"
              outlined
              dense
              required
              class="my-3"
            ></v-text-field>

            <v-text-field
              v-model="emailSubject"
              label="Subject"
              outlined
              dense
              required
              class="mb-3"
            ></v-text-field>

            <v-textarea
              v-model="emailBody"
              label="Email Description / Body"
              outlined
              rows="6"
              no-resize
              required
              class="mb-4"
            ></v-textarea>

            <p class="text-caption text-medium-emphasis">
              *The applicant's name and application number are used to pre-fill
              the email context.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="emailDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="sendEmail"
              >Send Email</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="setInspectionDialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Set Inspection Schedule</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="saveInspectionSchedule">
              <v-text-field
                v-model="inspectionSchedule.location"
                label="Site Location"
                outlined
                dense
                disabled
              ></v-text-field>
              <v-text-field
                v-model="inspectionSchedule.date"
                label="Date"
                type="date"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="inspectionSchedule.time"
                label="Time"
                type="time"
                outlined
                dense
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="setInspectionDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="saveInspectionSchedule"
              >Set Schedule</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="logbookDialog" max-width="700px">
        <v-card>
          <v-card-title class="text-h5 bg-blue-grey-lighten-5">
            Construction Logbook - {{ currentApplicant?.applicationNumber }}
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
              No construction log entries have been recorded yet.
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
const activeTab = ref("applied");
const filterStatus = ref("Total");
const currentApplicant = ref(null);

const emailDialog = ref(false);
const recipientEmail = ref("");
const emailSubject = ref("");
const emailBody = ref(
  "Dear Applicant,\n\nYour Building Permit (Permit No: [ApplicationNumber]) has been approved. Please submit the required Notice of Construction (NOC) within 120 days from the date of permit issuance to avoid permit inactivity.\n\nThank you,\nBuilding Permit Admin"
);

const setInspectionDialog = ref(false);
const logbookDialog = ref(false);
const currentLogbook = ref(null);
const inspectionSchedule = ref({
  location: "",
  date: null,
  time: null,
});

const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("success");

const notifications = ref([
  {
    title: "Documents submitted for verification",
    applicationId: "BP-2025-0808-001",
    time: "Just now",
    read: false,
  },
  {
    title: "Documents submitted for verification",
    applicationId: "BP-2024-808234-T",
    time: "2 hours ago",
    read: false,
  },
  {
    title: "Documents submitted for verification",
    applicationId: "BP-2024-808345-T",
    time: "4 hours ago",
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
    to: "/admin/opmonitoring",
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

const approvedPermitStatusesHeaders = [
  { title: "Application Number", key: "applicationNumber", sortable: false },
  { title: "Applicant Name", key: "name", sortable: false },
  { title: "BP Date Issued", key: "dateIssued", sortable: true },
  { title: "NOC Submission", key: "nocSubmittedStatus", sortable: false },
  { title: "Status", key: "status", sortable: true },
  { title: "Action", key: "action", sortable: false },
];

const appliedApplicants = ref([
  {
    initials: "LF",
    name: "Laurence Francisco",
    applicationNumber: "BP-2024-808123-T",
    profession: "Civil Engineer",
    dateSubmitted: "04/02/2025",
    status: "Complete",
  },
  {
    initials: "AC",
    name: "Aaron James Carter",
    applicationNumber: "BP-2024-808234-T",
    profession: "Architect",
    dateSubmitted: "04/02/2025",
    status: "Incomplete",
  },
  {
    initials: "MR",
    name: "Maria Rodriguez",
    applicationNumber: "BP-2024-808345-T",
    profession: "Civil Engineer",
    dateSubmitted: "04/02/2025",
    status: "Incomplete",
  },
  {
    initials: "JD",
    name: "John Doe",
    applicationNumber: "BP-2024-808456-T",
    profession: "Architect",
    dateSubmitted: "04/03/2025",
    status: "Complete",
  },
]);

const approvedPermitStatuses = ref([
  {
    applicationNumber: "BP-2025-001-A",
    name: "Laurence Francisco",
    dateIssued: "01/01/2025",
    nocSubmitted: false,
    inspectionSet: true,
    scheduleDate: "2025-10-25",
    scheduleTime: "10:00",
    logbook: {
      currentStatus: "Active Construction",
      entries: [
        {
          date: "2025-09-15",
          activity: "Construction started on site.",
          inspector: "Engr. D. Cruz (City Inspector)",
          status: "Started",
        },
        {
          date: "2025-10-05",
          activity: "Initial inspection scheduled.",
          inspector: "Engr. D. Cruz (City Inspector)",
          status: "Active",
        },
        {
          date: "2025-10-17",
          activity: "Framing phase underway.",
          inspector: "Engr. D. Cruz (City Inspector)",
          status: "Active",
        },
      ],
    },
  },
  {
    applicationNumber: "BP-2025-002-B",
    name: "Aaron James Carter",
    dateIssued: "08/10/2025",
    nocSubmitted: false,
    inspectionSet: false,
    logbook: {
      currentStatus: "Not Yet Scheduled",
      entries: [],
    },
  },
  {
    applicationNumber: "BP-2025-004-D",
    name: "David Smith",
    dateIssued: "01/15/2025",
    nocSubmitted: false,
    inspectionSet: false,
    logbook: {
      currentStatus: "Permit Inactive",
      entries: [],
    },
  },
  {
    applicationNumber: "BP-2025-005-E",
    name: "Czarina Lopez",
    dateIssued: "09/01/2025",
    nocSubmitted: false,
    inspectionSet: true,
    logbook: {
      currentStatus: "Active Construction",
      entries: [],
    },
  },
]);

const unreadNotificationsCount = computed(
  () => notifications.value.filter((n) => !n.read).length
);

const getApprovedPermitStatus = (dateIssued, nocSubmitted) => {
  if (nocSubmitted) return "ACTIVE";
  const issueDate = new Date(dateIssued);
  const today = new Date();
  const diffDays = Math.ceil(
    (today.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays <= 120) return "NOT YET STARTED";
  return "INACTIVE";
};

const processedApprovedPermits = computed(() =>
  approvedPermitStatuses.value.map((item) => ({
    ...item,
    status: getApprovedPermitStatus(item.dateIssued, item.nocSubmitted),
  }))
);

const appliedTotalCount = computed(() => appliedApplicants.value.length);
const completeCount = computed(
  () => appliedApplicants.value.filter((a) => a.status === "Complete").length
);
const incompleteCount = computed(
  () => appliedApplicants.value.filter((a) => a.status === "Incomplete").length
);

const appliedStatusCards = computed(() => [
  {
    title: "Total Applicants",
    count: appliedTotalCount.value,
    icon: "mdi-account-group",
    color: "#007bff",
    status: "Total",
  },
  {
    title: "Complete",
    count: completeCount.value,
    icon: "mdi-check-circle-outline",
    color: "#28a745",
    status: "Complete",
  },
  {
    title: "Incomplete",
    count: incompleteCount.value,
    icon: "mdi-alert-circle-outline",
    color: "#dc3545",
    status: "Incomplete",
  },

  { title: null, count: 0, icon: null, color: null, status: null },
]);

const totalApprovedCount = computed(
  () => processedApprovedPermits.value.length
);
const activePermitCount = computed(
  () =>
    processedApprovedPermits.value.filter((a) => a.status === "ACTIVE").length
);
const inactivePermitCount = computed(
  () =>
    processedApprovedPermits.value.filter((a) => a.status === "INACTIVE").length
);
const notYetStartedCount = computed(
  () =>
    processedApprovedPermits.value.filter((a) => a.status === "NOT YET STARTED")
      .length
);

const approvedStatusCards = computed(() => [
  {
    title: "Total Applicants",
    count: totalApprovedCount.value,
    icon: "mdi-file-check-outline",
    color: "#007bff",
    status: "Total",
  },
  {
    title: "Active Permits",
    count: activePermitCount.value,
    icon: "mdi-hand-coin-outline",
    color: "#dc3545",
    status: "ACTIVE",
  },
  {
    title: "Inactive",
    count: inactivePermitCount.value,
    icon: "mdi-alert-octagon-outline",
    color: "#dc3545",
    status: "INACTIVE",
  },
  {
    title: "Not Yet Started",
    count: notYetStartedCount.value,
    icon: "mdi-clock-time-three-outline",
    color: "#ffc107",
    status: "NOT YET STARTED",
  },
]);

const dynamicStatusCards = computed(() => {
  return activeTab.value === "applied"
    ? appliedStatusCards.value
    : approvedStatusCards.value;
});

const dynamicFilterOptions = computed(() => {
  if (activeTab.value === "applied") {
    return [
      { title: "All", value: "Total" },
      { title: "Complete", value: "Complete" },
      { title: "Incomplete", value: "Incomplete" },
    ];
  } else {
    return [
      { title: "All", value: "Total" },
      { title: "Active Permits", value: "ACTIVE" },
      { title: "Inactive", value: "INACTIVE" },
      { title: "Not Yet Started", value: "NOT YET STARTED" },
    ];
  }
});

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

const filteredApprovedPermitStatuses = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return processedApprovedPermits.value.filter((item) => {
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

function resetFilter(tabName) {
  filterStatus.value = "Total";
}

function filterByStatus(status) {
  filterStatus.value = status;
}

function getLogColor(status) {
  const colors = {
    Started: "blue",
    "Inspection Scheduled": "orange",
    Active: "green",
    Delayed: "red",
    "NOC Submitted": "teal",
    "Active Construction": "light-green-darken-2",
  };
  return colors[status] || "grey";
}

function getLogIcon(status) {
  const icons = {
    Started: "mdi-flag-checkered",
    "Inspection Scheduled": "mdi-calendar-clock",
    Active: "mdi-hammer-wrench",
    Delayed: "mdi-close-octagon",
    "NOC Submitted": "mdi-file-document-check",
  };
  return icons[status] || "mdi-circle-small";
}

function getStatusColor(status) {
  const statusColors = {
    Complete: "#28a745",
    Incomplete: "#dc3545",
    Pending: "#ffc107",

    ACTIVE: "#dc3545",
    INACTIVE: "#dc3545",
    "NOT YET STARTED": "#ffc107",

    "Active Construction": "light-green-darken-2",
    "Construction Inactive": "deep-orange",
    "Not Yet Scheduled": "blue-grey",
    "Permit Inactive": "red-darken-4",
  };
  return statusColors[status] || "grey";
}

function getAvatarColor(initials) {
  const colors = { LF: "#007bff", AC: "#28a745", MR: "#dc3545", JD: "#6f42c1" };
  return colors[initials] || "grey";
}

function logout() {
  console.log("Logged out");
}

function showEmailDialog(item) {
  currentApplicant.value = item;

  recipientEmail.value = `${item.name
    .toLowerCase()
    .replace(/\s/g, ".")}@example.com`;
  emailSubject.value = `Action Required: Notice of Construction for Permit ${item.applicationNumber}`;

  emailBody.value = emailBody.value.replace(
    "[ApplicationNumber]",
    item.applicationNumber
  );

  emailDialog.value = true;
}

function sendEmail() {
  if (!recipientEmail.value || !emailSubject.value || !emailBody.value) {
    showSnackbar("Please fill in all email fields.", "error");
    return;
  }

  console.log(
    `Email sent to ${recipientEmail.value} (Applicant: ${currentApplicant.value.name})`
  );
  console.log(`Subject: ${emailSubject.value}`);
  console.log(`Body: ${emailBody.value}`);

  emailBody.value = emailBody.value.replace(
    currentApplicant.value.applicationNumber,
    "[ApplicationNumber]"
  );

  emailDialog.value = false;
  showSnackbar("Email sent successfully!", "info");
}

function showSetInspectionDialog(item) {
  currentApplicant.value = item;
  inspectionSchedule.value.location = "Site Location (Placeholder)";
  inspectionSchedule.value.date = item.scheduleDate || null;
  inspectionSchedule.value.time = item.scheduleTime || null;

  setInspectionDialog.value = true;
}

function showLogbookDialog(item) {
  currentApplicant.value = item;
  currentLogbook.value = item.logbook;
  logbookDialog.value = true;
}

function saveInspectionSchedule() {
  const index = approvedPermitStatuses.value.findIndex(
    (p) => p.applicationNumber === currentApplicant.value.applicationNumber
  );

  if (index !== -1) {
    const permit = approvedPermitStatuses.value[index];
    const isUpdate = permit.inspectionSet;

    permit.inspectionSet = true;
    permit.scheduleDate = inspectionSchedule.value.date;
    permit.scheduleTime = inspectionSchedule.value.time;

    const newEntry = {
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      activity: isUpdate
        ? `Inspection schedule updated to ${permit.scheduleDate} at ${permit.scheduleTime}.`
        : `Initial inspection scheduled for ${permit.scheduleDate} at ${permit.scheduleTime}.`,
      inspector: "City Inspector",
      status: "Scheduled",
    };

    if (!permit.logbook) {
      permit.logbook = { currentStatus: "Scheduled", entries: [] };
    }
    if (!permit.logbook.entries) {
      permit.logbook.entries = [];
    }
    permit.logbook.entries.push(newEntry);
    permit.logbook.currentStatus = "Scheduled";

    showSnackbar(
      `${isUpdate ? "Updated" : "Scheduled"} inspection for ${permit.name} on ${
        permit.scheduleDate
      } at ${permit.scheduleTime}`,
      "success"
    );
  }

  setInspectionDialog.value = false;
}
</script>

<style scoped>
/* Main layout */
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

/* Header & Nav */
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

/* Notifications */
.notification-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```