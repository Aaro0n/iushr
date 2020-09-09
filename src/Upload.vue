<template>
  <div id="upload" @dragover.prevent @dragenter.prevent @dragleave.prevent v-on:drop="drop">
    拖到此处
  </div>
</template>

<script>

import axios from "axios";

export default {

  methods: {
    drop: function (event) {
      event.preventDefault();
      let file = event.dataTransfer.files[0]
      console.log("drop" + file.type)
      let formData = new FormData();
      formData.append("file", file)
      axios.post(this.COMMON.server + 'upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'token': localStorage.getItem('token')
            },
            onUploadProgress: progressEvent => {
              let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
              console.log(complete)
            }
          }
      ).then(response => {
            console.log(response.data.data)
          }
      )
    }
  },
}

</script>

<style scoped>

body {
  height: 100%;
}

#upload {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>