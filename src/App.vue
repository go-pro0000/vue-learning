<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <div class="app__btns">
            <my-button @click="showDialog">
                Cоздать пост
            </my-button>
            <my-select>
                v-model="selectedSort"
                :options="sortOptions"
            </my-select>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <postForm @create="createPost" />
        </my-dialog>
        <postList :posts="posts" @remove="removePost" v-if="!isPostsLoading" />
        <div v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import MyDialog from './components/UI/MyDialog.vue';
import axios from 'axios'
import { onMounted } from 'vue';
export default {
    components: {
        PostForm,
        PostList,
        MyDialog
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ]
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id != post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                    this.posts = response.data;
            } catch (e) {
                alert('Ошибка');
            } finally {
                this.isPostsLoading = false;
            }
        },
    },
    mounted() {
        this.fetchPosts();
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}

.app_btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

</style> 