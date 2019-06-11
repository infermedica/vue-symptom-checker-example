<template>
  <label class="checkbox__label">
    {{ label }}
    <input :checked="value.includes(valueCheck) && selected === true"
           type="checkbox" :value="valueCheck" class="checkbox__input"
           @input="updateInput($event.target)"/>
    <span class="checkbox__mark"></span>
  </label>
</template>

<script>
  export default {
    name: 'BaseCheckbox',
    props: {
      value: {
        type: Array,
        default: Array
      },
      label: {
        type: String,
        default: ''
      },
      valueCheck: {
        type: String,
        default: ''
      },
      selected: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      updateInput(target) {
        if (this.value.includes(target.value) && !target.checked) {
          this.value.splice(this.value.indexOf(target.value), 1);
        } else {
          this.value.push(target.value);
        }
        this.$emit('input', this.value);
      }
    }
  };
</script>

<style lang="scss">
  .checkbox {
    &__mark {
      position: absolute;
      top: -3px;
      left: 0;
      width: 24px;
      height: 24px;
      background-color: $pale-grey;
      border-radius: 3px;
      transition: background-color 0.3s;

      &::after {
        position: absolute;
        top: 3px;
        left: 8px;
        display: none;
        width: 8px;
        height: 14px;
        content: '';
        border: solid $blank;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
    }

    &__label {
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 40px;
      margin-bottom: 14px;
      cursor: pointer;

      &:hover {
        .checkbox__mark {
          background-color: $faded-grey;
        }
      }
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;

      &:checked {
        ~ .checkbox__mark {
          background-color: $main-blue;

          &::after {
            display: flex;
          }
        }

        &:hover {
          ~ .checkbox__mark {
            background-color: $dull-blue;
          }
        }
      }
    }
  }
</style>
