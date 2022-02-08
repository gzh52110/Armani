<template>
  <category :mainCategory="mainCategory"></category>
</template>


<script>
import category from "./category.vue"
export default {
  data(){
    return {
      mainCategory:'m-fragrance'
    }
  },
  components:{
category
  }
}
</script>