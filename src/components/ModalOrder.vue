<template>
  <div>
    <ui-modal class="modal-good-group" ref="modal" dismissOn="esc close-button" @open="visible = true" @close="visible = false">
      <template slot="header">
        <h2 v-if="visibleHeader"> <ui-icon class="ui-modal__header-icon" icon="build" style="margin-right: 10px"></ui-icon>Изменение заказа № {{numberOrder}}</h2>
        <h2 v-if="!visibleHeader"> <ui-icon class="ui-modal__header-icon" icon="add_shopping_cart" style="margin-right: 10px"></ui-icon>Создание заказа</h2>
      </template>

      <template>
        <div class="option">
          <div class="option-block">

            <ui-textbox
              floating-label
              icon="vpn_key"
              label="Номер заказа"
              v-model="numberOrder">
            </ui-textbox>

            <div class="date-block">
             <!-- <vue-timepicker :disabled=true v-model="yourTimeValueCreate" :format=yourFormat></vue-timepicker>-->

              <ui-datepicker
                floating-label
                orientation="landscape"
                picker-type="modal"
                icon="events"
                placeholder="Select a date"
                :disabled=true
                v-model="date"
                :lang="langMass"
                :min-date="new Date()"
              >Дата/время создания
              </ui-datepicker>

            </div>

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
              label="ФИО"
              v-model="clientInfo">
            </ui-textbox>

            <ui-textbox
              floating-label
              icon="edit_location"
              label="Адресс"
              v-model="addressInfo">
            </ui-textbox>

          </div>

          <div class="option-block">

            <ui-textbox
              floating-label
              icon="call"
              label="Номер телефона"
              v-model="phoneNumber">
            </ui-textbox>

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
            <ui-select floating-label
                       label="Тип доставки"
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
        <div class="controll-panel-modal" v-if="visibleHeader">
          <ui-button color="accent" icon="delete">Удалить заказ</ui-button>
        </div>
        <ui-button type="primary" color="primary" icon="done" @click="save">Сохранить</ui-button>
        <ui-button @click="close">Закрыть</ui-button>
      </template>
    </ui-modal>
  </div>
</template>

