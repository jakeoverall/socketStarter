<template>
  <div class="region-message my-3 p-3"
    :class="message.creatorId == account.id ? 'bg-success lighten-30 self':'bg-primary lighten-30'">
    <div class="mb-2 d-flex justify-content-between">
      <div class="on-hover">
        <small>
          <b>
            {{new Date(message.createdAt).toLocaleDateString('en-US',{ 'dateStyle': 'medium'})}}
            {{new Date(message.createdAt).toLocaleTimeString()}}
          </b>
        </small>
      </div>
      <div>
        <img :src="message.creator.picture" :alt="message.creator.name" :title="message.creator.name" class="creator">
        <span class="ms-2">{{message.creator.name}}</span>
      </div>
    </div>
    <div class="content">
      <div v-html="message.body"></div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';

export default {
  props: {
    message: { type: Object, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.region-message {
  max-width: 50vw;

  .content {
    font-size: 16px;

    img,
    video {
      max-width: 80%;
      max-height: 500px;
    }

    p {
      max-width: 80ch;
    }
  }

  .creator {
    height: 32px;
    width: 32px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }

  &.self {
    align-self: flex-end;
  }
}
</style>
