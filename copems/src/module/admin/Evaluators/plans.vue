<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0"
        style="max-width: 100%"
      >
        <div class="d-flex align-center">
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-4"
          />
          <div>
            <div
              style="
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: white;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-main class="bg-grey-lighten-4">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6 py-3"
        style="
          background-color: white;
          border-bottom: 1px solid lightgrey;
          z-index: 1000;
        "
      >
        <div class="d-flex align-center">
          <v-icon color="blue" class="mr-3" size="24"
            >mdi-office-building</v-icon
          >
          <h2 class="mb-0 text-h6 font-weight-bold">
            Building Permit Application
          </h2>
        </div>
        <div class="d-flex align-center">
          <v-menu location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" text class="profile-btn pa-2 rounded-lg">
                <v-avatar size="36" class="mx-2">
                  <v-img
                    :src="mockEvaluatorProfile.avatar"
                    alt="User Avatar"
                  ></v-img>
                </v-avatar>

                <div class="d-flex flex-column text-left">
                  <span
                    class="text-body-2 font-weight-bold"
                    style="color: #333; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.name }}
                  </span>
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.title }}
                  </span>
                </div>
              </v-btn>
            </template>

            <v-card min-width="220" class="rounded-lg elevation-2">
              <v-list dense class="py-0">
                <v-list-item class="pa-3">
                  <template v-slot:prepend>
                    <v-avatar size="40">
                      <v-img
                        :src="mockEvaluatorProfile.avatar"
                        alt="User Avatar"
                      ></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title
                    class="font-weight-bold"
                    style="line-height: 1.2rem"
                  >
                    {{ mockEvaluatorProfile.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle style="line-height: 1rem">
                    {{ mockEvaluatorProfile.title }}
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item link to="/profile" class="mt-1">
                  <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                  </template>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="logout">
                  <template v-slot:prepend>
                    <v-icon>mdi-logout</v-icon>
                  </template>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </v-card>

      <div class="pa-6 flex-grow-1">
        <v-row class="mb-8" style="gap: 16px 0">
          <v-col cols="12" sm="6" md="3">
            <v-card
              @click="filterByStatus('Total')"
              class="elevation-2 rounded-lg cursor-pointer"
            >
              <v-card-text
                class="d-flex align-center justify-space-between py-4"
              >
                <div>
                  <div class="text-subtitle-1 font-weight-bold">
                    Total Applicants
                  </div>
                  <div class="text-h4 font-weight-bold mt-1">
                    {{ totalApplicants }}
                  </div>
                </div>
                <v-icon size="48" color="#007bff">mdi-account-group</v-icon>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card
              @click="filterByStatus('Pending')"
              class="elevation-2 rounded-lg cursor-pointer"
            >
              <v-card-text
                class="d-flex align-center justify-space-between py-4"
              >
                <div>
                  <div class="text-subtitle-1 font-weight-bold">Pending</div>
                  <div class="text-h4 font-weight-bold mt-1">
                    {{ pendingApplicants }}
                  </div>
                </div>
                <v-icon size="48" color="#ffc107">mdi-clock-outline</v-icon>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card
              @click="filterByStatus('Verified')"
              class="elevation-2 rounded-lg cursor-pointer"
            >
              <v-card-text
                class="d-flex align-center justify-space-between py-4"
              >
                <div>
                  <div class="text-subtitle-1 font-weight-bold">Verified</div>
                  <div class="text-h4 font-weight-bold mt-1">
                    {{ verifiedApplicants }}
                  </div>
                </div>
                <v-icon size="48" color="#28a745"
                  >mdi-check-circle-outline</v-icon
                >
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card
              @click="filterByStatus('Return')"
              class="elevation-2 rounded-lg cursor-pointer"
            >
              <v-card-text
                class="d-flex align-center justify-space-between py-4"
              >
                <div>
                  <div class="text-subtitle-1 font-weight-bold">Return</div>
                  <div class="text-h4 font-weight-bold mt-1">
                    {{ returnApplicants }}
                  </div>
                </div>
                <v-icon size="48" color="#dc3545"
                  >mdi-alert-circle-outline</v-icon
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mb-6 align-center">
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              v-model="search"
              placeholder="Search applicants..."
              prepend-inner-icon="mdi-magnify"
              variant="solo"
              hide-details
              single-line
              class="rounded-lg"
              :loading="loading"
              @click:append-inner="onClick"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="6" class="d-flex justify-end">
            <v-menu :close-on-content-click="true" location="bottom right">
              <template v-slot:activator="{ props }">
                <v-btn
                  color="#007bff"
                  class="text-white text-none font-weight-bold px-4"
                  prepend-icon="mdi-filter-variant"
                  v-bind="props"
                  size="large"
                >
                  Filter by Status
                </v-btn>
              </template>
              <v-list class="rounded-lg">
                <v-list-item @click="filterByStatus('Total')">
                  <v-list-item-title>All Applicants</v-list-item-title>
                </v-list-item>
                <v-list-item @click="filterByStatus('Pending')">
                  <v-list-item-title>Pending</v-list-item-title>
                </v-list-item>
                <v-list-item @click="filterByStatus('Verified')">
                  <v-list-item-title>Verified</v-list-item-title>
                </v-list-item>
                <v-list-item @click="filterByStatus('Return')">
                  <v-list-item-title>Return</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>

        <v-card class="elevation-2 rounded-lg">
          <v-table class="custom-data-table">
            <thead>
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.key"
                  class="text-left font-weight-bold text-caption px-4"
                  :style="{ width: header.key === 'action' ? '120px' : '' }"
                >
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in filteredApplicants"
                :key="item.applicationNumber"
                class="data-table-row"
              >
                <td class="text-left py-4 px-4">
                  <div class="d-flex align-center">
                    <v-avatar
                      size="36"
                      :color="getAvatarColor(item.initials)"
                      class="me-3 text-white font-weight-bold"
                    >
                      {{ item.initials }}
                    </v-avatar>
                    <span class="font-weight-medium text-body-2">{{
                      item.name
                    }}</span>
                  </div>
                </td>

                <td class="text-left px-4 text-body-2">
                  {{ item.applicationNumber }}
                </td>

                <td class="text-left px-4 text-body-2">
                  {{ item.dateSubmitted }}
                </td>

                <td class="text-left px-4">
                  <v-chip
                    :color="getStatusColor(item.status)"
                    variant="tonal"
                    size="small"
                    label
                    class="font-weight-bold"
                  >
                    {{ item.status }}
                  </v-chip>
                </td>

                <td class="text-left px-4">
                  <v-btn
                    color="#007bff"
                    variant="flat"
                    class="text-white text-none"
                    size="small"
                    @click="viewDetails(item)"
                  >
                    View Details
                  </v-btn>
                </td>
              </tr>
              <tr v-if="!filteredApplicants.length">
                <td :colspan="headers.length">
                  <div class="text-center pa-6 text-medium-emphasis">
                    No applicants found matching the search or filter criteria.
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const activeFilter = ref("All");
const loading = ref(false);
const router = useRouter();

const mockEvaluatorProfile = ref({
  name: "Zoe Lumanta",
  title: "Architect",
  specialty: "Architectural",
  initials: "ZL",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
});

const applicants = ref([
  {
    initials: "JM",
    name: "Jm Deguzman",
    applicationNumber: "BP-2024-808123-T",
    dateSubmitted: "Jan 15, 2024",
    status: "Verified",
    discipline: "Architectural",
  },
  {
    initials: "SG",
    name: "Sarah Geronimo",
    applicationNumber: "BP-2024-808234-T",
    dateSubmitted: "Jan 16, 2024",
    status: "Verified",
    discipline: "Architectural",
  },
  {
    initials: "MP",
    name: "Michael Padilla",
    applicationNumber: "BP-2024-808345-T",
    dateSubmitted: "Jan 17, 2024",
    status: "Return",
    discipline: "Architectural",
  },
  {
    initials: "DT",
    name: "David Tolo",
    applicationNumber: "BP-2024-808678-T",
    dateSubmitted: "Jan 20, 2024",
    status: "Pending",
    discipline: "Structural",
  },
  {
    initials: "SG",
    name: "Sarah Gomez",
    applicationNumber: "BP-2024-808890-T",
    dateSubmitted: "Jan 22, 2024",
    status: "Pending",
    discipline: "Electrical",
  },
  {
    initials: "RJ",
    name: "Robert Jimenez",
    applicationNumber: "BP-2024-808999-T",
    dateSubmitted: "Jan 25, 2024",
    status: "Verified",
    discipline: "Architectural",
  },
]);

const headers = [
  { title: "Applicant Name", key: "name", sortable: false },
  { title: "Application Number", key: "applicationNumber", sortable: false },
  { title: "Date Submitted", key: "dateSubmitted", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Action", key: "action", sortable: false },
];

const relevantApplicants = computed(() => {
  return applicants.value.filter(
    (a) => a.discipline === mockEvaluatorProfile.value.specialty
  );
});
const totalApplicants = computed(() => relevantApplicants.value.length);
const pendingApplicants = computed(
  () => relevantApplicants.value.filter((a) => a.status === "Pending").length
);
const verifiedApplicants = computed(
  () => relevantApplicants.value.filter((a) => a.status === "Verified").length
);
const returnApplicants = computed(
  () => relevantApplicants.value.filter((a) => a.status === "Return").length
);

const filteredApplicants = computed(() => {
  let filtered = relevantApplicants.value;
  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    filtered = filtered.filter(
      (applicant) =>
        applicant.name.toLowerCase().includes(searchTerm) ||
        applicant.applicationNumber.toLowerCase().includes(searchTerm)
    );
  }
  if (activeFilter.value !== "All" && activeFilter.value !== "Total") {
    filtered = filtered.filter(
      (applicant) => applicant.status === activeFilter.value
    );
  }
  return filtered;
});

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
const getStatusColor = (status) => {
  if (status === "Verified") return "success";
  if (status === "Pending") return "warning";
  if (status === "Return") return "error";
  if (status === "Approved") return "primary";
  return "grey";
};
const stringToHslColor = (str, s, l) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
};
const getAvatarColor = (initials) => {
  const definedColors = {
    JD: "#007bff",
    DT: "#17a2b8",
    JN: "#6f42c4",
    JM: "#007bff",
    SG: "#28a745",
    MP: "#dc3545",
    CL: "#ffc107",
    RJ: "#9c27b0",
    ZL: "#00CCCC",
  };
  return definedColors[initials] || stringToHslColor(initials, 60, 40);
};
const filterByStatus = (status) => {
  activeFilter.value = status === "Total" ? "All" : status;
};

const logout = () => {
  console.log("User logging out...");
  router.push("/login");
};

const viewDetails = () => {
  router.push("/adminlayout/evaluation");
};
</script>

<style scoped>
.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
  transition: background-color 0.2s ease;
}

.profile-btn:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

.custom-data-table {
  border-collapse: collapse;
}

.custom-data-table th {
  background-color: white !important;
  color: #333 !important;
  border-bottom: 1px solid #e0e0e0 !important;
  padding-top: 16px;
  padding-bottom: 16px;
  text-transform: none !important;
  font-size: 0.8rem !important;
}

.data-table-row {
  transition: background-color 0.15s ease;
  border-bottom: 1px solid #f0f0f0;
}
.data-table-row:last-child {
  border-bottom: none;
}

.data-table-row:hover {
  background-color: #f5f5ff !important;
}

.cursor-pointer {
  cursor: pointer;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 600;
  font-size: 16px;
}
</style>