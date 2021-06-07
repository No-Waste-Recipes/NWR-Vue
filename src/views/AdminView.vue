<template>
  <div class="admin">
    <h1>Admin</h1>
    <RouterLink :to="{ name: 'AdminRecipeApprove'}">Approve recipes</RouterLink>
    <br>
    <RouterLink :to="{ name: 'AdminUserOverview'}">User overview</RouterLink>
    <br>
    <RouterLink :to="{ name: 'AdminReports'}">Reports</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'AdminView'
}
</script>
