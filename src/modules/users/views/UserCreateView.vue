<template>
    <h1>Create User</h1>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" placeholder="Joe Ring" v-model="user.name">
            <span v-if="errorMessage" class="badge text-bg-danger">{{errorMessage.name}}</span>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="joe.ring@gmail.com" v-model="user.email"> 
            <span v-if="errorMessage" class="badge text-bg-danger">{{errorMessage.email}}</span>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" placeholder="*************" v-model="user.password">
            <span v-if="errorMessage" class="badge text-bg-danger">{{errorMessage.password}}</span>
        </div>
        <div class="mb-3">
            <label for="birthday" class="form-label">Cumpleaños</label>
            <input type="date" class="form-control" id="birthday" v-model="user.birthday">
            <span v-if="errorMessage" class="badge text-bg-danger">{{errorMessage.birthday}}</span>
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="active" v-model="user.active">
            <label class="form-check-label" for="active">Activo</label>
            <span v-if="errorMessage" class="badge text-bg-danger">{{errorMessage.active}}</span>
        </div>
        <button type="submit" class="btn btn-success">Guardar</button>
    </form>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'UserCreateView',
    data() {
        return {
            user: { },
            errorMessage: null
        }
    },
    methods: {
        ...mapActions(
            'user', ['createUser']
        ),
        onSubmit() {
            const { name, email, password, birthday, active } = this.user;
            this.createUser({
                name: name,
                email: email,
                password: password,
                birthday: birthday,
                active: active,
            });
        },
    },
    computed: {
        ...mapGetters (
            'user',['getIsCreated','getErrors']
        ),
        isCreatedUser() {
            return this.getIsCreated()
        },
        hasErrors() {
            return this.getErrors()
        }
    },
    watch: {
        isCreatedUser() {
            if(this.getIsCreated() == true){
                Swal.fire(
                'Good job!',
                'User Create!',
                'success'
                )
                this.$router.push({ name: "user-list" });
            }
        },
        hasErrors() {
            const errores = this.getErrors()
            this.errorMessage = errores
        }
    
    }
    
}
</script>

<style>

</style>