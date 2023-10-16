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
    display: flex;
    justify-content: space-between;

    .text-content {
      flex: 1;
      padding-right: 2rem;
    }

    .image-content {
      flex-basis: 40%;
      max-width: 40%;
      padding: 6rem 2rem;

      img {
        max-width: 100%;
        height: 100%;
        top: 30%;
      }
    }
  }

  h2 {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    font-weight: bold;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0.5%;
      height: 8px;
      width: calc(1.5ch + 1px);
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
      align-items: center;
      max-width: calc(50% - 10px);
      padding-right: 25%;

      img {
        max-width: 50px;
        height: auto;
        margin-right: 1rem;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

  }

}

@media (max-width: 992px) {
  .features-section {
    padding: 2rem 2rem;

    .features-content {

      .text-content {
        padding-right: 1rem;
      }

      .image-content {
        flex-basis: 20%;
        max-width: 20%;

        img {
          top: 15%;
        }
      }
    }

    h2 {
      font-size: 3rem;
    }

    p {
      font-size: 0.95rem;
    }

    .icons-grid {

      .icon-item {
        flex: 0 0 49%;
        max-width: 49%;

        .icon-text {
          h3 {
            font-size: 1.1rem;
          }

          p {
            font-size: 0.95rem;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 2rem 1rem;
    .features-content {
      flex-direction: column;

      .text-content {
        padding-right: 0;
      }

      .image-content {
        flex-basis: 50%;
        max-width: 100%;
        padding: 2rem 0;

        img {
          top: 0;
          height: 80%;
        }
      }
    }

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 0.8rem;
    }

    .icons-grid {
      justify-content: space-between;

      .icon-item {
        flex: 0 0 48%;
        max-width: 48%;
        padding-right: 0;
        padding-left: 2%;

        .icon-text {
          h3 {
            font-size: 0.8rem;
          }

          p {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
</style>
