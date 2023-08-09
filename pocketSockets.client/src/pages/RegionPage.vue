<template>
  <div class="region-page" v-if="region">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2 border-end border-dark bg-dark members scrollable-y">
          <div class="bg-warning rounded mb-3">
            <div class="bg-info rounded-top mb-1 px-2">
              <b class="badge">
                {{ region.name }}
              </b>
            </div>
            <div class="bg-warning rounded-bottom px-2">
              <kbd class="badge bg-warning">
                Members {{ members.length }}
              </kbd>
            </div>
          </div>
          <button class="mb-3 btn btn-success w-100" @click="joinRegion()" v-if="!alreadyMember">
            <b>
              Join Region
            </b>
          </button>
          <RegionMember v-for="member in members" :key="member" :member="member" />
        </div>
        <div class="col-sm-10 region-chat scrollable-y">
          <div class="messages-container d-flex flex-column">
            <RegionMessage v-for="message in messages" :key="message.id" :message="message" />
          </div>
        </div>
      </div>
      <div class="row bg-dark sticky-bottom">
        <div class="offset-2 p-0 col-10">
          <div class="chatbar" v-if="alreadyMember">
            <Chatbar />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="loading" v-else>
    <div class="d-flex flex-wrap gap-5">
      <i class="mdi mdi-pokeball mdi-spin fs-1"></i>
      <i class="mdi mdi-pokeball mdi-spin fs-1"></i>
      <i class="mdi mdi-pokeball mdi-spin fs-1"></i>
      <i class="mdi mdi-pokeball mdi-spin fs-1"></i>
      <i class="mdi mdi-pokeball mdi-spin fs-1"></i>
      <i class="mdi mdi-pokeball mdi-spin fs-1"></i>
    </div>
    <div>
      <p class="alert alert-info">Be sure to keep your pokemon healthy when traveling between regions</p>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { regionsService } from '../services/RegionsService.js';
import RegionMember from '../components/RegionMember.vue';
import Chatbar from '../components/Chatbar.vue';
import Pop from '../utils/Pop.js';
import { regionHandler } from '../handlers/RegionHandler.js';

export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      regionsService.getRegion(route.params.id);
      regionsService.getRegionMembers(route.params.id);
      regionsService.getRegionMessages(route.params.id);

      regionHandler.EnterRegion(route.params.id)
    });

    onBeforeRouteLeave(() => {
      regionHandler.LeaveRegion(route.params.id)
    })


    return {
      region: computed(() => AppState.activeRegion),
      members: computed(() => AppState.members),
      messages: computed(() => AppState.messages),
      cover: computed(() => `url(${AppState.activeRegion?.picture}`),
      alreadyMember: computed(() => AppState.members.find(m => m.accountId == AppState.account.id)),
      async joinRegion() {
        try {
          await regionsService.joinRegion(route.params.id)
        } catch (error) {
          Pop.error(error, '[Joining Region]')
        }
      }
    };
  },
  components: { RegionMember, Chatbar }
}
</script>


<style lang="scss" scoped>
.loading {
  display: grid;
  height: calc(100vh - 180px);
  place-content: center;
  justify-items: center;
}

.cover {
  background-image: v-bind(cover);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
  position: relative;
  z-index: 0;
}

.members {
  min-height: calc(100vh);
}

.region-chat {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  min-height: calc(100vh);
}
</style>
