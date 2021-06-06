<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
            <nuxt-link to="/login"  v-else>Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template 
              v-for="(messages, field) in errors"
            >
              <li 
                v-for="(message, index) in messages"
                :key="`${message}-${index}`"
              >{{field}} {{message}}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group"  v-if="!isLogin">
              <input v-model="user.username"  class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin ? 'Signin' : 'Signup'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import {login} from '@/api/user'

// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated', // 会操作middleware文件夹下的notAuthenticated文件
  name: 'LoginIndex',
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  data() {
    return  {
      user: {
        email: '',
        password: '',
        username: ''
      },
      errors: {} // 处理错误信息
    }
  },
  methods: {
    async onSubmit() {
      try{
        const { data } = await login({user: this.user})
        console.log('onSubmit', {data})
        // TODO: 保存用户的登录状态
        this.$store.commit('setUser', data.user)

        // 为了防止双薪页面数据丢失，我们需要把数据持久化
        Cookie.set('user', data.user)
        // 跳转到首页
        this.$router.push('/')
      } catch (error) {
        console.log('onSubmit error', {error})
        this.errors = error.response.data.errors
      }
    }
  },
}
</script>