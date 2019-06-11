<template>
  <label class="radio__label">
    {{ label }}
    <input :checked="checkValue === value || selected === true" :value="label"
           type="radio" class="radio__input"
           @input="$emit('input', checkValue)"/>
    <div class="radio__check"></div>
  </label>
</template>

<script>
  export default {
    name: 'BaseRadio',
    props: {
      value: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      checkValue: {
        type: String,
        default: ''
      },
      selected: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss">
  .radio {
    &__check {
      position: absolute;
      top: -1px;
      left: 3px;
      width: 20px;
      height: 20px;
      background-color: $dim-grey;
      border-radius: 50%;
      transition: border-width 0.2s, background-color 0.2s;
    }

    &__label {
      position: relative;
      display: flex;
      padding-left: 30px;
      margin: 10px 20px 10px 0;
      font-size: $font-minor;
      cursor: pointer;

      &:hover {
        .radio__check {
          background-color: $pale-grey;
        }
      }
    }

    &__input {
      position: absolute;
      cursor: pointer;
      opacity: 0;

      &:checked {
        ~ .radio__check {
          border: 5px solid $main-blue;
        }
      }

      &:not(:checked) {
        ~ .radio__check {
          border: 0;
        }
      }
    }
  }
</style>
