<template>
  <div class="settings-order">
    <ui-modal class="modal-good-group" ref="modal" dismissOn="esc close-button" @open="visible = true"
              @close="visible = false">
      <template slot="header">
        <h2 v-if="visibleHeader">
          <ui-icon class="ui-modal__header-icon" icon="build" style="margin-right: 10px"></ui-icon>
          Изменение заказа № {{numberOrder}}
        </h2>
        <h2 v-if="!visibleHeader && !createUserAriaVisible && !phoneControllVisible">
          <ui-icon class="ui-modal__header-icon" icon="add_shopping_cart" style="margin-right: 10px"></ui-icon>
          Создание заказа: {{clientInfoHeader}}
        </h2>
        <h2 v-if="phoneControllVisible && !createUserAriaVisible">
          <ui-icon class="ui-modal__header-icon" icon="add_shopping_cart" style="margin-right: 10px"></ui-icon>
          Создание заказа
        </h2>
        <h2 v-if="createUserAriaVisible">
          <ui-icon class="ui-modal__header-icon" icon="add_shopping_cart" style="margin-right: 10px"></ui-icon>
          Создание клиента
        </h2>
      </template>

      <template>
        <div class="option">
          <div class="phone-controll" v-if="phoneControllVisible && !createUserAriaVisible">
            <h2>Проверка по номеру ({{phoneCount}})</h2>
            <!--<masked-input v-model="phoneNumberInfo" mask="\+\375 (11) 111-11-11" placeholder="Введите номер телефона" placeholder-char="-"/>-->

            <ui-select
              placeholder="Код телефона"
              icon="dialpad"
              class="configs"
              :default="codeRegion"
              v-model="codeRegionSelect"
              :options="codeRegion"
              :keys="{label: 'name', value: 'select'}">
            </ui-select>

            <ui-select
              disable-filter
              has-search
              ref="focusSearchPanel"
              placeholder="Введите номер телефона"
              search-placeholder="-- --- -- --"
              type="basic"
              icon="phone"
              :loading="selectLoading"
              :no-results="selectNoResults"
              :options="selectOptions"
              @select="selectPhoneNumber"
              @query-change="onQueryChange"
              v-model="queryNumber"
            ></ui-select>

          </div>
          <!--Настройки по созданию клиента-->
          <div class="option-block" v-if="createUserAriaVisible">

            <div class="phone-number">
              <i class="material-icons add" @click="plusNumbers(client.phone)">add</i><span class="add-text"
                                                                                            v-if="client.phoneNumbersClient.length">({{client.phoneNumbersClient.length}})</span>

              <ui-textbox
                floating-label
                :multiLine=false
                :max="phoneLengthInfo"
                icon="call"
                type="tel"
                label="Номер телефона"
                v-model="client.phone">
              </ui-textbox>
            </div>

            <ui-select
              class="configs"
              placeholder="Статус"
              label="Статус"
              ref="typeSend"
              icon="info"
              v-model="client.statusClientSelect"
              :options="client.statusClient"
              :keys="{label: 'name', value: 'value'}">
            </ui-select>

            <ui-textbox
              floating-label
              icon="person"
              label="Фамилия"
              v-model="client.surName">
            </ui-textbox>

            <ui-textbox
              floating-label
              icon="person"
              label="Имя"
              v-model="client.firstName">
            </ui-textbox>

            <ui-textbox
              floating-label
              icon="person"
              label="Отчество"
              v-model="client.middleName">
            </ui-textbox>

          </div>

          <div class="option-block" v-if="createUserAriaVisible">

            <div class="address-info">
              <ui-textbox
                floating-label
                icon="location_on"
                label="Улица"
                v-model="client.addressInfoStreet">
              </ui-textbox>
              <ui-textbox
                floating-label
                label="Дом"
                v-model="client.addressInfoBuilding">
              </ui-textbox>
              <ui-textbox
                floating-label
                label="Квартира"
                v-model="client.addressInfoFlat">
              </ui-textbox>
            </div>

            <ui-textbox
              floating-label
              icon="redeem"
              label="Скидка"
              v-model="client.discount">
            </ui-textbox>

            <ui-textbox
              floating-label
              icon="email"
              type="email"
              label="Электронная почта"
              v-model="client.eMail">
            </ui-textbox>

            <ui-textbox
              floating-label
              :multiLine=true
              icon="comment"
              label="Комментарии"
              v-model="client.comments">
            </ui-textbox>

          </div>


          <!--Настройки по редактированию и созданию заказа-->
          <div class="option-block" v-if="!phoneControllVisible && !createUserAriaVisible">
            <ui-textbox
              floating-label
              icon="vpn_key"
              label="Номер заказа"
              :disabled="true"
              v-model="numberOrder">
            </ui-textbox>

            <ui-textbox
              floating-label
              icon="person"
              label="Имя оператора"
              v-model="operatorName">
            </ui-textbox>

            <ui-select
              class="configs"
              placeholder="Точка доставки"
              label="Точка доставки"
              icon="edit_location"
              v-model="pointOfDelivery"
              :options="pointOfDeliverySend"
              :keys="{label: 'name', value: 'select'}">
            </ui-select>

            <ui-textbox
              floating-label
              icon="person"
              label="Фамилия"
              v-model="surName">
            </ui-textbox>

            <ui-textbox
              floating-label
              icon="person"
              label="Имя"
              v-model="firstName">
            </ui-textbox>

            <ui-textbox
              floating-label
              icon="person"
              label="Отчество"
              v-model="middleName">
            </ui-textbox>

            <ui-textbox
              floating-label
              icon="edit_location"
              label="Адресс"
              v-model="addressInfo">
            </ui-textbox>

          </div>

          <div class="option-block" v-if="!phoneControllVisible && !createUserAriaVisible">

            <ui-textbox
              floating-label
              icon="call"
              label="Номер телефона"
              v-model="phoneNumber">
            </ui-textbox>

            <ui-select floating-label
                       label="Тип доставки"
                       ref="typeSend"
                       icon="send"
                       class="configs"
                       placeholder="Статус"
                       v-model="type"
                       :options="typeDelivery"
                       :keys="{label: 'name', value: 'select'}">
            </ui-select>

            <ui-select floating-label
                       label="Статус"
                       icon="info"
                       class="configs"
                       placeholder="Статус"
                       v-model="statusOrder"
                       :options="typeStatus"
                       :keys="{label: 'name', value: 'select'}">
            </ui-select>

            <div class="date-block">

              <vue-timepicker v-model="yourTimeValueSend" :format=yourFormat></vue-timepicker>

              <ui-datepicker
                floating-label
                orientation="landscape"
                picker-type="modal"
                icon="events"
                v-model="timeSend"
                :lang="langMass"
                :min-date="new Date()"
              >Дата/время доставки
              </ui-datepicker>

            </div>

            <ui-textbox
              floating-label
              icon="info"
              label="Статус после доставки"
              v-model="statusAfterSend">
            </ui-textbox>

            <ui-textbox
              floating-label
              icon="supervisor_account"
              label="Имя курьера"
              v-model="curierName">
            </ui-textbox>

          </div>
        </div>
      </template>

      <template slot="footer">
        <div class="controll-panel-modal" v-if="visibleHeader && !phoneControllVisible && !createUserAriaVisible">
          <ui-button color="accent" icon="delete">Удалить заказ</ui-button>
        </div>
        <ui-button type="primary" color="primary" icon="done" @click="saveOrder"
                   v-if="!phoneControllVisible && !createUserAriaVisible">Сохранить
        </ui-button>
        <ui-button type="primary" color="primary" icon="done" @click="createUser"
                   v-if="createUserFlag && !createUserAriaVisible">Создать клиента
        </ui-button>
        <ui-button type="primary" color="primary" icon="done" @click="saveClient" v-if="createUserAriaVisible">
          Добавить клиента
        </ui-button>
        <ui-button @click="close" v-if="!phoneControllVisible && !createUserAriaVisible">Закрыть</ui-button>
      </template>
    </ui-modal>
  </div>
