<template>
    <h1>Edit User</h1>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" placeholder="Joe Ring" v-model="user.name">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="joe.ring@gmail.com" v-model="user.email"> 
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" placeholder="*************" v-model="user.password">
        </div>
        <div class="mb-3">
            <label for="birthday" class="form-label">Cumpleaños</label>
            <input type="date" class="form-control" id="birthday" v-model="user.birthday">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="active" v-model="active">
            <label class="form-check-label" for="active">Activo</label>
        </div>
        <button type="submit" class="btn btn-success">Editar</button>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            user: {
                name: null,
                email: null,
                birthday: null,
                active: null,
                password: null
            },
            active: false
        }
    },
    name: 'UserEditView',
    props: {
        id: {
            required: true
        }
    },
    methods: {
        ...mapActions(
            'user',['loadUserById','editUser']
        ),
        showUser() {
            const { name, email, birthday, active } = this.getUser()
            this.user.name = name
            this.user.email = email
            this.user.birthday = birthday
            this.user.active = active
            active == 1 ? this.active = true : this.active = false
        },
        onSubmit() {
            const { name, email, password, birthday, active } = this.user;
            this.editUser({
                id: this.id,
                name: name,
                email: email,
                password: password,
                birthday: birthday,
                active: active,
            });
        },
    },
    computed: {
        ...mapGetters(
            'user',['getUser','getIsUpdated']
        ),
        isUpdatedUser() {
            return this.getIsUpdated()
        },
    },
    watch: {
        isUpdatedUser() {
            if(this.getIsUpdated() == true){
                Swal.fire(
                'Good job!',
                'User Updated!',
                'success'
                )
                this.$router.push({ name: "user-list" });
            }
        },
    },
    created() {
        this.loadUserById(this.id)
            .then(()=>{
                this.showUser()
            })
    }
}
</script>

<style>

</style>
