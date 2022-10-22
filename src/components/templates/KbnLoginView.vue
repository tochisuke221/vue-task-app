<template>
  <div class="login-view">
    <h1>Kanban App</h1>
    <KbnLoginForm :onlogin="handleLogin"></KbnLoginForm>
  </div>
</template>

<script>
import KbnLoginForm from '@/components/molecules/KbnLoginForm'

export default {
  name: 'KbnLoginView',

  components: {
    KbnLoginForm
  },

  methods: {
    handleLogin (authInfo) {
      return this.$store.dispach('login', authInfo)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(err => this.throwReject(err))
    },
    throwReject (err) { return Promise.reject(err) }
  }
}
</script>

<style scoped>
.login-form {
  width: 320px;
  margin: auto;
}
</style>
