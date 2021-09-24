<template>
  <div id="app">
      <header style="background-color: rgba(40, 191, 103, 0.7); text-align: center">
    <h1>MedZard</h1>
  </header>
    <create></create>

  </div>
</template>

<script>
import create from './components/create.vue'
export default {
  name: 'App',
  components: {
    create
  },
  data() {
    return {
      contents: '',
      column_name: [],
      column_name_bool: [],
      table_name: '',
      data: {},
      test: true,
      tables_name: [
            'activity',
            'disease',
            'drug',
            'medical-action',
            'organ',
            'question',
            'symptom',
            'specialization'
          ]
    };
    },
  methods: {
    }
  }

</script>