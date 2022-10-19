<template>
  <div class="light-component selectable no-select">
    <i class="mdi" @click="toggleLight()" :class="{
      'mdi-lightbulb-on glow': lightIsOn,
      'mdi-lightbulb-variant-outline text-success darken-20': !lightIsOn
    } "></i>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { LightHandler } from '../handlers/LightHandler.js';

export default {
  setup() {
    onMounted(() => {
      LightHandler.getLightState()
    })

    return {
      lightIsOn: computed(() => AppState.lightIsOn),
      toggleLight() {
        LightHandler.toggleLight()
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.glow {
  filter: drop-shadow(0 0 4px rgb(250, 250, 246)) drop-shadow(0 0 20px rgb(255, 255, 225)) drop-shadow(0 0 40px rgba(255, 255, 225, 0.524));
  color: rgb(242, 242, 171);
}
</style>
