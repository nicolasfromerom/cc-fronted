<template>
    <div>
        <router-link :to="{ name: 'user-create'}" class="btn btn-success mb-5">Nuevo</router-link>
    </div>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Cumpleaños</th>
                <th>Active</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in listUsers"
                :key="user.id"
                :user="user">
                <td> {{ user.id }} </td>
                <td> {{ user.name }} </td>
                <td> {{ user.email }} </td>
                <td> {{ user.birthday }} </td>
                <td> {{ user.active == 1 ? 'TRUE':'FALSE' }} </td>
                <td>
                    <router-link :to="{ name: 'user-edit', params: {id : 1} }" class="btn btn-warning">Editar</router-link>
                </td>
                <td>
                    <button class="btn btn-danger">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
        <v-pagination
            v-model="current_page"
            :pages="paginateData.last_page"
            :range-size="1"
            active-color="#eeff33"
            @update:modelValue="loadUserList"
        />
</template>

<script>

import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
    name: 'UserListView',
    data() {
        return {
            current_page: 1
        }
    },  
    components: {
        VPagination
    },
    methods: {
        ...mapActions(
            'user', ['loadUserList']
        ),
    },
    computed: {
        ...mapGetters(
            'user', ['getUsersList','getUsersPaginationData'],
        ),
        listUsers() {
            return this.getUsersList()
        },
        paginateData(){
            return this.getUsersPaginationData()
        },        
    },
    created(){
        this.loadUserList(this.current_page)
    }

}
</script>

<style>

</style>