<template>
  <div class="hello">
    <div class="page-login">
      <!--v-model="" @keydown-enter=""-->
      <div class="login-block">
       <!-- <ui-textbox
          floating-label
          type="login"
          placeholder="Введите логин"
          label="Логин" >
        </ui-textbox>-->
        <ui-textbox
          class="password"
          floating-label
          placeholder="Введите пароль"
          type="password"
          v-model="inputPassword"
          @keydown-enter="login"
          label="Пароль" >
        </ui-textbox>
        <ui-button buttonType="button" type="primary" color="primary" @click="login" @keydown-enter="login">
          Войти
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { actions } from '../store'
  import { moments } from '../utils'
  import _ from 'lodash'

export default {
  name: 'hello',
  data () {
    return {
      inputPassword: '',
    }
  },

  mounted(){

  },

  methods:{
    login() {
      // Должны быть указаны пароль, магазин и конфиг
      if (!this.inputPassword) {
        return this.$store.dispatch(actions.addAlertWarning, 'Необходимо указать пароль');
      }
      // Просим хранилище добавить новый документ
      this.$store.dispatch(actions.authLogin, this.inputPassword)
        .then((user) => {
          // Перейдем на основную страницу приложения
          this.$router.push({name: 'pageOrders'});
          this.$store.dispatch(actions.addAlertSuccess, 'Успешный вход');
        })
        .catch((error) => {
          if (error && error.status === 401) {
            this.$store.dispatch(actions.addAlertWarning, 'Ошибка логина');
          } else {
            console.warn(error);
            this.$store.dispatch(actions.addAlertWarning, 'Ошибка логина: ' + (error && error.message || error));
          }
        });
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
  .page-login{
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-block{
      .ui-button--type-primary.ui-button--color-primary{
        background-color: #35495E ;
      }
    }
  }
</style>
