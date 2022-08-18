<template>
  <h1>Editar Usuario</h1>
  <form>
      <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="name" placeholder="Joe Ring">
      </div>
      <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input type="email" class="form-control" id="email" placeholder="joe.ring@gmail.com"> 
      </div>
      <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="password" placeholder="*************">
      </div>
      <div class="mb-3">
          <label for="birthday" class="form-label">Cumpleaños</label>
          <input type="date" class="form-control" id="birthday">
      </div>
      <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="active">
          <label class="form-check-label" for="active">Activo</label>
      </div>
      <button type="submit" class="btn btn-success">Editar</button>
  </form>
</template>

<script>
export default {

}
</script>

<style>

</style>
