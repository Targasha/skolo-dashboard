<template>
  <v-card>
    <v-snackbar
      v-model="alert.type"
      :bottom="y === 'bottom'"
      :color="alert.type"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
        <span v-for="(error, key) in validationErrors" :key="key" style="display:block">{{error}}</span>


      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="alert.type = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    props:[
        'alert'
    ],
    data () {
      return {
        color: '', //['success', 'info', 'error', 'warning', 'cyan darken-2' ...]
        mode: 'multi-line',
        snackbar: false,
        text: '',
        timeout: 3000,
        x: 'right',
        y: 'top',
        errors: '',
      }
    },
    methods: {
        transform (){
            if(Array.isArray(this.alert.message)){
                this.errors = this.alert.message;
            }else{
                this.errors.push(this.alert.message)
            }
        },

    },
    computed: {
        validationErrors(){
            if(typeof this.alert.message !== 'string'){
                console.log('not string');
                console.log(this.alert.message);
                let errors = Object.values(this.alert.message);
                console.log(errors);
                // console.log(errors.flat());
                return errors.flat();
            }

            return [this.alert.message];
        }
    },
    created () {
        // this.validationErrors();
    }
  }
  </script>
