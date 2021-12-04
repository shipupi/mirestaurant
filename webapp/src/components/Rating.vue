<template>
    <div class="rating">
        <span v-for="i in parseInt(rating)" :key="name + i" class="fa fa-star checked"></span>
        <span v-for="i in (5 - parseInt(rating))" :key="name + (parseInt(rating) + i)" class="fa fa-star "></span>
        <span class="rating-val">{{rating}}</span>
    </div>
</template>


<script>
export default {
  name: 'Rating',
  props: {
    rating: Number,
    name: String,
  }
}
</script>
<style scoped>
.rating-val {
    font-size: 30px;
    padding-left: 10px;
}
.fa-star {
    font-size: 30px;
}
.checked {
  color: orange;
}

.halfway {
    position: relative;
}

.star-container {
    display: inline-block;
    height: 30px;
    overflow: hidden;
}

.rating {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>