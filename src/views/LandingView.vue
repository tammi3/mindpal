<script setup>
// import { reactive, toRefs } from 'vue'

import OurServices from '@/components/OurServices.vue'
import AboutUs from '@/components/AboutUs.vue'
// import OurTeam from '@/components/OurTeam.vue'
import HeaderView from '@/components/HeaderView.vue'
import SupportUs from '@/components/SupportUs.vue'
import HomeView from '@/components/HomeView.vue'
</script>
<template>
  <div class="font-NotoSans">
    <HeaderView />
    <HomeView />
    <AboutUs />
    <OurServices />
    <!-- <OurTeam /> -->
    <SupportUs />
  </div>
</template>
