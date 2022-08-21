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
                <th>Activo</th>
                <th>Creado</th>
                <th>Editado</th>
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
                <td> {{ isActived(user.active) }} </td>
                <td> {{ user.created_at }} </td>
                <td> {{ user.updated_at }} </td>
                <td>
                    <router-link :to="{ name: 'user-edit', params: {id : user.id} }" class="btn btn-warning">Editar</router-link>
                </td>
                <td>
                    <button class="btn btn-danger" @click="modalDeleteUser(user.id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
        <v-pagination v-if="paginateData"
            v-model="current_page"
            :pages="paginateData.last_page"
            :range-size="1"
            active-color="#eeff33"
            @update:modelValue="loadUserList"
        />
</template>

<script>

import Swal from 'sweetalert2';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import VPagination from "@hennge/vue3-pagination";

import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
    name: 'UserListView',
    data() {
        return {
            current_page: 1,
            last_page: 1
        }
    },  
    components: {
        VPagination
    },
    methods: {
        ...mapActions(
            'user', ['loadUserList','deleteUser']
        ),
        modalDeleteUser(id) {
            Swal.fire({
            title: '¿Estas seguro?',
            text: "Usted no podra revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminelo!',
            cancelButtonText: 'Cancelar',
            }).then((result) => {
            if (result.isConfirmed) {
                this.deleteUser(id)
                this.loadUserList(this.current_page)
                Swal.fire(
                'Eliminado!',
                'Usuario ha sido eliminado.',
                'success'
                )
            }
            })
        },
        isActived(valor){
            return valor == 1 ? 'Si':'No'
        }
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