</template>

<script>
  import Api from '../api'
  import {actions} from '../store'
  import {moments, base64,common} from '../utils'
  import languageFr from '../utils/lang/lang-ru'
  import Order from '../data/order'
  import Client from '../data/client'
  import _ from 'lodash'

  export default {
    name: 'modal-order',

    components: {},

    data() {
      return {
        phoneLengthInfo: 13,
        defaultCode: '+375',
        codeRegionSelect: {
          name: 'Беларусь',
          value: '+375'
        },
        codeRegion: [
          {
            name: 'Беларусь',
            value: '+375'
          },
          {
            name: 'Россия',
            value: '+8'
          }
        ],

        langMass: languageFr,
        visible: false,
        saving: false,
        phoneNumberInfo: '',

        clientInfoHeader: '',

        yourTimeValueCreate: {
          HH: new Date().getHours(),
          mm: (String(new Date().getMinutes())).length < 2 ? '0' + new Date().getMinutes() : new Date().getMinutes()
        },
        yourFormat: 'HH:mm',

        yourTimeValueSend: {
          HH: new Date().getHours(),
          mm: new Date().getMinutes()
        },

        //Поиск по номеру телефона
        selectLoading: false,
        selectNoResults: false,
        selectLoadingTimeout: null,
        selectOptions: [],
        queryNumber: '',

        colours: [
          {
            label: '+375 29 123 6346' + ' ' + 'Андроп',
            icon: 'phone'
          },
          {
            label: '+375 29 545 2356' + ' ' + 'Прокопий',
            icon: 'phone'
          }, {
            label: '+375 29 894 5854' + ' ' + 'Евпатий',
            icon: 'phone'
          },
        ],


        visibleHeader: '',
        id: -1,
        groupKey: -1,
        name: '',
        alias: '',
        model: '',
        valueKey: -1,
        groupName: '',

        selectedValue: 0,

        edditedFlag: null,
        addFlag: null,
        phoneControllVisible: false,

        numberOrder: '',
        operatorName: '',
        dateCreateOrder: new Date(),
        pointOfDelivery: '',
        surName: '',
        firstName: '',
        middleName: '',
        addressInfo: '',
        phoneNumber: '',
        statusOrder: '',
        timeSend: new Date(),
        type: '',
        curierName: '',

        pointOfDeliverySend: [
          {
            name: 'нет',
            select: false
          },
          {
            name: 'Карлова 8',
            select: true
          },
          {
            name: 'Азазаза 14',
            select: true
          },
          {
            name: 'Фрунзе 34',
            select: true
          }
        ],

        typeStatus: [
          {
            name: 'нет',
            select: false
          },
          {
            name: 'доставка',
            select: true
          },
          {
            name: 'готовка',
            select: true
          },
          {
            name: 'апокалипсис сегодня',
            select: true
          }
        ],

        typeDelivery: [
          {
            name: 'нет',
            select: false
          },
          {
            name: 'курьер',
            select: true
          },
          {
            name: 'самовывоз',
            select: true
          }
        ],

        client: {
          phone: '+375',
          phoneNumbersClient: [],
          firstName: '',
          surName: '',
          middleName: '',
          addressInfoStreet: '',
          addressInfoBuilding: '',
          addressInfoFlat: '',
          eMail: '',
          discount: null,
          comments: '',
          statusClientSelect: '',
          statusClient: [
            {
              name: 'VIP',
              value: 'VIP'
            },
            {
              name: 'Чет еще',
              value: 'somebody'
            }
          ],
        },

        statusAfterSend: '',

        //Флаг поиска телефона
        phoneSearchFlag: null,

        //Флаг предложения создать пользователя
        createUserFlag: null,

        //Флаг видимости области создания пользователя
        createUserAriaVisible: null,

        //Данные нового пользователя
      };
    },

    computed: {

      values() {
        return this.$store.getters.values;
      },

      getUsersGroup(){
        return this.$store.getters.getUsersGroup;
      },

      getSearchClients(){
        //debugger;
        let send = [];
        let mass = this.$store.getters.getSearchClients;
        mass.map((val,index) => {
          send[index] = {label: val.phone + ' ' + val.surName};
        });
        return send;
      },

      scanString(){
        if(this.$store.getters.scanString.length){
          return this.$store.getters.scanString;
        }
      },

      phoneCount(){
        return this.selectOptions.length;
      },

      validationOrderForm(){
        let test = this.operatorName && this.numberOrder && this.surName && this.firstName && this.middleName && this.pointOfDelivery && this.surName && this.firstName && this.middleName && this.phoneNumber && this.statusOrder.name && this.timeSend && this.yourTimeValueSend.HH && this.type && this.curierName;
        return test;
      },
      validationCreateClientForm(){
        let test = this.client.surName && this.client.firstName && this.client.middleName && this.client.addressInfo && this.client.eMail && this.client.discount && this.client.comments && this.client.statusClientSelect;
        return test;
      },
    },

    mounted(){
      window.addEventListener('keydown', (event) => {
        this.handleGlobalKeyDown(event);
      });
    },

    watch: {
      saving(value) {
        this.$refs['modal'].dismissable = !value;
      },

      scanString(val){
          if(!val && this.$refs.focusSearchPanel){
            this.$refs.focusSearchPanel.query = '';
          }

        if(val && this.$refs.focusSearchPanel){
          this.$nextTick(function () {
            this.$refs.focusSearchPanel.classes[2] = {"is-active": true};
            this.$refs.focusSearchPanel.$refs.dropdown.style.display = 'block'; // => 'обновлено'

            this.$refs.focusSearchPanel.query = val;
            this.onQueryChange(this.$refs.focusSearchPanel.$refs.searchInput._value);
          })
        }
      },

      selectNoResults(val){
        this.createUserFlag = val;
      }
    },

    methods: {
      open(order) {
        // Данные диалога (редактирование существующего товара или создание нового)
        if (order) {
          this.numberOrder = order.id;
          this.operatorName = order.operatorName;
          this.dateCreateOrder = order.dateCreateOrder;
          this.pointOfDelivery = order.pointOfDelivery;
          this.clientInfo = order.client;
          this.addressInfo = order.addressInfo;
          this.phoneNumber = order.phoneNumber;
          this.statusOrder = order.statusOrder;
          this.timeSend = order.timeSend;
          this.type = order.type;
          this.curierName = order.curierName;

          this.edditedFlag = true;

          //Снимаем флаги всего остального
          this.visibleHeader = true;
          this.createUserAriaVisible = false;
          this.createUserFlag = false;
          this.phoneControllVisible = false;
          this.selectNoResults = false;

          this.$nextTick(function () {
            this.$refs.typeSend.classes[2] = {"is-active": false};
            this.$refs.typeSend.classes[4] = {"is-touched": false};

            this.$refs.typeSend.$refs.dropdown.style.display = 'none';
          })

        } else {
          this.numberOrder = '';
          this.operatorName = '';
          this.dateCreateOrder = new Date();
          this.pointOfDelivery = '';
          this.clientInfo = '';
          this.addressInfo = '';
          this.phoneNumber = '';
          this.statusOrder = '';
          this.timeSend = new Date();
          this.type = '';
          this.curierName = '';

          this.addFlag = true;

          this.selectOptions = [];
          this.visibleHeader = false;
          this.phoneControllVisible = true;

          //TODO
          this.createUserAriaVisible = false;
          this.$nextTick(function () {
            this.$refs.focusSearchPanel.classes[2] = {"is-active": false};
            this.$refs.focusSearchPanel.$refs.searchInput.autofocus = false;
            this.$refs.focusSearchPanel.$refs.dropdown.style.display = 'none'; // => 'обновлено'
          })

          this.$nextTick(function () {
            this.$refs.focusSearchPanel.classes[2] = {"is-active": true};
            //this.$refs.focusSearchPanel.$refs.searchInput.autofocus = true;
            this.$refs.focusSearchPanel.$refs.dropdown.style.display = 'block'; // => 'обновлено'
          })
        }

        // Обновим список единиц измерения в vuex

        this.$refs['modal'].open();
      },

      onQueryChange(query) {
        if (query.length === 0) {
          return;
        }
        query = this.defaultCode + query;
        this.fetchRemoteResults(query);
      },

      //добавление нескольких телефонных номеров
      plusNumbers(number){
        if (number.length) {
          number = base64.nospace(number);
          if (number.length === this.phoneLengthInfo) {
            if (this.client.phoneNumbersClient.length === 0) {
              this.client.phoneNumbersClient.push(number);
              this.$store.dispatch(actions.addAlertSuccess, 'Телефон добавлен');
              this.client.phone = '+375'
            } else {
              this.client.phoneNumbersClient.map((val) => {
                if (val === number) {
                  this.$store.dispatch(actions.addAlertWarning, 'Такой телефон уже есть');
                  return;
                } else {
                  this.client.phoneNumbersClient.push(number);
                  this.$store.dispatch(actions.addAlertSuccess, 'Телефон добавлен');
                  this.client.phone = '+375'
                }
              })
            }
          } else {
            this.$store.dispatch(actions.addAlertError, 'Неверный формат номера телефона');
            return;
          }
        }
      },

      selectPhoneNumber(query) {
        if (query) {
          this.$nextTick(function () {
            this.$refs.typeSend.classes[2] = {"is-active": false};
            this.$refs.typeSend.classes[4] = {"is-touched": false};

            this.$refs.typeSend.$refs.dropdown.style.display = 'none';
          })

          this.phoneControllVisible = false;
          this.clientInfoHeader = _.cloneDeep(this.queryNumber.label);
          this.queryNumber = '';
        }
      },

      fetchRemoteResults: _.debounce(function (query) {
        this.selectLoading = true;
        let that = this;
        if (this.selectLoadingTimeout) {
          clearTimeout(this.selectLoadingTimeout);
          this.selectLoadingTimeout = null;
        }
        this.selectLoadingTimeout = setTimeout(() => {
          if (that.startsWith(query)) {
              this.$store.dispatch(actions.getClientsByPhone,query)
                .then(()=>{
                  that.selectOptions = that.getSearchClients;
                });
            that.selectNoResults = null;
          } else {
            this.selectOptions = [];
            this.selectNoResults = true;
          }
          this.selectLoading = false;
          this.selectLoadingTimeout = null;
        }, 1200);
      }, 500),

      startsWith(string) {
        string = base64.nospace(string);
        let test = /((\+)[375]{1}[1-9])+(?:-?\d){1,4}/g.exec(string);
        if (test) {
          let lengthNumber = this.phoneLengthInfo;
          let answer = string.length > lengthNumber - 3 && string.length - 1 < lengthNumber;
          return answer;
        } else {
          this.$store.dispatch(actions.addAlertError, 'Неверный формат номера телефона');
          return false;
        }
      },

      createUser() {
        this.createUserFlag = false;
        this.selectNoResults = null;
        this.createUserAriaVisible = true;
      },

      close() {
        if (this.saving) {
          return;
        }

        this.$refs['modal'].close();
      },
      saveClient(){
        // Проверяем обязательные поля
        if (!this.validationCreateClientForm) {
          this.$store.dispatch(actions.addAlertWarning, 'Заполните все поля');
          return;
        }

        const client = Client.create();

        if (this.client.phoneNumbersClient.length) {
          client.phone = this.client.phoneNumbersClient;
        } else {
          client.phone.push(this.client.phone);
        }
        client.firstName = this.client.firstName;
        client.middleName = this.client.middleName;
        client.surName = this.client.surName;
        client.addressInfo = this.client.addressInfo;
        client.eMail = this.client.eMail;
        client.discount = this.client.discount;
        client.comments = this.client.comments;
        client.status = this.client.statusClientSelect;
        // Сохраняем объект на сервере
        this.$store.dispatch(actions.addNewClient, client)
          .then(() => {
            this.saving = false;
            this.$store.dispatch(actions.addAlertSuccess, 'Заказ сохранен');
            this.close();
          })
          .catch((error) => {
            this.saving = false;
            this.$store.dispatch(actions.addAlertError, 'Ошибка сохранения товара: ' + (error && error.message || error));
          });
      },

      saveOrder() {
        // Проверяем обязательные поля
        if (!this.validationOrderForm) {
          this.$store.dispatch(actions.addAlertWarning, 'Заполните все поля');
          return;
        }

        // Данные которые отправятся на сервер
        const order = Order.create();
        if (this.numberOrder > 0) {
          order.id = this.numberOrder;
        }
        order.dateCreateOrder = {
          date: new Date(),
          time: new Date().getHours() + ':' + new Date().getMinutes()
        };
        order.operatorName = this.operatorName;
        order.pointOfDelivery = this.pointOfDelivery;
        order.clientInfo = this.clientInfo;
        order.addressInfo = this.addressInfo;
        order.phoneNumber = this.phoneNumber;
        order.statusOrder = this.statusOrder;
        order.timeSend = {
          dateInfo: this.timeSend,
          timeInfo: this.yourTimeValueSend
        };
        order.type = this.type;
        order.curierName = this.curierName;
        // Сохраняем объект на сервере
        if (this.addFlag) {
          this.$store.dispatch(actions.addOrder, order)
            .then(() => {
              this.saving = false;
              this.$store.dispatch(actions.addAlertSuccess, 'Заказ сохранен');
              this.close();
            })
            .catch((error) => {
              this.saving = false;
              this.$store.dispatch(actions.addAlertError, 'Ошибка сохранения товара: ' + (error && error.message || error));
            });
        }
      },

      handleGlobalKeyDown(event) {

        // Не трогаем F клавиши
        if (event.keyCode >= 112 && event.keyCode <= 123) {
          return;
        }
        // Если не назначен здесь обработчик ввода, то ничего не делаем
        /*if (!this.phoneControllVisible) {
         return;
         }*/

        event.preventDefault();

        switch (event.code) {
          case 'Escape':
            break;

          default:
            this.$store.dispatch(actions.scanKey, {
              key: event.key,
              code: event.code,
              char: common.keyboardEventToChar(event)
            });
            break;
        }
      }
    }
  };
