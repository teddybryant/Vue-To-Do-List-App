<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="400px">
      <template v-slot:activator="{ on, attrs }">
        <div v-if="dialogType==='Add'">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            <v-icon small>mdi-plus-circle</v-icon> {{dialogType}}
          </v-btn>
        </div>
        <div v-else>
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            <v-icon small>mdi-pencil-box-outline</v-icon> {{dialogType}}
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title class="primary" darkalign-center primary-title style='color: white;'>
          <div v-if="dialogType ==='Add'"><span class="text-h4"><v-icon large color="white">mdi-plus-circle</v-icon> Add Task</span></div>
          <div v-else><span class="text-h4"><v-icon large color="white">mdi-pencil-box-outline</v-icon>Edit Task</span></div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div v-if="dialogType==='Add'"><v-text-field label="Title" v-model="newTask.title" :rules="titleRules" outlined></v-text-field></div>
              </v-col>

              <v-col cols="12">
                <v-text-field label="Description" v-model="newTask.description" :rules="[v => !!v || 'Description is required']" outlined></v-text-field> <!--trying to put past description in textbox-->
              </v-col>

              <v-col cols="12">
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="newTask.date" transition="scale-transition" offset-y min-width="auto">

                      <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="newTask.date" label="Deadline" append-icon="mdi-calendar" v-bind="attrs" v-on="on" outlined></v-text-field>
                      </template>
                      <v-date-picker v-model="newTask.date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false" > Cancel </v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(newTask.date)">OK </v-btn>
                      </v-date-picker>

                  </v-menu>
              </v-col>

              <v-col cols="12">
                  <p>Priority</p>
                  <v-radio-group row v-model="newTask.row" newTask.row>
                      <v-radio label="Low" value="low" ></v-radio>
                      <v-radio label="Med" value="med" ></v-radio>
                      <v-radio label="High" value="high" ></v-radio>
                  </v-radio-group>
              </v-col>

          </v-row>
      </v-container>
  </v-card-text>
  <v-card-actions class="text-right">
      <v-spacer></v-spacer>
      <div v-if="dialogType==='Add'">
        <v-btn color="primary" teclass="mr-4" @click="addNewTask()"> <v-icon small>mdi-plus-circle</v-icon> Add</v-btn>
      </div>
      <div v-else>
        <v-btn color="primary" teclass="mr-4" @click="editTask()">Edit</v-btn>
      </div>
      <v-btn color="error" class="mr-4" @click="resetTask()"> <v-icon small>mdi-circle-off-outline</v-icon> Cancel</v-btn>
      
  </v-card-actions>
</v-card>
</v-dialog>
</v-row>

</template>

<script>
  export default {
    name: 'UpdateTasks',
    props: {
      dialogType: String,
      listOfTasks: Array,
    },

    data(){
      return {
        valid: true,
        dialog: false,
        modal: false,
        menu: false,
        menu2: false,
        index: 0,
        tasks: this.listOfTasks,

        titleRules:[
            v => !!v || 'Title is required',
            v => this.listOfTasks.find(a=> a.title === v.title) || 'The title must be unique'
          ],

        newTask: {
          title: '',
          description: '',
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          row: null,
        },
      }
    },

    methods: {
      addNewTask: function() {
        if(!this.newTask.title || !this.newTask.description || this.tasks.find(a => a.title === this.newTask.title)){
          /**/
        }
        else{
            this.$emit('create-new-task', this.newTask);
            this.resetTask();
          }
      },
      editTask: function() {
          this.$emit('edit-the-task', this.newTask);
          this.resetTask();
        },

      resetTask: function() {
        this.dialog = false;
        this.newTask = {
          title: "",
          description: "",
          date: null,
          row: null,
        }
      }
    },
}
</script>