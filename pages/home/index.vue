<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link 
                  exact
                  class="nav-link"
                  :class="{active: tab === 'your_feed'}"
                  :to="{
                    name: 'home',
                    query: { tab: 'your_feed' }
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  exact
                  class="nav-link"
                  :class="{active: tab === 'global_feed'}"
                  :to="{
                    name: 'home',
                    query: { tab: 'global_feed' }
                  }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link 
                  exact
                  class="nav-link"
                  :class="{active: tab === 'tag'}"
                  :to="{
                    name: 'home',
                    query: { tab: 'tag', tag }
                  }"
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div 
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link  
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link >
              <div class="info">
                <nuxt-link  
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }"
                >
                  {{article.author.username}}
                </nuxt-link >
                <span class="date">{{article.createdAt | dateFormat}}</span>
              </div>
              <button 
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited
                }"
                :disabled="article.favoritesDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link 
              :to="{
                name: 'article',
                params: {slug: article.slug}
              }" 
              class="preview-link"
            >
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

        </div>
        
        
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link 
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                :to="{
                  name: 'home', 
                  query:{ tab: 'tag', tag }
                }"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- 分页列表 -->
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{
                active: item === page
              }"
              v-for="item in totalPage"
              :key="item"
            >
            <nuxt-link :to="{
              name: 'home',
              query:{
                page: item,
                tag: $route.query.tag,
                tab: $route.query.tab
              }
            }">
              {{item}}
            </nuxt-link>
            </li>
          </ul>
        </nav>
        <!-- /分页列表 -->
      </div>
    </div>

  </div>
</template>

<script>
import { 
  getArticles,
  getYourFeedArticles,
  addFavorite,
  deleteFavorite 
} from '@/api/article'
import { getTags } from '@/api/tags'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  async asyncData({ query }) {
    try{
      const limit = 20
      const page = Number.parseInt(query.page || 1)
      const { tag, tab = 'global_feed' } = query
      const fetchArticles = tab === 'your_feed' ? getYourFeedArticles : getArticles
      const [articleRes, tagsRes] = await Promise.all([
        fetchArticles({
          limit,
          offset: (page - 1) * limit,
          tag
        }),
        getTags()
      ])
      const { articles, articlesCount } = articleRes.data
      let { tags } = tagsRes.data
      articles.forEach(item=> item.favoritesDisabled = false)
      tags =  tags.filter(v=>!!v)
      console.log('asyncData',{articles, articlesCount, tags: tags.filter(v=>!!v)})
      return {
        tab, // 选项卡
        tag, // 数据标签
        page,  // 页码
        limit,// 每页大小
        tags, // 标签列表
        articles,// 文章列表
        articlesCount // 文章总数
      }
    }catch (error){
      console.log({error})
    }
   
  },
  watchQuery: ['page', 'tag', 'tab'], // 监听 url 上 query中参数的变化
  computed:{
    ...mapState(['user']),
    totalPage(){
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite(article){
      article.favoriteDisabled = true
      if(article.favorited){
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      }else{
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  },
}
</script>

<style>
  .pagination{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .pagination .page-item {
    display: inline;
    height: 30px;
    line-height: 16px;
    width: 30px;
    border: 1px solid #5cb85c;
    text-align: center;
    padding: 6px;
  }
  .pagination .page-item.active{
    background: #5cb85c;
  }
  .pagination .active a{
    color: #fff;
  }
</style>