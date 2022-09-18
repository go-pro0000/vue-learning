import {ref , computed} from 'vue'


export function useSortedAndSearchedPosts(sortedPosts) {
    const searchQuery = ref('');
    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLocaleLowerCase()));
    })

    return {
        searchQuery, sortedAndSearchedPosts
    }
}