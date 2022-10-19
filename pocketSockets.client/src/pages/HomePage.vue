<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-dark rounded elevation-3" @click="toggleLight()">
      <h1>
        <i class="mdi" :class="{
          'mdi-lightbulb-on glow': lightIsOn,
          'mdi-lightbulb-variant-outline text-primary darken-40': !lightIsOn
        } "></i>
      </h1>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { LightHandler } from '../handlers/LightHandler.js'


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

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .glow {
    filter: drop-shadow(0 0 4px rgb(250, 250, 246)) drop-shadow(0 0 20px rgb(255, 255, 225)) drop-shadow(0 0 40px rgba(255, 255, 225, 0.524));
    color: rgb(242, 242, 171);
  }


}
</style>
