<template>
  <div>
    <!--  aaa-->
    父的text{{ text }}
  </div>
</template>

<script>
export default {
  name: 'ZiB',
  data() {
    return {
      text: ''
    }
  },
  props: ['bText'],
  watch: {
    bText(val) {
      this.text = this.bText.parent.label
    }
  }
}
</script>

<style scoped>

</style>
