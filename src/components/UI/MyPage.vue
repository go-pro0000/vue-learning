<template>
    <div class="page__wrapper">
        <div
            v-for="pageNumber in pages"
            :key="pageNumber"
            class="page"
            :class="{
                'current-page' : page === pageNumber
            }"
            @click="changePage(pageNumber)"
        >{{ pageNumber }}
    </div>
    </div>
</template>

<script>
    export default {
        name: 'my-page',
        props: {
            pages: {
                type: Number
            },
            modelValue: {
                type: Number
            }
        },
        methods: {
            changePage(pageNumber) {
                console.log(pageNumber);
                this.$emit('update:modelValue', pageNumber);
            }
        }
    }
</script>

<style scoped>
    .page__wrapper {
        display: flex;
        margin-top: 15px;
    }
    .page {
        border: 1px solid black;
        padding: 10px;
    }
    .current-page {
        border: 2px solid teal;
    }
</style>