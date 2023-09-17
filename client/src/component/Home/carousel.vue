<template>
    <div> 
    <b-carousel

    id="carousel-1"
    v-model="slide"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    img-width="1024"
    img-height="480"
    style="text-shadow: 1px 1px 2px #333;"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"

    ></b-carousel>

    <b-carousel-slide img-src="https://storage.googleapis.com/hairdressr-prod-blog/barberare-kungsholmen/barbershop.jpg">

    </b-carousel-slide>

    <b-carousel-slide img-src="https://images.squarespace-cdn.com/content/v1/6401e14b44c9bd5c9d86ac28/598a0554-ab45-4bc4-80d4-1f8a558c0cf3/tpbsm-homepage.JPG">
    
    </b-carousel-slide>

    <b-carousel-slide img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAhy2WcsMW1bz82VrS3qznmFVtX74KEKVKRw&usqp=CAU">

    </b-carousel-slide>

    
</div>
    
</template>

<script>

export default {
    data(){
        return{
            slide: 0,
            sliding: null
        }
    }
}

methods: {
    onSlideStart(slide)
        this.sliding = true
    }

    onSlideEnd(slide)
        this.sliding = false
    

</script>