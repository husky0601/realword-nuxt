<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea 
          v-model="commentValue" 
          class="form-control" 
          placeholder="Write a comment..." 
          rows="3"
          :disabled="loading"
        />
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button 
          class="btn btn-sm btn-primary"
          :disabled="loading"
        >
        Post Comment
        </button>
      </div>
    </form>
    
    <div 
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | dateFormat }}</span>
      </div>
    </div>

  </div>
</template>

<script>
 import { getComments, postComments } from '@/api/article'
  export default {
    name: 'ArticleComments',
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        comments: [],
        loading:false,
        commentValue: ''
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      async fetchData(){
        const { data } = await getComments(this.article.slug)
        this.comments = data.comments
        console.log({comments: this.comments})
      },
      async onSubmit(){
        this.loading = true
        await postComments(this.article.slug, {
          comment: {
            body: this.commentValue
          }
        })
        this.fetchData()
        this.commentValue = ''
        this.loading = false
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>