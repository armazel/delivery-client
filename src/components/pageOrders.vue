<template>
 <div>
   <div v-if="authenticated">
     <div class="controll-panel">
       <ui-button @click="openOrder" color="accent" icon="add">Добавить заказ</ui-button>
     </div>
     <rf-table bordered striped hover
               keyField="id"
               :headerHeight="34"
               :lineHeight="44"
               :selection="selectionOrder"
               @select="editOrder"
               :lines="dataInfo">
       <template slot="header">
         <th style="display: flex; flex: 1 1 5%">Номер</th>
         <th style="display: flex; flex: 1 1 5%">Имя оператора</th>
         <th style="display: flex; flex: 1 1 5%">Дата/время создания</th>
         <th  style="display: flex; flex: 1 1 10%">Точка доставки</th>
         <th  style="display: flex; flex: 1 1 10%">ФИО</th>
         <th  style="display: flex; flex: 1 1 10%">Адресс</th>
         <th  style="display: flex; flex: 1 1 5%">Телефон</th>
         <th  style="display: flex; flex: 1 1 5%">Тип</th>
         <th  style="display: flex; flex: 1 1 5%">Статус</th>
         <th  style="display: flex; flex: 1 1 5%">Дата/время доставки</th>
         <th  style="display: flex; flex: 1 1 5%">Курьер</th>
       </template>

       <template slot="filters">
         <td class="option-panel" style="display: flex; flex: 1 1 5%">
           <ui-textbox placeholder="Поиск по номеру" v-model="idSearch"></ui-textbox>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 5%">
           <ui-textbox placeholder="Поиск по имени" v-model="operatorNameSearch"></ui-textbox>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 5%">
           <ui-textbox placeholder="Поиск по дате" v-model="dateSearch"></ui-textbox>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 10%">
           <ui-select class="configs" placeholder="Точка доставки" v-model="pointOfDeliverySelect" :options="pointOfDelivery" :keys="{label: 'name', value: 'select'}"></ui-select>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 10%">
           <ui-textbox placeholder="Поиск по фио" v-model="clientSearch"></ui-textbox>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 10%">
           <ui-textbox placeholder="Поиск по адресу" v-model="adressSearch"></ui-textbox>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 5%">
           <ui-textbox placeholder="Поиск по телефону" v-model="phoneSearch"></ui-textbox>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 5%">
           <ui-select class="configs" placeholder="Тип доставки" v-model="typeDeliverySelect" :options="typeDelivery" :keys="{label: 'name', value: 'select'}"></ui-select>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 5%">
           <ui-select class="configs" placeholder="Статус доставки" v-model="typeStatusSelect" :options="typeStatus" :keys="{label: 'name', value: 'select'}"></ui-select>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 5%">
           <ui-textbox placeholder="Поиск по времени" v-model="deliverySearch"></ui-textbox>
         </td>
         <td class="option-panel" style="display: flex; flex: 1 1 5%">
           <ui-textbox placeholder="Поиск по имени" v-model="curierSearch"></ui-textbox>
         </td>
       </template>
       <template slot-scope="props">
         <td style="display: flex; flex: 1 1 5%">
           <span>{{props.line.id}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 5%">
           <span>{{props.line.operatorName}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 5%">
           <span>{{dateFilter(props.line.date)}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 10%">
           <span>{{props.line.pointOfDelivery}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 10%">
           <span>{{props.line.client}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 10%">
           <span>{{props.line.addressInfo}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 5%">
           <span>{{props.line.phoneNumber}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 5%">
           <span>{{props.line.type}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 5%">
           <span>{{props.line.statusOrder}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 5%">
           <span>{{dateFilter(props.line.timeSend)}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
         <td style="display: flex; flex: 1 1 5%">
           <span>{{props.line.curierName}}</span>
           <img class="setting-hover" src="../assets/settings.png">
         </td>
       </template>
     </rf-table>
     <modal-order ref="modal-order" />

   </div>
   <div v-if="!authenticated" class="anauthenticated"> <h1>Заказы</h1>
   </div>
 </div>
</template>
<script>
  import Api from '../api/orderApi'
  import { actions } from '../store'
  import { moments } from '../utils'
  import _ from 'lodash'
  import ModalOrder from '../components/ModalOrder'

  export default{
    name: 'pageOrders',

    components:{
      'modal-order': ModalOrder
    },

    computed: {
      infoFirst () {
        if (this.$store.getters.getReports) {
          return this.$store.getters.getReports
        }
      }
    },

    data () {
      return {
        dataInfo: [],
        templateSearch:'',
        idSearch:'',
        operatorNameSearch:'',
        selectionOrder:[],
        clientSearch:'',
        dateSearch:'',
        adressSearch:'',
        phoneSearch:'',
        deliverySearch:'',
        curierSearch:'',
        //Выбор точки доставки
        pointOfDelivery: [
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
        pointOfDeliverySelect: '',

        //Тип доставки
        typeDeliverySelect: '',
        typeDelivery:[
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

        //Тип статуса
        typeStatusSelect: '',
        typeStatus:[
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
        info: [
          {
            id: '325FFER356',
            operatorName:'Авдотья',
            date: new Date(),
            pointOfDelivery: 'Карлова 8',
            client: 'Прометей',
            addressInfo: 'Vaneeva 15-255',
            phoneNumber: '+375 29 546 54 14',
            statusOrder: 'доставка',
            timeSend: new Date(),
            type: 'курьер',
            curierName: 'Евдоким'
          },
          {
            id: '24ПА34R356',
            operatorName:'Авдотий',
            date: new Date(),
            pointOfDelivery: 'Азазаза 14',
            client: 'Азазель',
            addressInfo: 'Кунцевщина 15-255',
            phoneNumber: '+375 29 546 54 14',
            statusOrder: 'готовка',
            timeSend: new Date(),
            type: 'самовывоз',
            curierName: 'Прокопий'
          },
          {
            id: '24ПА34R356',
            operatorName:'Анатоль',
            date: new Date(),
            pointOfDelivery: 'Азазаза 14',
            client: 'Азазель',
            addressInfo: 'Кунцевщина 15-255',
            phoneNumber: '+375 29 546 54 14',
            statusOrder: 'готовка',
            timeSend: new Date(),
            type: 'самовывоз',
            curierName: 'Прокопий'
          },
          {
            id: '24ПА34R356',
            operatorName:'Евгатий',
            date: new Date(),
            pointOfDelivery: 'Азазаза 14',
            client: 'Азазель',
            addressInfo: 'Кунцевщина 15-255',
            phoneNumber: '+375 29 546 54 14',
            statusOrder: 'готовка',
            timeSend: new Date(),
            type: 'самовывоз',
            curierName: 'Прокопий'
          },
          {
            id: '24ПА34R356',
            operatorName:'Светозар',
            date: new Date(),
            pointOfDelivery: 'Азазаза 14',
            client: 'Азазель',
            addressInfo: 'Кунцевщина 15-255',
            phoneNumber: '+375 29 546 54 14',
            statusOrder: 'готовка',
            timeSend: new Date(),
            type: 'самовывоз',
            curierName: 'Прокопий'
          },
          {
            id: '14G35FJ554H6',
            operatorName:'Аристарх',
            date: new Date(),
            pointOfDelivery: 'Фрунзе 34',
            client: 'Аполон',
            addressInfo: 'Калукино 56-135',
            phoneNumber: '+375 29 988 23 86',
            statusOrder: 'апокалипсис сегодня',
            timeSend: new Date(),
            type: 'курьер',
            curierName: 'Игнатий'
          },
          {
            id: '42G45HG45G',
            operatorName:'Прокоп',
            date: new Date(),
            pointOfDelivery: 'Карлова 8',
            client: 'Гамора',
            addressInfo: 'Западный колизей 54-128',
            phoneNumber: '+375 29 546 54 14',
            statusOrder: 'ждемс еще',
            timeSend: new Date(),
            type: 'курьер',
            curierName: 'Афонасий'
          }
        ],
        detailSearchText: '',
      }
    },

    mounted () {
      this.dataInfo = _.cloneDeep(this.info);
    },
    watch:{
      idSearch(val) {
        this.detailSearchText = val;
        this.templateSearch = 'id';
        this.filterLinesDebounced();
      },
      operatorNameSearch(val) {
        this.detailSearchText = val;
        this.templateSearch = 'operatorName';
        this.filterLinesDebounced();
      },
      typeDeliverySelect(val) {
        if(val.select === true){
          this.detailSearchText = val.name;
        }else{
          this.detailSearchText = '';
        }
        this.templateSearch = 'type';
        this.filterLinesDebounced();
      },
      pointOfDeliverySelect(val) {
        if(val.select === true){
          this.detailSearchText = val.name;
        }else{
          this.detailSearchText = '';
        }
        this.templateSearch = 'pointOfDelivery';
        this.filterLinesDebounced();
      },
      typeStatusSelect(val) {
        if(val.select === true){
          this.detailSearchText = val.name;
        }else{
          this.detailSearchText = '';
        }
        this.templateSearch = 'statusOrder';
        this.filterLinesDebounced();
      },
      clientSearch(val) {
        this.detailSearchText = val;
        this.filterLinesDebounced();
        this.templateSearch = 'client';
      },
      dateSearch(val) {
        this.detailSearchText = val;
        this.filterLinesDebounced();
        this.templateSearch = 'date';
      },
      adressSearch(val) {
        this.detailSearchText = val;
        this.filterLinesDebounced();
        this.templateSearch = 'addressInfo';
      },
      phoneSearch(val) {
        this.detailSearchText = val;
        this.filterLinesDebounced();
        this.templateSearch = 'phoneNumber';
      },
      deliverySearch(val) {
        this.detailSearchText = val;
        this.filterLinesDebounced();
        this.templateSearch = 'timeSend';
      },
      curierSearch(val) {
        this.detailSearchText = val;
        this.filterLinesDebounced();
        this.templateSearch = 'curierName';
      },
    },

    computed:{
      authenticated(){
        return this.$store.getters.authenticated;
      },
    },

    methods: {
      dateFilter(date){
        let answer = moments.toDate(date);
        return answer;
      },

      filterLines() {
        if(this.detailSearchText){
          this.dataInfo = filterDelivery(this.info, this.detailSearchText, this.templateSearch);
        } else{
          this.dataInfo = _.cloneDeep(this.info);
        }
      },

      editOrder(order){
        this.selectionOrder = order;
        if (order) {
          this.$refs['modal-order'].open(order, 1);
        }
      },

      openOrder(){
        this.$refs['modal-order'].open(null,0);
      },

      filterLinesDebounced: _.debounce(function () {
        this.filterLines(true);
      }, 5),

    }

  }

  function filterDelivery(lines, filter, searchTemplate) {
      debugger;
    if (!filter.length) {
      return lines;
    }
    const lowerFilter = (filter || '').toLowerCase();
    return lines.filter((line) => {
      let answer = new Date();
      if(lowerFilter){
        answer = moments.toDate(answer);
      }
      if(searchTemplate === 'timeSend' || searchTemplate === 'date'){
        return answer.toLowerCase().includes(lowerFilter);
      } else{
        return line[searchTemplate].toLowerCase().includes(lowerFilter);
      }
    });
  }
</script>



<style lang="scss">
  .table-component__table tbody tr:nth-child(even)
  .rf-table tr{
    font-size: 15px !important;
  }
  td{
    display: flex;
    align-items: center;
    background: ghostwhite;
    justify-content: center;
    overflow: hidden !important;
    font-size: 15px !important;
  }
  th{
    justify-content: center !important;
  }
  td img{
    position: absolute;
    opacity: 0;
    transform: translate(0,-100px);
  }
  td:hover:not(.option-panel) span{
    transform: translate(0,100px);
    background: white;
    transition: all 0.5s ease;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
  }
  td:not(.option-panel){
    overflow: hidden;
  }
  td:hover:not(.option-panel) img{
    transform: translate(0,0px);
    opacity: 1;
    transition: all 0.5s ease;
  }
  .rf-table tr.filters.filters{
    background: whitesmoke;
  }
  main{
    margin-top: 0;
  }
  .anauthenticated{
    position: fixed;
    background: gray;
    height: 100vh;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.3;
    top:0;
    left:0;
    width: 100%;
  }
  .controll-panel{
    margin: 5px auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    .ui-button--type-primary.ui-button--color-accent,
    .ui-button--type-primary.ui-button--color-accent:hover{
      background-color: #35495E;
    }
  }
</style>


