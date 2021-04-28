<template>
  <div class="admin">
    <h1>Admin</h1>
    <RouterLink :to="{ name: 'AdminRecipeApprove'}">Approve recipes</RouterLink>
    <br>
    <RouterLink :to="{ name: 'AdminUserOverview'}">User overview</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'AdminView'
}
</script>
