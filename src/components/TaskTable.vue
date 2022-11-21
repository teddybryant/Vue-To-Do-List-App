<template>
    <v-app style='margin:30px'>
        <v-card>
        <!--panel header-->
            <v-card-title
                class='headline primary'
                primary-title style='color: white;'>
                    <v-col><v-toolbar-title class="text-center"><v-app-bar-nav-icon color="white"/>FRAMEWORK</v-toolbar-title></v-col>
                    <th style='margin:20px'><UpdateTasks dialogType="Add" :list-of-tasks="listOfTasks" @create-new-task="addTask($event)"/></th>
            </v-card-title>
        <!--panel body-->
            <v-simple-table style='margin: 20px'>
                <template v-slot:default>
                <!--table header-->
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Is complete</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in listOfTasks" v-bind:key="index" :task="item">
                            <td>{{item.title}}</td>
                            <td>{{item.description}}</td>
                            <td>{{item.date | formatDate}}</td>
                            <td>{{item.row}}</td>
                            <td>
                                <v-checkbox v-model="item.complete" color="primary" @click="isComplete(index)"></v-checkbox>
                            </td>
                            <td>
                                <div v-if="!item.checked"><v-btn color="primary" class="mr-4"><UpdateTasks dialogType="UPDATE" :list-of-tasks="listOfTasks" @edit-the-task="editTask($event, index)"/></v-btn></div>
                                <div><v-btn color="error" class="mr-4" @click="deleteTask(index)"><v-icon small>mdi-close-circle-outline</v-icon> DELETE </v-btn></div>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
        </v-app>
</template>

<script>
import UpdateTasks from "./UpdateTasks.vue"

    export default {
        name: 'TaskTable',
        data: ()=> ({
            listOfTasks:[],
        }),

        components: {
            UpdateTasks
        },

        methods: {
            addTask: function(theNewTask) {
                this.listOfTasks.push(theNewTask);
                this.$toasted.success('Task added successfully'); 
            },
            editTask: function(edit, index) {
                if(edit.description !== null){
                    this.listOfTasks[index].description = edit.description;
                }
                if(edit.date !== null){
                    this.listOfTasks[index].date = edit.date;
                }
                if(edit.row !== null){
                    this.listOfTasks[index].row = edit.row;
                }
                this.$toasted.success('Task updated successfully');
            },
            deleteTask: function (index){
                this.listOfTasks.splice(index, 1)
                this.$toasted.success('Task deleted successfully');
            },
            isComplete: function(index) {
                if(this.listOfTasks[index].checked){
                    this.listOfTasks[index].checked = false;
                }
                else{
                    this.listOfTasks[index].checked = true;
                }
            }
        }
}
    
</script>