</script>

<style lang="scss">
  .option {
    display: flex;
    margin: 10px 10px;
    .phone-controll {
      flex-wrap: wrap;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      .ui-select:last-child {
        width: 65% !important;
        margin-left: 25px;
      }
      .ui-select:first-child {
        width: 25% !important;
      }
      .ui-select__options {
        max-height: 100px;
      }
      h2 {
        display: block;
        width: 100%;
        margin: 0 auto 15px;
        font-size: 28px;
        font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
      }
      .ui-select__search {
        width: 100% !important;
        display: flex;
      }
      .ui-select__no-results {
        width: inherit !important;
      }
      input {
        text-align: center;
        font-size: 18px;
        outline: none;
        width: inherit !important;
      }
    }
    .option-block {
      width: 48%;
      .ui-textbox.has-floating-label .ui-textbox__label-text.is-inline {
        font-size: 14px;
        font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
      }
      .ui-select {
        width: 100%;
        text-align: left;
      }
      .ui-select__options {
        overflow: auto;
        max-height: 100px;
      }
      .ui-datepicker--orientation-landscape .ui-modal__container {
        width: 24.75rem !important;
      }
      .option .phone-controll .ui-select__search {
        display: flex !important;
      }
      .phone-number {
        position: relative;
        span.add-text {
          position: absolute;
          color: rgba(0, 0, 0, 0.54);
        }
        i.add {
          position: absolute;
          right: 0;
          color: rgba(0, 0, 0, 0.54);
          bottom: 5px;
          &:hover {
            cursor: pointer;
            transform: scale(1.01, 1.01);
            transition: all 0.5s ease;
          }
        }
      }

      .address-info {
        display: flex;
        flex-wrap: nowrap;
      }
      div.address-info > div:nth-child(1) {
        flex: 0 0 50%;
      }
    }
  }

  .controll-panel-modal {
    position: absolute;
    left: 0;
    .ui-button--type-primary.ui-button--color-accent,
    .ui-button--type-primary.ui-button--color-accent:hover {
      margin-left: 10px;
      background-color: #ff4426 !important;
    }
  }

  .option-block:not(:first-child) {
    margin-left: 20px;
  }

  .ui-modal__footer {
    position: relative;
    height: 3.5rem;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.16);
    background-color: #f5f5f5;
    .ui-button--type-primary.ui-button--color-primary,
    .ui-button--type-primary.ui-button--color-primary:hover {
      background-color: #35495E !important;
    }
  }

  .ui-datepicker__display-value {
    text-align: left !important;
  }

  .settings-order .ui-modal__container {
    width: 49rem !important;
  }

  .settings-order .ui-modal__body {
    min-height: 250px;
  }

  .clock {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
  }

  .date-block {
    position: relative;
    .ui-datepicker {
      width: 60%;
    }
    .ui-datepicker__label {
      width: 182%;
    }
    .time-picker {
      position: absolute;
      z-index: 10;
      right: 0;
      top: 17px;
      width: 37%;
      .time-picker input.display-time {
        width: 8em;
      }
      &:hover {
        cursor: pointer;
      }
      input.display-time {
        text-align: center;
        border: none;
        color: rgba(0, 0, 0, 0.87);
        font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 1rem;
      }
      input.display-time:hover {
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.5s ease;
      }
    }
    .time-picker:hover {
      cursor: pointer !important;
    }
  }
</style>
