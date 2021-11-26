<template>
  <div :style="calculatedWidth" class="input__container">
    <input :disabled="disabled" :type="type"
           :value="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)"
           required novaldiate class="input__base"/>
    <label v-if="label" :class="disabled ? 'input__label--disabled': 'input__label'">{{ label }}</label>
    <span class="input__bar"></span>
    <transition>
      <div v-if="isError" class="input--error">{{ error }}</div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'BaseInput',
    props: {
      value: {
        type: [Number, String],
        default: ''
      },
      width: {
        type: Number,
        default: 170
      },
      label: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: 'Provide value'
      },
      error: {
        type: String,
        default: ''
      },
      isError: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      calculatedWidth() {
        return `width: ${this.width}px;`;
      }
    }
  };
</script>

<style lang="scss">
  .input {
    &__container {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 35px 0 15px 0;
    }

    &__label,
    &__label--disabled {
      position: absolute;
      bottom: 4px;
      left: 4px;
      margin: 0;
      font-size: $font-grand;
      transition: bottom 0.3s, left 0.3s, color 0.25s ease;

      &--disabled {
        bottom: 35px;
        color: $main-blue;
      }
    }

    &__bar {
      position: relative;
      width: 100%;

      &::before,
      &::after {
        position: absolute;
        bottom: 0;
        display: block;
        width: 0;
        height: 2px;
        content: '';
        background: $main-blue;
        transition: width 0.2s ease;
      }

      &::before {
        left: 50%;
      }

      &::after {
        right: 50%;
      }
    }

    &__base {
      width: 100%;
      padding-bottom: 3px;
      margin-top: 10px;
      font-size: $font-great;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 0;
      border-bottom: 2px solid $pale-grey;
      outline: 0;
      transition: width 0.2s;

      &::placeholder {
        color: $light-grey;
      }

      &:disabled {
        width: 20%;
        border-bottom: 2px solid transparent;
      }

      &:valid ~ {
        .input__label {
          bottom: 28px;
          color: $main-blue;
        }

        .input__label--disabled {
          bottom: 28px;
        }
      }

      &:focus ~ {
        .input__bar::after,
        .input__bar::before {
          width: 50%;
          color: $main-blue;
        }

        .input__label {
          bottom: 28px;
          color: $main-blue;
        }
      }

      &:hover {
        ~ .input__label {
          color: $main-blue;
        }
      }
    }

    &--error {
      position: absolute;
      right: 0;
      bottom: -18px;
      color: $error-clear;
    }
  }
</style>
