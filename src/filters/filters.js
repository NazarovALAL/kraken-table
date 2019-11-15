import Vue from 'vue'

Vue.filter('splitPair', function (value) {
  return value ? value.match(/.{1,3}/g).join('/') : ''
})
