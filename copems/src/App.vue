<template>
  <v-app>
    <v-main style="padding: 0; margin: 0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

onMounted(() => {
  auth.checkSession(); // Restore login state after refresh
});
</script>
