<template>
  <Profile></Profile>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Profile from '@/components/user/Profile.vue'

@Component({
  components: { Profile }
})
export default class UserProfile extends Vue {
}
</script>
