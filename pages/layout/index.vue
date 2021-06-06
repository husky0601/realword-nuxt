<template>
  <div>
    <!-- 头部 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link" exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link to="/editor" class="nav-link">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/setting" class="nav-link">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
              <!--<a class="nav-link" href="">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </a>-->
            </li>
            <li class="nav-item">
              <nuxt-link to="/profile/123" class="nav-link">
                <img
                  class="user-pic"
                  :src="user.image"
                >
                {{ user.username }}
              </nuxt-link>
            </li>
          </template>
          
          <template v-else>
             <li class="nav-item">
              <nuxt-link to="/register" class="nav-link">Sign up</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/login" class="nav-link" >Sign in</nuxt-link>
            </li>
          </template>

        </ul>
      </div>
    </nav>
    <!-- /头部 -->

    <!-- 动态路由 -->
    <nuxt-child />

    <!-- 尾部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /尾部 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'LayoutIndex',
  computed: {
    ...mapState(['user'])
  }
}
</script>