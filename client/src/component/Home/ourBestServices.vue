<template>
    <section class="services-section">
        <div class="features-content">
            <h2>Our Best Services</h2>
            <div class="arrow left-arrow" @click="prevSlide">&#8592;</div>
            <div class="slider">
                <div v-for="service in services" :key="service.id" class="slide">
                    <div class="slide-content">
                        <img :src="service.image" :alt="service.alt"
                            :class="{ 'active-slide': service.id === activeSlide }">
                        <div class="slide-title" v-if="service.id !== activeSlide">{{ service.title }}</div>
                        <div class="slide-description" v-if="service.id === activeSlide">
                            <img :src="service.icon" class="description-icon" alt="Service Icon">
                            {{ service.text }}
                        </div>
                    </div>

                </div>
            </div>
            <div class="arrow right-arrow" @click="nextSlide">&#8594;</div>
            <div class="indicators">
                <span v-for="dot in services.length" :key="dot" class="dot" :class="{ active: dot === activeSlide }"
                    @click="setActiveSlide(dot)"></span>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  data() {
    return {
      activeSlide: 1,
      services: [
        {
          id: 1,
          title: 'Women Hair Cut',
          image: require('../../assets/first.png'),
          icon: require('../../assets/scissors1.png'),
          alt: 'Service 1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        },
        {
          id: 2,
          title: 'Men Hair Cut',
          image: require('../../assets/second.png'),
          icon: require('../../assets/scissors1.png'),
          alt: 'Service 2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        },
        {
          id: 3,
          title: 'Child Hair Cur',
          image: require('../../assets/third.png'),
          icon: require('../../assets/scissors1.png'),
          alt: 'Service 3',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        },
        {
          id: 4,
          title: 'Piecering',
          image: require('../../assets/forth.png'),
          icon: require('../../assets/scissors1.png'),
          alt: 'Service 4',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        }
      ]
    }
  },
  methods: {
    prevSlide() {
      if (this.activeSlide > 1) {
        this.activeSlide--
      } else {
        this.activeSlide = this.services.length
      }
    },

    nextSlide() {
      if (this.activeSlide < this.services.length) {
        this.activeSlide++
      } else {
        this.activeSlide = 1
      }
    },
    setActiveSlide(slideNumber) {
      this.activeSlide = slideNumber
    }
  }
}
</script>
<style lang="scss" scoped>
.services-section {
    text-align: center;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .features-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        h2 {
            font-weight: bold;
            position: relative;
            top: 5%;
            margin-bottom: 3rem;

            &::before {
                content: "";
                position: absolute;
                top: 100%;
                transform: translateY(100%);
                left: 50%;
                height: 6px;
                width: calc(1.5ch + 1px);
                background-color: #EBB273;
            }
        }

        .slider {
            display: flex;
            overflow: auto;
            gap: 5px;
            margin-bottom: 20px;
            width: auto;
            padding: 0 40px;
            position: relative;
        }

        .slide {
            flex: 0 0 auto;
            width: 100%;
            max-width: 300px;

            .slide-content {
                position: relative;

                img {
                    max-width: 100%;
                    height: 90%;
                    transition: background-color 0.3s ease, opacity 0.3s ease;

                    &.active-slide {
                        background-color: rgba(0, 0, 0, 0.596);
                        opacity: 0.7;
                    }
                }

                .slide-title {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-weight: bold;
                    transition: opacity 0.3s ease;
                }

                .slide-description {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    font-size: 1rem;
                    transition: opacity 0.3s ease;
                    opacity: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-top: 3px;

                    .description-icon {
                        width: 40px;
                        height: 40px;
                        margin-bottom: 10px;
                    }
                }
            }
        }

        .indicators {
            display: flex;
            justify-content: center;
            gap: 5px;

            .dot {
                height: 10px;
                width: 10px;
                background-color: #bbb;
                border-radius: 50%;
                display: inline-block;
                transition: background-color 0.3s ease;
                box-sizing: border-box;

                &.active {
                    background-color: #202020;
                    border: 2px solid #EBB273;
                }
            }
        }
    }

    .arrow {
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        width: 35px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
        cursor: pointer;
        z-index: 2;

        &.left-arrow {
            left: 18%;
        }

        &.right-arrow {
            right: 18%;
        }
    }

}

@media (max-width: 798px) {
    .services-section {

        .features-content {
            h2 {
                font-size: 1.5rem;

                &::before {
                    width: calc(1ch + 1px);
                }
            }

            .slider {
                padding: 0 20px;
            }

            .slide {
                max-width: 250px;
            }

            .slide-description {
                font-size: 0.9rem;
            }
        }

        .arrow {
            font-size: 1.5rem;
            &.left-arrow {
                left: 10%;
            }

            &.right-arrow {
                right: 10%;
            }
        }
    }
}

@media (max-width: 998px) and (min-width: 799px) {
    .services-section {

        .features-content {
            h2 {
                font-size: 1.7rem;

                &::before {
                    width: calc(1.3ch + 1px);
                }
            }

            .slider {
                padding: 0 30px;
            }

            .slide {
                max-width: 280px;
            }

            .slide-description {
                font-size: 1rem;
            }
        }

        .arrow {
            font-size: 1.8rem;

            &.left-arrow {
                left: 15%;
            }

            &.right-arrow {
                right: 15%;
            }
        }
    }
}
</style>
