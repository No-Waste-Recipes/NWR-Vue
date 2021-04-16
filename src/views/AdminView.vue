<template>
  <div class="admin">
    <h1>Admin</h1>
    <RouterLink :to="{ name: 'AdminRecipeApprove'}">Approve recipes</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'AdminView'
}
</script>

<style scoped>

</style>
