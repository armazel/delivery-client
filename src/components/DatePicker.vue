<template>
  <div class="date-picker">

   <div class="date-pick-block">
     <ui-datepicker
       floating-label
       orientation="landscape"
       picker-type="modal"
       icon="events"
       placeholder="Выберите дату"
       v-model="firstPeriod"
       :lang="langMass"
     >
     </ui-datepicker>
   </div>
    <div class="devider-line-block">
      <span class="devider-line">-</span>
    </div>

    <div class="date-pick-block">
    <ui-datepicker
      floating-label
      orientation="landscape"
      picker-type="modal"
      placeholder="Выберите дату"
      v-model="secondPeriod"
      :lang="langMass"
    >
    </ui-datepicker>
    </div>
  </div>
</template>

<script>
  import languageFr from '../utils/lang/lang-ru'

  const DEFAULT_HEIGHT = 24

  export default {
    name: 'date-picker-area',

    data(){
      return{
        langMass:languageFr,
        firstPeriod: null,
        secondPeriod: null
      };
    },
  }
</script>

<style lang="scss">
  .date-picker{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    color: white;
    .date-pick-block{
      width: 29%;
      .ui-datepicker__label{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        color: white;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
      }
      .ui-datepicker__icon-wrapper .ui-icon,
      .ui-datepicker__display-value.is-placeholder,
      .ui-datepicker.is-active:not(.is-disabled) .ui-datepicker__display,
      .ui-datepicker.is-active:not(.is-disabled) .ui-datepicker__display,
      .ui-datepicker__display,
      .ui-datepicker.is-active:not(.is-disabled) .ui-datepicker__label-text, .ui-datepicker.is-active:not(.is-disabled) .ui-datepicker__icon-wrapper .ui-icon{
        color: white;
      }
      .ui-datepicker__display,
      .ui-datepicker.is-active:not(.is-disabled) .ui-datepicker__display{
        border-bottom-color: white;
      }
      .ui-datepicker:hover:not(.is-disabled) .ui-datepicker__display{
        border-bottom-color: white;
        opacity: 0.7;
        transition: all 0.5s ease;
      }
    }
  }
  .devider-line-block{
    display: flex;
    align-items: flex-start;
  }
  span.devider-line{
    text-align: start;
    margin: 0 15px;
  }
  .ui-datepicker--orientation-landscape .ui-modal__container{
    width: 26.75rem !important;
  }
</style>
