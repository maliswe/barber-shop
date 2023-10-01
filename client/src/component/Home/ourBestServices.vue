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
        this.activeSlide = this.services.length // loop back to the last slide
      }
    },

    nextSlide() {
      if (this.activeSlide < this.services.length) {
        this.activeSlide++
      } else {
        this.activeSlide = 1 // loop back to the first slide
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
            position: relative; // This ensures the pseudo-element is positioned relative to h2
            top: 5%;
            margin-bottom: 3rem;

            &::before {
                content: "";
                position: absolute;
                top: 100%; // Center it vertically
                transform: translateY(100%); // This moves the pseudo-element downward by its own height
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
            padding: 0 40px; // This adds space on the sides equal to the width of the arrows. Adjust the value as needed.
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
                    bottom: 10px; // Adjust this value to position the title at your desired location from the bottom
                    left: 50%;
                    transform: translateX(-50%); // This will center the title horizontally
                    color: white;
                    padding: 5px 10px; // Add some padding to the title
                    border-radius: 5px; // Rounded corners
                    font-weight: bold;
                    transition: opacity 0.3s ease; // Optional: smooth fade-out effect
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
                    background-color: rgba(0, 0, 0, 0.7); // Semi-transparent black
                    color: white; // Text color
                    font-size: 1rem;
                    transition: opacity 0.3s ease; // Smooth fade-in effect
                    opacity: 1; // Already visible as we're only rendering it for active slides.
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-top: 3px; // To center the icon and text vertically and horizontally

                    .description-icon {
                        width: 40px; // Adjust this as needed
                        height: 40px; // Adjust this as needed
                        margin-bottom: 10px; // Space between the icon and the description text
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
                border-radius: 50%; // This makes the shape a circle
                display: inline-block;
                transition: background-color 0.3s ease;
                box-sizing: border-box; // This ensures the border doesn't increase the size of the dot

                &.active {
                    background-color: #202020;
                    border: 2px solid #EBB273; // Adding a border to the active dot
                }
            }
        }
    }

    .arrow {
        background-color: rgba(255, 255, 255, 0.5); // This gives a white background with 50% opacity
        border-radius: 50%; // This makes the background circular
        width: 35px; // Adjust these values
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
        cursor: pointer;
        z-index: 2; // ensure arrows are above the slides

        &.left-arrow {
            left: 18%;
        }

        &.right-arrow {
            right: 18%;
        }
    }

}

//... Your existing styles

@media (max-width: 798px) {
    .services-section {

        .features-content {
            h2 {
                font-size: 1.5rem; // Reduced font size for h2

                &::before {
                    width: calc(1ch + 1px); // Adjust pseudo-element width
                }
            }

            .slider {
                padding: 0 20px; // Reduced padding
            }

            .slide {
                max-width: 250px; // Adjust the maximum width
            }

            .slide-description {
                font-size: 0.9rem; // Reduce font size of description
            }
        }

        .arrow {
            font-size: 1.5rem; // Reduce arrow size

            &.left-arrow {
                left: 10%; // Adjust position
            }

            &.right-arrow {
                right: 10%; // Adjust position
            }
        }
    }
}

@media (max-width: 998px) and (min-width: 799px) {
    .services-section {

        .features-content {
            h2 {
                font-size: 1.7rem; // Adjusted font size for h2

                &::before {
                    width: calc(1.3ch + 1px); // Adjust pseudo-element width
                }
            }

            .slider {
                padding: 0 30px; // Adjusted padding
            }

            .slide {
                max-width: 280px; // Adjust the maximum width
            }

            .slide-description {
                font-size: 1rem; // Adjust font size of description
            }
        }

        .arrow {
            font-size: 1.8rem; // Adjust arrow size

            &.left-arrow {
                left: 15%; // Adjust position
            }

            &.right-arrow {
                right: 15%; // Adjust position
            }
        }
    }
}
</style>
