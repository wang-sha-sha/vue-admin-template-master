<template>
  <div>
    <zia @test="getData(arguments)"></zia>
    <zib :bText="bText"></zib>
  </div>

</template>

<script>
import zia from './ziA'
import zib from './ziB'

export default {
  components: {
    zia,
    zib
  },
  data() {
    return {
      bText: {}
    }
  },
  methods: {
    getData(a) {
      console.log(a, 'list里收到数据了a')
      // this.bText = a[1].parent.label
      this.bText = a[1]
      console.log('bText', this.bText)
      // console.log(b, ,this.bText'list里收到数据了b')
    }
  }
}
</script>
