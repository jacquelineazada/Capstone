<template>
  <v-card class="mx-auto applications-table-card" flat>
    <v-card-title class="text-h5 pb-1">Approved Applications</v-card-title>
    <v-card-subtitle class="pb-3"
      >View all approved building permit applications</v-card-subtitle
    >

    <v-data-table
      :headers="headers"
      :items="applications"
      item-key="applicationNumber"
      class="elevation-0"
    >
      <template v-slot:item.applicantName="{ item }">
        <div class="d-flex align-center py-2">
          <v-avatar
            :color="item.avatarColor"
            size="36"
            class="mr-3 text-white font-weight-bold"
          >
            {{ item.initials }}
          </v-avatar>
          <span>{{ item.applicantName }}</span>
        </div>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip
          color="success"
          size="small"
          variant="tonal"
          class="font-weight-medium"
        >
          {{ item.status }}
        </v-chip>
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn
          color="primary"
          variant="flat"
          size="small"
          @click="viewDetails(item.applicationNumber)"
        >
          View Details
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "ApprovedApplicationsCombined",

  data() {
    return {
      // Header configuration
      headers: [
        { title: "Applicant Name", key: "applicantName", sortable: false },
        {
          title: "Application Number",
          key: "applicationNumber",
          sortable: false,
        },
        { title: "Date Submitted", key: "dateSubmitted", sortable: false },
        { title: "Status", key: "status", sortable: false, align: "start" },
        { title: "Action", key: "action", sortable: false, align: "end" },
      ],
      // Data matching the rows in the first image
      applications: [
        {
          applicantName: "John Martinez",
          applicationNumber: "APP-2024-001",
          dateSubmitted: "Oct 15, 2024",
          status: "Approved",
          initials: "JM",
          avatarColor: "blue-grey-lighten-1",
        },
        {
          applicantName: "Maria Santos",
          applicationNumber: "APP-2024-002",
          dateSubmitted: "Oct 20, 2024",
          status: "Approved",
          initials: "MS",
          avatarColor: "green-lighten-1",
        },
        {
          applicantName: "David Chen",
          applicationNumber: "APP-2024-003",
          dateSubmitted: "Nov 1, 2024",
          status: "Approved",
          initials: "DC",
          avatarColor: "red-lighten-1",
        },
        {
          applicantName: "Lisa Reyes",
          applicationNumber: "APP-2024-004",
          dateSubmitted: "Nov 5, 2024",
          status: "Approved",
          initials: "LR",
          avatarColor: "orange-lighten-1",
        },
        {
          applicantName: "Robert Tan",
          applicationNumber: "APP-2024-005",
          dateSubmitted: "Nov 8, 2024",
          status: "Approved",
          initials: "RT",
          avatarColor: "teal-lighten-1",
        },
        {
          applicantName: "Anna Garcia",
          applicationNumber: "APP-2024-006",
          dateSubmitted: "Nov 10, 2024",
          status: "Approved",
          initials: "AG",
          avatarColor: "grey-lighten-1",
        },
      ],
    };
  },
  methods: {
    // Placeholder function for button action
    viewDetails(appNumber) {
      console.log(`Viewing details for application: ${appNumber}`);
      alert(`Navigating to details for ${appNumber}`);
    },
  },
};
</script>

<style scoped>
/* Remove shadow from the main card */
.applications-table-card {
  box-shadow: none;
}

/* Ensure table rows/cells look clean and aligned */
.v-data-table {
  border-radius: 0;
  box-shadow: none;
}

/* Target all table rows to ensure clean horizontal separators like the second design */
.v-data-table :deep(tr) {
  border-bottom: 1px solid #eee !important;
}

/* Ensure the table cell content is centered vertically for better alignment */
.v-data-table :deep(td) {
  vertical-align: middle;
}
</style>