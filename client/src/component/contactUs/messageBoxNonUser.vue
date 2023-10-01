<template>
    <div class="message-box">
        <label for="name">Name:</label>
        <input
            type="text"
            required
            class="input-field"
            placeholder="Your Name"
        />
        <label for="name">Email:</label>
        <input
            type="email"
            required
            class="input-field"
            placeholder="Your Email"
        />
        <textarea
            required
            class="textarea"
            name="message"
            id="message"
            cols="30"
            rows="20"
            placeholder="Write your message..."
        ></textarea>
        <button>Send</button>
    </div>
</template>

<style lang="scss" scoped>
.message-box {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 17px;
    line-height: 23px;
    color: rgba(136, 135, 143, 1);
    width: 750px;
    height: 500px;
    margin-bottom: 100px;
}

button {
  padding: 10px 20px;
  background-color:  rgba(231, 163, 86, 1);
  border-radius: 10px;
  color:rgba(255, 255, 255, 1);
  border: none;
  cursor: pointer;
  width: 217px;
  height: 59px;
  font-weight: bold;
  margin-top: 30px;
}

button:hover {
  background-color: rgb(155, 90, 16);
}

.textarea{
    width: 90%;
    height: 70%;
    border-radius: 10px;
    font-size: inherit;
    outline-color: rgba(231, 163, 86, 1);
    padding: 10px;
    min-height: 100px;
    resize: vertical;
    max-height: 290px;
    min-height: 200px;
}

@media (max-width: 768px) {
  .message-box {
    font-size: 13px;
    line-height: 17px;
  }
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-field {
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: inherit;
  outline-color: rgba(231, 163, 86, 1);
  border: 1px solid rgb(118, 113, 113);
}
</style>
