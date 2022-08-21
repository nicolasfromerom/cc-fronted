<template>
    <h1>Edit User</h1>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" placeholder="Joe Ring" v-model="user.name">
            <span v-if="errorMessage.name" class="error-text">{{errorMessage.name[0]}}</span>
            <span v-if="v$.user.name.$error" class="error-text"> {{ v$.user.name.$errors[0].$message }} </span>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="joe.ring@gmail.com" v-model="user.email">
            <span v-if="errorMessage.email" class="error-text">{{errorMessage.email[0]}}</span>
            <span v-if="v$.user.email.$error" class="error-text"> {{ v$.user.email.$errors[0].$message }} </span>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" placeholder="*************" v-model="user.password">
            <span v-if="errorMessage.password" class="error-text">{{errorMessage.password[0]}}</span>
        </div>
        <div class="mb-3">
            <label for="birthday" class="form-label">Cumpleaños</label>
            <input type="date" class="form-control" id="birthday" v-model="user.birthday">
            <span v-if="errorMessage.birthday" class="error-text">{{errorMessage.birthday[0]}}</span>
            <span v-if="v$.user.birthday.$error" class="error-text"> {{ v$.user.birthday.$errors[0].$message }} </span>
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="active" v-model="user.active">
            <label class="form-check-label" for="active">Activo</label>
            <span v-if="errorMessage.active" class="error-text">{{errorMessage.active[0]}}</span>
        </div>
        <button type="submit" class="btn btn-success">Editar</button>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers} from '@vuelidate/validators'

export default {
    data() {
        return {
            v$: useVuelidate(),
            user: { 
                name: undefined,
                email: undefined,
                birthday: undefined,
                password: undefined,
                active: false,
            },
            errorMessage: {}
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
            active == 1 ? this.user.active = true : this.user.active = false
        },
        onSubmit() {
            const { name, email, password, birthday, active } = this.user;
            console.log( { name, email, password, birthday, active } );
            this.v$.$validate()
            if (!this.v$.$error) {
                console.log('Form successfully submitted.')
                this.editUser({
                    id: this.id,
                    name: name,
                    email: email,
                    password: password,
                    birthday: birthday,
                    active: active,
                });
            }
            
        },
    },
    validations () {
        return {
            user: { 
                name: { 
                    required : helpers.withMessage('El campo nombre es obligatorio', required) 
                },
                email: { 
                    required: helpers.withMessage('El campo correo electronico es obligatorio', required), 
                    email: helpers.withMessage('Correo electronico incorrecto', email),
                },
                birthday: { 
                    required: helpers.withMessage('El cumpleaños es obligatorio', required)
                },
            },
        }
    },
    computed: {
        ...mapGetters(
            'user',['getUser','getIsUpdated','getErrors']
        ),
        isUpdatedUser() {
            return this.getIsUpdated()
        },
        hasErrors() {
            return this.getErrors()
        }
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
        hasErrors() {
            const errores = this.getErrors()
            this.errorMessage = errores
        }
    },
    created() {
        this.loadUserById(this.id)
            .then(()=>{
                this.showUser()
            })
    }
}
</script>

<style lang="scss">
.error-text{
    color: red
}
</style>
