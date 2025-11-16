<template>
  <v-app class="bg-grey-lighten-4">
    <v-app-bar
      color="white"
      elevation="1"
      density="compact"
      class="border-b border-grey-lighten-2 sticky top-0 z-10"
    >
      <v-container class="d-flex align-center py-2">
        <v-btn
          variant="text"
          size="small"
          @click="onBack"
          class="text-none"
          prepend-icon="mdi-arrow-left"
        >
          Back to List
        </v-btn>

        <v-divider vertical class="mx-4" />

        <div class="d-flex align-center flex-grow-1">
          <h1 class="text-h6 text-grey-darken-4 mr-3">
            {{ application.projectName }}
          </h1>
          <v-chip color="success" size="small" class="font-weight-bold" label>
            Approved
          </v-chip>
        </div>
      </v-container>
    </v-app-bar>

    <v-container class="py-8">
      <v-row>
        <v-col cols="12" lg="8">
          <div class="space-y-6">
            <v-card elevation="0" class="border border-grey-lighten-2">
              <v-card-title
                class="d-flex align-center text-subtitle-1 font-weight-bold pt-4 pb-2"
              >
                <v-icon
                  icon="mdi-file-document-outline"
                  size="20"
                  class="mr-2"
                />
                Basic Information
              </v-card-title>
              <v-card-subtitle class="text-caption mb-2">
                Application ID: {{ application.id }}
              </v-card-subtitle>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="6">
                    <div
                      class="text-caption text-grey-darken-1 d-flex align-center mb-1"
                    >
                      <v-icon
                        icon="mdi-account-circle-outline"
                        size="16"
                        class="mr-1"
                      />
                      Applicant Name
                    </div>
                    <p class="text-body-1 pl-5 text-grey-darken-4">
                      {{ application.applicantName }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="text-caption text-grey-darken-1 d-flex align-center mb-1"
                    >
                      <v-icon
                        icon="mdi-office-building-outline"
                        size="16"
                        class="mr-1"
                      />
                      Project Name
                    </div>
                    <p class="text-body-1 pl-5 text-grey-darken-4">
                      {{ application.projectName }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="text-caption text-grey-darken-1 d-flex align-center mb-1"
                    >
                      <v-icon
                        icon="mdi-map-marker-outline"
                        size="16"
                        class="mr-1"
                      />
                      Project Location
                    </div>
                    <p class="text-body-1 pl-5 text-grey-darken-4">
                      {{ application.projectLocation }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="text-caption text-grey-darken-1 d-flex align-center mb-1"
                    >
                      <v-icon icon="mdi-home-outline" size="16" class="mr-1" />
                      Property Type
                    </div>
                    <p class="text-body-1 pl-5 text-grey-darken-4">
                      {{ application.propertyType }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="text-caption text-grey-darken-1 d-flex align-center mb-1"
                    >
                      <v-icon icon="mdi-ruler-square" size="16" class="mr-1" />
                      Floor Area
                    </div>
                    <p class="text-body-1 pl-5 text-grey-darken-4">
                      {{ application.floorArea }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="text-caption text-grey-darken-1 d-flex align-center mb-1"
                    >
                      <v-icon
                        icon="mdi-ruler-square-compass"
                        size="16"
                        class="mr-1"
                      />
                      Lot Area
                    </div>
                    <p class="text-body-1 pl-5 text-grey-darken-4">
                      {{ application.lotArea }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="text-caption text-grey-darken-1 d-flex align-center mb-1"
                    >
                      <v-icon
                        icon="mdi-office-building-cog-outline"
                        size="16"
                        class="mr-1"
                      />
                      Building Use
                    </div>
                    <p class="text-body-1 pl-5 text-grey-darken-4">
                      {{ application.buildingUse }}
                    </p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="text-caption text-grey-darken-1 d-flex align-center mb-1"
                    >
                      <v-icon
                        icon="mdi-layers-outline"
                        size="16"
                        class="mr-1"
                      />
                      Number of Floors
                    </div>
                    <p class="text-body-1 pl-5 text-grey-darken-4">
                      {{ application.numberOfFloors }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <div
                      class="text-caption text-grey-darken-1 d-flex align-center mb-1"
                    >
                      <v-icon
                        icon="mdi-map-marker-path"
                        size="16"
                        class="mr-1"
                      />
                      Property Address
                    </div>
                    <p class="text-body-1 pl-5 text-grey-darken-4">
                      {{ application.propertyAddress }}
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card elevation="0" class="border border-grey-lighten-2">
              <v-card-title
                class="d-flex align-center text-subtitle-1 font-weight-bold pt-4 pb-2"
              >
                <v-icon icon="mdi-file-check-outline" size="20" class="mr-2" />
                Approved & Evaluated Plans
              </v-card-title>
              <v-card-subtitle class="text-caption mb-2">
                View the approved and evaluated PDF plans for this application
              </v-card-subtitle>
              <v-card-text>
                <v-tabs v-model="tab" color="primary" grow>
                  <v-tab value="approved" class="text-none"
                    >Approved Plan</v-tab
                  >
                  <v-tab value="evaluated" class="text-none"
                    >Evaluated Plan</v-tab
                  >
                </v-tabs>

                <v-window v-model="tab" class="mt-4">
                  <v-window-item value="approved">
                    <div
                      class="border border-grey-lighten-2 rounded-lg bg-grey-lighten-3 pa-8 d-flex flex-column align-center justify-center min-h-[600px]"
                    >
                      <v-icon
                        icon="mdi-file-check-outline"
                        size="64"
                        color="grey-lighten-1"
                        class="mb-4"
                      />
                      <p class="text-body-1 text-grey-darken-1 mb-4">
                        Approved Plan PDF
                      </p>
                      <p
                        class="text-subtitle-2 text-grey-darken-2 mb-6 text-center"
                      >
                        {{ application.approvedPlanUrl }}
                      </p>
                      <div class="d-flex">
                        <v-btn color="primary" variant="flat" class="me-3">
                          View PDF
                        </v-btn>
                        <v-btn variant="outlined"> Download PDF </v-btn>
                      </div>
                      <p class="text-caption text-grey-darken-1 mt-4">
                        In a production environment, the PDF would be displayed
                        here using a PDF viewer library
                      </p>
                    </div>
                  </v-window-item>

                  <v-window-item value="evaluated">
                    <div
                      class="border border-grey-lighten-2 rounded-lg bg-grey-lighten-3 pa-8 d-flex flex-column align-center justify-center min-h-[600px]"
                    >
                      <v-icon
                        icon="mdi-file-check-outline"
                        size="64"
                        color="grey-lighten-1"
                        class="mb-4"
                      />
                      <p class="text-body-1 text-grey-darken-1 mb-4">
                        Evaluated Plan PDF
                      </p>
                      <p
                        class="text-subtitle-2 text-grey-darken-2 mb-6 text-center"
                      >
                        {{ application.evaluatedPlanUrl }}
                      </p>
                      <div class="d-flex">
                        <v-btn color="primary" variant="flat" class="me-3">
                          View PDF
                        </v-btn>
                        <v-btn variant="outlined"> Download PDF </v-btn>
                      </div>
                      <p class="text-caption text-grey-darken-1 mt-4">
                        In a production environment, the PDF would be displayed
                        here using a PDF viewer library
                      </p>
                    </div>
                  </v-window-item>
                </v-window>
              </v-card-text>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" lg="4">
          <v-card elevation="0" class="border border-grey-lighten-2 h-100">
            <v-card-title
              class="d-flex align-center text-subtitle-1 font-weight-bold pt-4 pb-2"
            >
              <v-icon icon="mdi-check-all" size="20" class="mr-2" />
              Physical Document Checklist
            </v-card-title>
            <v-card-subtitle class="text-caption mb-2">
              Required documents for building permit application
            </v-card-subtitle>
            <v-card-text class="space-y-4">
              <div class="max-h-[1050px] overflow-y-auto pr-3">
                <div class="text-body-2 space-y-2">
                  <div
                    v-for="(item, index) in documentChecklist"
                    :key="index"
                    class="d-flex align-start py-2"
                  >
                    <v-icon
                      icon="mdi-check-square"
                      size="20"
                      color="success"
                      class="flex-shrink-0 mt-0"
                    />
                    <div class="ml-3 flex-grow-1">
                      <p class="text-grey-darken-4 font-weight-medium">
                        {{ item.name }}
                      </p>
                      <p class="text-caption text-grey-darken-1 mt-0">
                        {{ item.copies }}
                      </p>
                      <ul
                        v-if="item.subItems"
                        class="mt-2 ml-4 text-caption text-grey"
                      >
                        <li
                          v-for="(sub, subIndex) in item.subItems"
                          :key="subIndex"
                        >
                          • {{ sub }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <v-divider class="my-4" />

                <div class="space-y-3 pt-2 text-body-2">
                  <div>
                    <p
                      class="text-subtitle-2 text-grey-darken-3 font-weight-medium"
                    >
                      Important Notes:
                    </p>
                    <ul
                      class="mt-2 ml-4 space-y-1.5 text-caption text-grey-darken-1"
                    >
                      <li>
                        • All documents must be originals or certified true
                        copies
                      </li>
                      <li>
                        • Plans must be signed and sealed by licensed
                        professionals
                      </li>
                      <li>
                        • Incomplete documents will cause delays in processing
                      </li>
                      <li>• All copies must be clear and legible</li>
                    </ul>
                  </div>

                  <div>
                    <p
                      class="text-subtitle-2 text-grey-darken-3 font-weight-medium"
                    >
                      Processing Timeline:
                    </p>
                    <p class="text-caption text-grey-darken-1 mt-1.5">
                      Standard processing time is 20 working days upon
                      submission of complete requirements. Express processing
                      options may be available for urgent applications.
                    </p>
                  </div>

                  <div>
                    <p
                      class="text-subtitle-2 text-grey-darken-3 font-weight-medium"
                    >
                      Document Submission:
                    </p>
                    <p class="text-caption text-grey-darken-1 mt-1.5">
                      All physical documents must be submitted to the Building
                      Official's Office during office hours (8:00 AM - 5:00 PM,
                      Monday to Friday).
                    </p>
                  </div>

                  <div>
                    <p
                      class="text-subtitle-2 text-grey-darken-3 font-weight-medium"
                    >
                      For Inquiries:
                    </p>
                    <p class="text-caption text-grey-darken-1 mt-1.5">
                      Contact the Building Permits Division at (02) 8888-9999 or
                      email buildingpermits@city.gov.ph for document
                      verification and requirements clarification.
                    </p>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

// --- MOCK INTERFACE (Necessary for TypeScript) ---
export interface Application {
  id: string;
  projectName: string;
  applicantName: string;
  projectLocation: string;
  propertyType: string;
  floorArea: string;
  lotArea: string;
  buildingUse: string;
  numberOfFloors: number | string;
  propertyAddress: string;
  approvedPlanUrl: string;
  evaluatedPlanUrl: string;
}

// --- PROPS DEFINITION ---
interface ApplicationDetailProps {
  application: Application;
  onBack: () => void;
}
const props = defineProps<ApplicationDetailProps>();

// --- COMPONENT STATE ---
const tab = ref("approved");

// --- DATA: DOCUMENT CHECKLIST ---
const documentChecklist = [
  {
    name: "Filled-up Unified Application Form for Building Permit",
    copies: "4 copies",
  },
  {
    name: "Duly Accomplished Ancillary Permit Forms (Signed & Sealed by respective Design Professionals)",
    copies: "4 copies",
  },
  {
    name: "Design Plans and Other Related Documents (Signed & Sealed by respective Design Professionals)",
    copies: "4 sets",
    subItems: [
      "Architectural Documents",
      "Civil/Structural Documents",
      "Electrical Documents",
      "Sanitary Documents",
      "Plumbing Documents",
      "Mechanical Documents",
      "Electronics Documents",
      "Geodetic Documents",
      "Fire Protection Documents (if applicable)",
    ],
  },
  {
    name: "Lot Plan with Certification of Non-Encroachment (Signed & Sealed by a Geodetic Engineer)",
    copies: "3 sets",
  },
  {
    name: "Photocopies of Valid Licenses (PRC ID) of all involved Professionals",
    copies: "3 copies",
  },
  {
    name: "Notarized estimated value of the building/structure to be erected as declared by the owner (Signed & Sealed by an Architect or Civil Engineer)",
    copies: "3 copies",
  },
  {
    name: "Technical Specifications (Signed & Sealed by an Architect or Civil Engineer)",
    copies: "3 copies",
  },
  { name: "Structural Design and Seismic Analysis", copies: "2 copies" },
  {
    name: "Soil Test (Signed & Sealed by a Civil Engineer)*",
    copies: "2 copies",
    subItems: [
      "Plate Load Test Result (for 2-storeys with roof deck)",
      "Soil Boring Test Result (for 3-storeys and above)",
    ],
  },
  { name: "Electrical Design Analysis", copies: "2 copies" },
  {
    name: "Original Certificate of Title (OCT) / Transfer Certificate Title (TCT), Deed of Absolute Sale or Locational Plan from LRA (if lessee, Contract of Lease)",
    copies: "2 copies",
  },
  { name: "Tax Declaration", copies: "2 copies" },
  { name: "Tax Receipt", copies: "2 copies" },
  {
    name: "Construction Safety and Health Program approved by DOLE (Original)",
    copies: "2 copies",
  },
  {
    name: "Fire Safety Evaluation Clearance from BFP (Original)",
    copies: "2 copies",
  },
  { name: "Locational Clearance from CPDO (Original)", copies: "2 copies" },
  {
    name: "DPWH Clearance (if project is along National Highway)",
    copies: "2 copies",
  },
  {
    name: "ECC from DENR or ENRO Clearance from CENRO (for Commercial and Industrial)",
    copies: "2 copies",
  },
  { name: "Barangay Clearance", copies: "2 copies" },
  { name: "Other Clearances:", copies: "As required" },
];
</script>

<style scoped>
/* Scoped CSS for spacing utilities */
.space-y-6 > * + * {
  margin-top: 1.5rem;
}
.space-y-4 > * + * {
  margin-top: 1rem;
}
.space-y-3 > * + * {
  margin-top: 0.75rem;
}
.space-y-2 > * + * {
  margin-top: 0.5rem;
}
.space-y-1\.5 > * + * {
  margin-top: 0.375rem;
}

.min-h-\[600px\] {
  min-height: 600px;
}
.max-h-\[1050px\] {
  max-height: 1050px;
}
</style>