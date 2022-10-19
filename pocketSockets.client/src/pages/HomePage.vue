<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4" v-for="region in regions" :key="region.id">
        <RegionCard :region="region" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import RegionCard from '../components/RegionCard.vue';
import { regionsService } from '../services/RegionsService.js'

export default {
  setup() {
    onMounted(() => {
      regionsService.getRegions();
    });
    return {
      regions: computed(() => AppState.regions)
    };
  },
  components: { RegionCard }
}
</script>

<style scoped lang="scss">

</style>
