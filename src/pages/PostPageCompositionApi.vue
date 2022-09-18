<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск...." v-focus>
        </my-input>
        <div class="app__btns">
            <my-button>
                Cоздать пост
            </my-button>
            <my-select v-model="selectedSort" :options="sortOptions">
            </my-select>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <postForm/>
        </my-dialog>
        <postList :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
        <div v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';

import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedAndSearchedPosts} from "@/hooks/useSortedAndSearchedPosts";


export default {
    components: {
        PostForm,
        PostList,
        MyDialog
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ]
        }
    },
    setup(props) {
        const {posts, totalPages, isPostsLoading} = usePosts(10);
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

        return {
            posts,
            totalPages,
            isPostsLoading,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts,
        }
    }
}
</script>

<style>
.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.observer {
    height: 30px;
    background: green;
}
</style> 