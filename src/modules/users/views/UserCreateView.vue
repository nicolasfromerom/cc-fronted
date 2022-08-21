<template>
    <h1>Crear Usuario</h1>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" placeholder="Joe Ring" v-model="user.name">
            <span v-if="errorMessage.name" class="error-text">{{errorMessage.name[0]}}</span>
            <span v-if="v$.user.name.$error" class="error-text"> {{ v$.user.name.$errors[0].$message }} </span>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Correo Electronico</label>
            <input type="email" class="form-control" id="email" placeholder="joe.ring@gmail.com"  v-model="user.email"> 
            <span v-if="errorMessage.email" class="error-text">{{errorMessage.email[0]}}</span>
            <span v-if="v$.user.email.$error" class="error-text"> {{ v$.user.email.$errors[0].$message }} </span>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" placeholder="*************" v-model="user.password">
            <span v-if="errorMessage.password" class="error-text">{{errorMessage.password[0]}}</span>
            <span v-if="v$.user.password.$error" class="error-text"> {{ v$.user.password.$errors[0].$message }} </span>
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
        <button type="submit" class="btn btn-success">Guardar</button>
    </form>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers} from '@vuelidate/validators'

export default {
    name: 'UserCreateView',
    data() {
        return {
            v$: useVuelidate(),
            user: { 
                name: undefined,
                email: undefined,
                password: undefined,
                birthday: undefined,
                active: false,
            },
            errorMessage: {}
        }
    },
    methods: {
        ...mapActions(
            'user', ['createUser']
        ),
        onSubmit() {
            const { name, email, password, birthday, active } = this.user;
            console.log( { name, email, password, birthday, active } )
            this.v$.$validate()
            if (!this.v$.$error) {
                console.log('Form successfully submitted.')
                this.storeUser(this.user)
            }
        },
        storeUser({ name, email, password, birthday, active }) {
            this.createUser({
                name: name,
                email: email,
                password: password,
                birthday: birthday,
                active: active,
            })
        }
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
                password: { 
                    required: helpers.withMessage('La contraseña es obligatoria', required),
                    minLengthValue: helpers.withMessage('La contraseña debe tener al menos 6 caracteres', minLength(6)),
                },
                birthday: { 
                    required: helpers.withMessage('El cumpleaños es obligatorio', required)
                },
            },
        }
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
                'Buen trabajo!',
                'Usuario creado correctamente!',
                'success'
                )
                this.$router.push({ name: "user-list" });
            }
        },
        hasErrors() {
            const errores = this.getErrors()
            this.errorMessage = errores
            console.log(this.errorMessage)
        }
    }
    
}
</script>

<style lang="scss">
.error-text{
    color: red
}

</style>