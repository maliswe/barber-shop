<template>
    <div id="slider">
        <input name="slider" id="slide1" value="slide1" v-model="currentSlide">
        <input name="slider" id="slide2" value="slide2" v-model="currentSlide">
        <input name="slider" id="slide3" value="slide3" v-model="currentSlide">
        <div id="slides">
            <div id="overflow">
                <div class="inner">
                    <article v-for="(slotContent, index) in $slots.default" :key="index">
                        <slot :name="'img' + (index + 1)"></slot>
                    </article>
                </div> <!-- .inner -->
            </div> <!-- #overflow -->
        </div>
        <label for="slide1"></label>
        <label for="slide2"></label>
        <label for="slide3"></label>
    </div>
</template>
<script>
export default {
  data() {
    return {
      currentSlide: 'slide1'
    }
  },
  methods: {
    updateSlide() {
      const slides = ['slide1', 'slide2', 'slide3']
      const currentIndex = slides.indexOf(this.currentSlide)
      this.currentSlide = slides[(currentIndex + 1) % slides.length]
    }
  }
}
</script>

<style scoped>
body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    color: #393939;
    text-align: center;
}

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
}

#slider {
    max-width: 600px;
    text-align: center;
    margin: 0 auto;
}

#overflow {
    width: 100%;
    overflow: hidden;
}

#slides .inner {
    width: 400%;
}

#slides .inner {
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -o-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);

    -webkit-transition: all 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
    -moz-transition: all 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
    -o-transition: all 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
    -ms-transition: all 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
    transition: all 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);

    -webkit-transition-timing-function: cubic-bezier(0.770, 0.000, 0.175, 1.000);
    -moz-transition-timing-function: cubic-bezier(0.770, 0.000, 0.175, 1.000);
    -o-transition-timing-function: cubic-bezier(0.770, 0.000, 0.175, 1.000);
    -ms-transition-timing-function: cubic-bezier(0.770, 0.000, 0.175, 1.000);
    transition-timing-function: cubic-bezier(0.770, 0.000, 0.175, 1.000);
}

#slides article {
    width: 25%;
    float: left;
}

#slide1:checked~#slides .inner {
    margin-left: 0;
}

#slide2:checked~#slides .inner {
    margin-left: -100%;
}

#slide3:checked~#slides .inner {
    margin-left: -200%;
}

#slide4:checked~#slides .inner {
    margin-left: -300%;
}

input[type="radio"] {
    display: none;
}

label {
    background: #CCC;
    display: inline-block;
    cursor: pointer;
    width: 10px;
    height: 10px;
    border-radius: 5px;
}

#slide1:checked~label[for="slide1"],
#slide2:checked~label[for="slide2"],
#slide3:checked~label[for="slide3"],
#slide4:checked~label[for="slide4"] {
    background: #333;
}
</style>
