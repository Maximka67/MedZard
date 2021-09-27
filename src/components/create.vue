<template>
  <div>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="form-group mt-5">
          <div class="mx-auto" style="width: 400px;">
            <div class="row">
              <div class="col-4">Table:</div>
                <select class="col-auto" @change="onChange($event)" v-model="table_name">
                    <option v-for="item in tables_name" :key="item">{{item}}</option>
                </select>
            </div>
          <br>
          <div v-if="this.table_name != ''" style="background-color: rgba(40, 191, 103, 0.4)">
          <h2  style="text-align:center">
            Create new {{table_name}}
          </h2>
          <div v-for="item in this.column_name" :key="item.id">
            <label for="input-field">{{item}}</label>
            <input id="input-field" class="form-control" type="text" value="" v-model="data[item]">
          </div>
          <div v-for="item in this.column_name_bool" :key="item.id">
            <label for="input-field">{{item}} (true or false)</label>
            <input id="input-field" class="form-control" type="text" value="" v-model="data[item]">
          </div>
          <br>
          <button class="btn btn-primary mb-2" v-if="this.table_name != ''" @click="sendData()" >Отправить</button>
          </div>
          </div>
        </div>
      </div>
    </div>
</div>


</template>


<script>
import axios from 'axios'
export default {
  name: 'create',
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
    onChange() {
        this.column_name = [];
        this.column_name_bool = [];
          axios({method: 'GET',
          url: "/api/"+this.table_name+"/", auth: {
                username: "tester",
                password: "test123"
              }
          })
      .then((res) => {
        this.contents = res.data;
        for (var item in res.data[0]) {
          if ((typeof res.data[0][item] != 'object' || res.data[0][item] == null) && item != 'id') {
            if (typeof res.data[0][item] == 'boolean') {
              console.log('bool')
              if (item == 'send') { 
              item = 'isSend'
              }
              this.column_name_bool.push(item);
            }
            else
            this.column_name.push(item);
          }
        }
      });
    },
    sendData() {
      console.log(this.data)
      axios({
          method: 'POST',
          url: "/api/"+this.table_name+"/create", 
          auth: {
                username: "tester",
                password: "test123"
              },
          data: this.data
          })
      .then(() => {
        this.data = {};
        alert('Данные добавлены');
      });
    }
  }
}
</script>