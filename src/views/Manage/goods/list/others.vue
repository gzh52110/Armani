<template>
  <category :mainCategory="mainCategory"></category>
</template>


<script>
import category from "./category.vue"
export default {
  data(){
    return {
      mainCategory:'m-others'
    }
  },
  components:{
category
  }
}
</script>