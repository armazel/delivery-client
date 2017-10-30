<template>
  <div class="rf-table">
    <!-- Заголовки таблицы, сделаны отдельно чтобы не скроллились в virtual-scroller -->
    <table class="table table-bordered"
           v-if="isHeaderSlotUsed"
           style="background:floralwhite"
           :style="'flex: 0 0 ' + headerHeight + 'px'">
      <thead>
      <tr class="padding-scroll header" :style="'height: ' + headerHeight + 'px'">
        <slot name="header"></slot>
      </tr>
      <tr class="padding-scroll filters" :style="'height: ' + headerHeight + 'px'">
        <slot name="filters"></slot>
      </tr>
      </thead>
    </table>

    <virtual-scroller
      ref="scroller"
      :items="lines"
      :item-height="lineHeight"
      :keyField="keyField"
      container-tag="table"
      :containerClass="['table', {'table-bordered': bordered}, {'table-striped': striped}, {'table-hover': hover}]"
      content-tag="tbody"
      @scroll="onVirtualScroll"
    >
      <template slot-scope="props">
        <tr :key="props.itemKey"
            :class="__calcLineClass(props.item, props.itemIndex)"
            :style="'height: ' + lineHeight + 'px'"
            @click="select(props.item)"
            @dblclick="$emit('dblClick', props.item)">
          <slot :index="props.itemIndex" :line="props.item"></slot>
        </tr>
      </template>
    </virtual-scroller>

    <div class="rf-table__loading" v-show="innerIsLoading">
      <ui-progress-circular color="white" :size="32" :stroke="6"></ui-progress-circular>
    </div>

    <div class="rf-table__empty" v-if="isEmptyVisible">{{ emptyText }}</div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { VirtualScroller } from 'vue-virtual-scroller'

  const DEFAULT_HEIGHT = 24

  export default {
    name: 'rf-tablevsfd',

    components: {
      'virtual-scroller': VirtualScroller
    },

    props: {
      lines: {
        type: Array,
        default: () => []
      },
      keyField: {
        type: String,
        default: 'id'
      },
      headerHeight: {
        type: Number,
        default: DEFAULT_HEIGHT
      },
      lineHeight: {
        type: Number,
        default: DEFAULT_HEIGHT
      },
      lineClass: {
        type: [Function, String],
        default: ''
      },
      loading: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: false
      },
      selection: {
        type: [Object, Array],
        default: null
      },
      emptyText: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        innerIsLoading: false
      }
    },

    computed: {
      isHeaderSlotUsed () {
        return !!this.$slots['header']
        return !!this.$slots['settings']
      },
      isLineSlotUsed () {
        return !!this.$slots.default
      },
      isEmptyVisible () {
        return !this.innerIsLoading && (!this.lines || (this.lines.length === 0)) && this.emptyText
      }
    },

    watch: {
      loading (newLoading) {
        if (newLoading) {
          this.loadingDebounced()
        } else {
          this.innerIsLoading = newLoading
        }
      }
    },

    methods: {
      select (line) {
        this.$emit('select', line)
      },

      onVirtualScroll (e) {
        this.$emit('scroll', e)
      },

      loadingDebounced: _.debounce(function () {
        this.innerIsLoading = this.loading
      }, 200),

      getScroller() {
        return this.$refs['scroller']
      },

      scrollToIndex(index) {
        this.getScroller().scrollToItem(index)
      },

      __calcLineClass (line, index) {
        const classes = []

        // Классы из родительского компонента
        let lineClass = null
        if (this.lineClass) {
          if (typeof this.lineClass === 'function') {
            lineClass = this.lineClass(line, index)
          } else {
            lineClass = this.lineClass
          }
          if (lineClass) {
            classes.push(lineClass)
          }
        }

        // Класс выделения
        if (this.selection && line === this.selection) {
          classes.push('selected')
        }

        return classes
      }
    }
  }
</script>

<style lang="scss">
  .rf-table {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px solid #d9d9d9;

    .ui-select.is-active:not(.is-disabled) .ui-select__display.ui-select__display{
      border-bottom: none;
    }
    .ui-select__display.ui-select__display{
      border-bottom: none;
    }

    table{
      width: 100%;
    }

    td:hover {
      cursor: pointer;
      transition: all 0.5s ease;
    }

    input{
      text-align: center;
      border-bottom: none !important;
    }
    th{
      display: flex;
      justify-content: flex-start;
      padding-left: 10px;
      color: white;
      letter-spacing: .02em;
      font-size: 12px;
      align-items: center;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
    tr.header{
      background: #35495E;
    }
    tr.filters{
      background: gainsboro;
    }
    tr{
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }
    td:hover{
      background: white;
      transition: all 0.5s ease;
    }
    td.option-panel{
      background: white;
    }
    td{
      background: floralwhite;
      position: relative;
      justify-content: center;
      border-top: none;
      border-left: none;
      padding: 4px;
      border-right: 1px solid #eceeef;
      border-bottom: 1px solid #eceeef;
    }

    &__loading {
      position: absolute;
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.1);
    }

    &__empty {
      position: absolute;
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .virtual-scroller {
      overflow-y: scroll !important;
      flex: 1;
    }
    .padding-scroll {
      padding-right: 17px;
    }
    tr:not(.option-panel .filters):hover td{
      background: white;
      border: none;
    }
    tr:hover:not(.option-panel .filters) span{
      transform: translate(0,100px);
      background: white;
      transition: all 1.5s ease;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
    }

    tr:not(.filters):hover td{
      background: white;
      border: none;
    }
    tr:hover:not(.filters) span{
      transform: translate(0,100px);
      background: white;
      transition: all 1.5s ease;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
    }

  }
  .option-panel{
    .ui-textbox,.ui-select{
      margin: 0;
    }
  }
</style>
