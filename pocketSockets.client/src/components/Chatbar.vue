<template>
  <form @submit.prevent="handleSubmit()" class="component me-5">
    <div class="input-group">
      <input type="text" placeholder="Send a message to the members of this region..." class="square form-control" minlength="1" maxlength="50000" v-model="editable.body">
      <button type="submit" class="btn input-group-addon"><i class="mdi text-light mdi-send mdi-rotate-315"></i></button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { regionsService } from '../services/RegionsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()

    return {
      editable,
      async handleSubmit() {
        try {
          regionsService.createMessage(route.params.id, editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error, '[Sending Message]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