<script>
    import Api from '../api'
    import {actions} from '../store'
    import {moments} from '../utils'
    import languageFr from '../utils/lang/lang-ru'
    import Order from '../data/order'

    export default {
        name: 'modal-order',

        components: {

        },

      data() {
        return {
          langMass: languageFr,
          visible: false,
          saving: false,

          yourTimeValueCreate: {
            HH: new Date().getHours(),
            mm: new Date().getMinutes()
          },
          yourFormat: 'HH:mm',

          yourTimeValueSend: {
            HH: new Date().getHours(),
            mm: new Date().getMinutes()
          },

          visibleHeader: '',
          id: -1,
          groupKey: -1,
          name: '',
          alias: '',
          model: '',
          valueKey: -1,
          groupName: '',

          selectedValue: 0,

          numberOrder: '',
          date: new Date(),
          pointOfDelivery: '',
          clientInfo: '',
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
        };
      },

        computed: {

            values() {
                return this.$store.getters.values;
            },
        },

        watch: {
            saving(value) {
                debugger;
                this.$refs['modal'].dismissable = !value;
            },

           /* selectedValue(value) {
                this.valueKey = value ? value.id : -1;
            }*/
        },

        methods: {
          open(order) {
            // Данные диалога (редактирование существующего товара или создание нового)
            if (order) {
              this.numberOrder = order.id
              this.date = order.date
              this.pointOfDelivery = order.pointOfDelivery
              this.clientInfo = order.client
              this.addressInfo = order.addressInfo
              this.phoneNumber = order.phoneNumber
              this.statusOrder = order.statusOrder
              this.timeSend = order.timeSend
              this.type = order.type
              this.curierName = order.curierName

              this.visibleHeader = true;
            } else {
              this.numberOrder = ''
              this.date = new Date()
              this.pointOfDelivery = ''
              this.client = ''
              this.addressInfo = ''
              this.phoneNumber = ''
              this.statusOrder = ''
              this.timeSend = new Date()
              this.type = ''
              this.curierName = ''

              this.visibleHeader = false;
            }

            // Обновим список единиц измерения в vuex

            this.$refs['modal'].open();
          },

            /*getGoodGroup(id){
                this.$store.dispatch(actions.getGoodGroup,id);
            },*/

            close() {
                if (this.saving) {
                    return;
                }

                this.$refs['modal'].close();
            },

          onEndDatetimeChanged: function(newEnd) {
            let startPicker = this.$.startPicker.control;
            startPicker.maxDate(newEnd);
          },

            save() {

                /*// Проверяем обязательные поля
                if (!(this.groupKey > 0)) {
                    this.$store.dispatch(actions.addAlertWarning, 'Не выбрана товарная группа');
                    return;
                }
                if (!(this.valueKey > 0)) {
                    this.$store.dispatch(actions.addAlertWarning, 'Не выбрана единица измерения');
                    return;
                }*/

                // Данные которые отправятся на сервер
                const order = Order.create();
                if (this.numberOrder > 0) {
                  order.id = this.numberOrder;
                }
               order.date = this.date;
               order.pointOfDelivery = this.pointOfDelivery;
               order.client = this.clientInfo;
               order.addressInfo = this.addressInfo;
               order.phoneNumber = this.phoneNumber;
               order.statusOrder = this.statusOrder;
               order.timeSend = this.timeSend;
               order.type = this.type;
               order.curierName = this.curierName;
                // Сохраняем объект на сервере
              /*this.$store.dispatch(actions.saveOrder, order)
                .then(() => {
                  this.saving = false;
                  this.$store.dispatch(actions.addAlertSuccess, 'Заказ сохранен');
                  this.close();
                  /!*Перезагрузка страницы*!/
                  this.$store.dispatch(actions.reQueryGoods);
                })
                .catch((error) => {
                  this.saving = false;
                  this.$store.dispatch(actions.addAlertError, 'Ошибка сохранения товара: ' + (error && error.message || error));
                });*/
            }
        }
    };
</script>

<style lang="scss">
  .option{
    display: flex;
    margin: 10px 10px;
    .option-block{
      width: 48%;
      .ui-textbox.has-floating-label .ui-textbox__label-text.is-inline{
        font-size: 14px;
        font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
      }
      .ui-select{
        width: 100%;
        text-align: left;
      }
      .ui-select__options{
        overflow: auto;
        max-height: 100px;
      }
    }
  }
  .controll-panel-modal{
    position: absolute;
    left: 0;
    .ui-button--type-primary.ui-button--color-accent,
    .ui-button--type-primary.ui-button--color-accent:hover{
      margin-left: 10px;
      background-color: #ff4426;
    }
  }
  .option-block:not(:first-child){
    margin-left: 20px;
  }
  .ui-modal__footer{
    position: relative;
    height: 3.5rem;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.16);
    background-color: #f5f5f5;
    .ui-button--type-primary.ui-button--color-primary,
    .ui-button--type-primary.ui-button--color-primary{
      background-color: #35495E;
    }
  }
  .ui-datepicker__display-value{
    text-align: left !important;
  }
  .ui-modal__container{
    width: 49rem !important;
  }

  .clock{
    position: absolute;
    background: rgba(0,0,0,0.3);
  }
  .date-block{
    position: relative;
    .ui-datepicker{
      width: 60%;
    }
    .ui-datepicker__label{
      width: 182%;
    }
    .time-picker{
      position: absolute;
      z-index: 10;
      right: 0;
      top: 17px;
      width: 37%;
      .time-picker input.display-time{
        width: 8em;
      }
      &:hover{
        cursor: pointer;
      }
      input.display-time{
        text-align: center;
        border: none;
        color: rgba(0, 0, 0, 0.87);
        font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 1rem;
      }
      input.display-time:hover{
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.5s ease;
      }
    }
    .time-picker:hover{
      cursor: pointer !important;
    }
  }
</style>
