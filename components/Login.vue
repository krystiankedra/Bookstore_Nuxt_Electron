<template>
<div class="container">
  <div class="row">
    <form class="mt-5 col-md-7 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h5>Login Panel <i class="fas fa-users-cog"></i></h5>
        </div>
        <div class="card-body">
 <div class="form-group mt-5">
        <label for="login">Login <i class="fas fa-users-cog"></i></label>
        <input type="text" v-model="login" class="form-control" placeholder="Provide login (User ID)">
      </div>
      <div class="form-group">
        <label for="password">Password <i class="fas fa-key"></i></label>
        <input type="password" v-model="password" class="form-control" placeholder="Provide Password (Token)">
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-outline-success" @click.prevent="LoggingToApp">Login <i class="fas fa-sign-in-alt"></i></button>
      </div>
        </div>
      </div>
    </form>
    <transition name="slide" mode="out-in">
    <div class="col-md-5 col-sm-12" v-if="validation">
      <div class="mt-5 alert alert-danger">
        <span>Provided Login or Password is not correct.</span>
      </div>
    </div>
    </transition>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        login: '',
        password: '',
        validation: false,
      }
    },
    methods: {
      async LoggingToApp() {
        try {
          if (this.$store.getters.books[0].user == this.login && this.$store.getters.token == this.password) {
            await this.$store.commit('SET_LOGIN_STATUS', true)
            localStorage.setItem('reqToken', this.$store.getters.token)
            await this.$router.push('/home')
          } else {
            this.$set(this, 'validation', true)
            this.$set(this, 'login', '')
            this.$set(this, 'password', '')
            this.$store.commit('SET_LOGIN_STATUS', false)
          }
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      }
    }
  }

</script>

<style>
  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
  }
  .slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  }
  @keyframes slide-in {
    from {
      opacity:0;
      transform: translateY(-20px);
    } to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slide-out {
    from {
      opacity: 1;
      transform: translateY(0);
    } to {
      opacity: 0;
      transform: translateY(-20px)
    }
  }
</style>
