<template>
  <div id="app">
    <header  v-if="authenticated">
      <div class="page-info">
        <img class="logo" src="../static/img/logo_restfront.png">
        <rf-breadcrumbs title="Доставка" :items="breadcrumbs"></rf-breadcrumbs>
      </div>
      <div class="period-compare">
        <date-picker-area></date-picker-area>
      </div>
      <div class="status" title="Соединение установленно">
        <span></span>
      </div>
      <div class="notification">
        <span
          :class="{ redFlag: notificationCounter > 0, whiteFlag: notificationCounter === 0}"
          class="notification-count">
          <span>+{{notificationCounter}}</span>
        </span>
        <ui-icon-button color="white" has-dropdown icon="message" ref="toolbarMenuButton" size="large"
                        type="secondary">
          <ui-menu contain-focus has-icons slot="dropdown" :options="menuOptionsNatification"
                   @close="$refs.toolbarMenuButton.closeDropdown()"></ui-menu>
        </ui-icon-button>
      </div>
      <div class="menu" v-if="authUser">
        <span class="user-name">{{authUser.name}}</span>
        <ui-icon-button color="white" has-dropdown icon="account_circle" ref="toolbarMenuButton" size="large"
                        type="secondary">
          <ui-menu contain-focus has-icons slot="dropdown" :options="menuOptions"
                   @select="onMenuItemClick" @close="$refs.toolbarMenuButton.closeDropdown()"></ui-menu>
        </ui-icon-button>
      </div>
      <div class="alerts-panel">
        <div class="alerts" v-if="alerts.length">
          <ui-alert v-for="alert in alerts" :type="alert.type" :key="alert.id" @dismiss="dismissAlert(alert)">{{ alert.message }}


          </ui-alert>
        </div>
      </div>
      <span class="version">{{version}}</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
  import { actions } from '../src/store'
  import { moments } from '../src/utils'
  import _ from 'lodash'

  const MENU_OPTION_REFRESH = {
    id: 'refresh',
    label: 'Обновить',
    icon: 'refresh'
  };
  const MENU_OPTION_LOGOUT = {
    id: 'logout',
    label: 'Выйти',
    icon: 'arrow_back'
  };

  export default {
    name: 'app',

    data(){
      return{
        menuOptionsNatification:[
          {
            id: 'logout',
            label: 'Неполадки с системой',
            icon: 'warning'
          },
          {
            id: 'logout',
            label: 'Товар не найден',
            icon: 'warning'
          },
          {
            id: 'logout',
            label: 'Информация пуста',
            icon: 'warning'
          },
          {
            id: 'logout',
            label: 'Апокалипсис сегодня',
            icon: 'warning'
          },
        ],
        breadcrumbs: [],
      };
    },

    computed:{
      notificationCounter(){
        return 5;
      },

      version() {
        return window.VERSION;
      },

      authUser(){
        return this.$store.getters.authUser;
      },

      authenticated(){
        return this.$store.getters.authenticated;
      },

      alerts() {
        return this.$store.getters.alerts;
      },

      receiveBreadcrumbs(breadcrumbs) {
        this.breadcrumbs = breadcrumbs || [];
      },

      menuOptions() {
        const options = [];

        // Если пользователь аутентифицирован
        /*if (this.$store.getters.authenticated) {
          options.push(MENU_OPTION_LOGOUT);
          options.push({type: 'divider'});
        }*/

        options.push(MENU_OPTION_REFRESH);
        options.push(MENU_OPTION_LOGOUT);
        return options;
      },
    },

    methods:{
      onMenuItemClick(menuItem) {
        switch (menuItem.id) {
          case MENU_OPTION_REFRESH.id:
            location.reload();
            break;

          case MENU_OPTION_LOGOUT.id:
            this.logout();
            break;
        }
      },

      dismissAlert(alert) {
        this.$store.dispatch(actions.dismissAlert, alert);
      },

      logout() {
        this.$store.dispatch(actions.authLogout);
        this.$router.push({name: 'Hello'});
      },
    }
  }
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
  display: flex;
  justify-content: flex-end;
  .menu{
    display: flex;
    flex: 0 0 10%;
    align-items: center;
    justify-content: center;
    .user-name{
      margin-right: 5px;
      font-size: 15px;
      font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
    }
  }

  .redFlag{
    background: red !important;
  }
  .whiteFlag{
    background: gray !important;
  }
  .logo{
    width: 120px;
    height: 40px;
    margin-right: 30px;
  }
  .page-info{
    display: flex;
    flex: 0 0 38%;
    justify-content: flex-start;
    align-items: center;
  }
  .status{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 10%;
    opacity: 1;
    &:hover{
      opacity: 1;
      cursor: pointer;
      transition: all 0.5s ease;
    }
    span{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #2ac60e;
    }
  }
  .period-compare{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 40%;
    opacity: 1;
  }
  .notification{
    flex: 0 0 2%;
    position: relative;
    .notification-count{
      position: absolute;
      height: 15px;
      width: 20px;
      right: 0;
      top:15%;
      z-index: 100;
      border-radius: 50%;
      background: gray;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        font-size: 10px;
      }
    }
  }
}
.warning.ui-menu-option__icon{
  color: #ff3308 !important;
}
h2 h1 h3{
  font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
  letter-spacing: 1px;
}
header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  //padding-top: 16px;
}

.alerts-panel {
  position: absolute;
  top: 15%;
  max-height: 100vh;
  width: 100vw;
  z-index: 100;

  display: flex;
  flex-direction: row;
  justify-content: center;
  pointer-events: none;
  .ui-alert--type-warning .ui-alert__icon{
    position: relative;
    top: 25%;
  }
}

.alerts {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  padding-top: 1rem;
  width: 50vw;
  pointer-events: auto;
  .ui-alert{
    background: white;
  }
}
.ui-alert--type-success .ui-alert__body{
  background-color: rgba(76, 175, 80, 0.42);
}
  .version{
    position: relative;
    right: 0;
  }
</style>
