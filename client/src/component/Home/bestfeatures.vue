<template>
  <section class="features-section">
    <div class="features-content">
      <div class="text-content">
        <h2>Our Best Features</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut <br>
          labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo <br>
          viverra maecenas accumsan lacus vel facilisis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut <br>
          labore et dolore magna aliqua.
        </p>
        <div class="icons-grid">
          <div class="icon-item">
            <img src="../../assets/CalenderIcon.svg" alt="Icon 1">
            <div class="icon-text">
              <p>Easy way to appointment</p>
            </div>
          </div>
          <div class="icon-item">
            <img src="../../assets/sizIcon.svg" alt="Icon 2">
            <div class="icon-text">
              <p>Best Team</p>
            </div>
          </div>
          <div class="icon-item">
            <img src="../../assets/thumbs.svg" alt="Icon 3">
            <div class="icon-text">
              <p>+300 Happy Customer</p>
            </div>
          </div>
          <div class="icon-item">
            <img src="../../assets/disIcon.svg" alt="Icon 4">
            <div class="icon-text">
              <p>Good Discount</p>
            </div>
          </div>
        </div>

      </div>
      <div class="image-content">
        <img src="../../assets/feature.png" alt="Description of Image">
      </div>
    </div>
  </section>
</template>

<script>
export default {
}
</script>
<style lang="scss" scoped>
.features-section {
  padding: 2rem 10rem;
  text-align: left;

  .features-content {
    display: flex; // Enables the flexbox layout
    justify-content: space-between; // Keeps a distance between the text and image

    .text-content {
      flex: 1; // This ensures that the text takes the available space
      padding-right: 2rem; // Adding some padding to separate the text from the image
    }

    .image-content {
      flex-basis: 40%; // Takes up 40% of the available width
      max-width: 40%; // Ensures the image doesn't take more than 40% of the width
      padding: 6rem 2rem;

      img {
        max-width: 100%; // Ensures the image is responsive and fits within its container
        height: 100%;
        top: 30%;
      }
    }
  }

  h2 {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    font-weight: bold;
    position: relative; // Set position to relative so the pseudo-element is positioned relative to this h2

    &::before {
      content: ""; // This should be the first two letters of your h2
      position: absolute;
      bottom: -10px;
      left: 0.5%;
      height: 8px; // Adjust height as needed
      width: calc(1.5ch + 1px); // Adjust width as needed; the `ch` unit represents the width of the "0" character
      background-color: #EBB273;
    }
  }

  p {
    color: #88878F;
    line-height: 2;
    padding-top: 2%;
  }

  .icons-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 2rem;

    .icon-item {
      display: flex;
      align-items: center; // vertically align the icon and text
      max-width: calc(50% - 10px); // for two items side by side, considering a gap of 20px
      padding-right: 25%;

      img {
        max-width: 50px; // adjust as necessary
        height: auto;
        margin-right: 1rem; // space between the icon and the text
      }

      .icon-text {
        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1rem;
          color: black;
          font-weight: bold;
          white-space: nowrap; // prevent text from wrapping to the next line
          overflow: hidden; // optional: hides the overflowed text
          text-overflow: ellipsis; // optional: adds an ellipsis when text overflows
        }
      }
    }

  }

}

@media (max-width: 992px) {
  .features-section {
    padding: 2rem 2rem; // Slightly reduce the horizontal padding for this breakpoint

    .features-content {
      // We'll keep the flex-direction as row but adjust some paddings and sizes

      .text-content {
        padding-right: 1rem; // Slightly reduce the padding for better spacing
      }

      .image-content {
        flex-basis: 45%; // Adjust the width allocation
        max-width: 45%;

        img {
          top: 15%; // Adjust the top position slightly
        }
      }
    }

    h2 {
      font-size: 3rem; // Slightly reduce the font size
    }

    p {
      font-size: 0.95rem; // Slightly decrease font size
    }

    .icons-grid {
      // Adjustments to the icons grid if needed

      .icon-item {
        flex: 0 0 49%; // Adjust width slightly
        max-width: 49%;

        .icon-text {
          h3 {
            font-size: 1.1rem; // Adjust the font size a bit
          }

          p {
            font-size: 0.95rem; // Adjust the font size
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 2rem 1rem; // Reduce the horizontal padding for smaller screens

    .features-content {
      flex-direction: column; // Stack .text-content and .image-content vertically

      .text-content {
        padding-right: 0; // Reset the padding as we are now stacking them
      }

      .image-content {
        flex-basis: 100%; // Take full width
        max-width: 100%;
        padding: 2rem 0; // Adjust the padding for better spacing on mobile

        img {
          top: 0; // Reset the top position of the image
          height: auto; // Maintain aspect ratio
        }
      }
    }

    h2 {
      font-size: 2.5rem; // Decrease the font size for mobile
    }

    p {
      font-size: 0.9rem; // Slightly decrease font size for better readability on mobile
    }

    .icons-grid {
      justify-content: space-between; // Evenly space the icons

      .icon-item {
        flex: 0 0 48%; // Make icons take up roughly half the width with a little space in between
        max-width: 48%; // Set a max width of 48% to leave some space between
        padding-right: 0; // Reset the padding

        .icon-text {
          h3 {
            font-size: 1rem; // Decrease the font size a bit
          }

          p {
            font-size: 0.9rem; // Slightly decrease font size for better readability on mobile
          }
        }
      }
    }
  }
}
</style>
