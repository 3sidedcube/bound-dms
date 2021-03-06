<template>
  <div
    data-notify="container"
    class="col-xs-11 col-sm-4 alert open"
    role="alert"
    :class="[verticalAlign, horizontalAlign, alertType]"
    :style="customPosition"
    data-notify-position="top-center">
    <button
      type="button"
      aria-hidden="true"
      class="close col-xs-1"
      data-notify="dismiss"
      @click="close">×
    </button>
    <fa-icon :name="icon" scale="2" class="alert-icon"></fa-icon>
    <span data-notify="message" v-html="message"></span>
  </div>
</template>
<script>
  export default {
    name: 'notification',
    props: {
      message: String,
      icon: {
        type: String,
        default: 'info'
      },
      verticalAlign: {
        type: String,
        default: 'top'
      },
      horizontalAlign: {
        type: String,
        default: 'center'
      },
      type: {
        type: String,
        default: 'info'
      },
      timeout: {
        type: Number,
        default: 5000
      }
    },
    computed: {
      alertType () {
        return `alert-${this.type}`
      },
      customPosition () {
        let initialMargin = 20
        let alertHeight = 90
        let sameAlertsCount = this.$notifications.state.filter((alert) => {
          return alert.horizontalAlign === this.horizontalAlign && alert.verticalAlign === this.verticalAlign
        }).length
        let pixels = (sameAlertsCount - 1) * alertHeight + initialMargin
        let styles = {}
        if (this.verticalAlign === 'top') {
          styles.top = `${pixels}px`
        } else {
          styles.bottom = `${pixels}px`
        }
        return styles
      }
    },
    methods: {
      close () {
        this.$emit('on-close')
      }
    },
    mounted () {
      if (this.timeout) {
        setTimeout(this.close, this.timeout)
      }
    }
  }

</script>
<style lang="scss" scoped>

  $bg-nude: #f4f3ef !default;
  $bg-primary: #8ECFD5 !default;
  $bg-info: #6200FF !default;
  $bg-success: #6200FF !default;
  $bg-warning: #FFE28C !default;
  $bg-danger: #F63959 !default;
  $default-bg: #66615B;
  $default-states-color: #403D39;

  $primary-bg: #7A9E9F;
  $primary-states-color: #427C89;

  $success-bg: #6200FF;
  $success-states-color: #FFF;

  $info-bg: #6200FF;
  $info-states-color: #FFF;

  $warning-bg: #F3BB45;
  $warning-states-color: #BB992F;

  $danger-bg: #F63959;
  $danger-states-color: #FFF;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter,
  .fade-leave-to
  /* .fade-leave-active in <2.1.8 */

  {
    opacity: 0
  }

  .alert {
    border: 0;
    border-radius: 0;
    color: #FFFFFF;
    padding: 10px 15px;
    font-size: 14px;
    z-index: 100;
    display: inline-block;
    position: fixed;
    transition: all 0.5s ease-in-out;

    &.center {
      left: 0px;
      right: 0px;
      margin: 0 auto;
    }
    &.left {
      left: 20px;
    }
    &.right {
      right: 20px;
    }
    .container & {
      border-radius: 4px;
    }
    .navbar & {
      border-radius: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 85px;
      width: 100%;
      z-index: 3;
    }
    .navbar:not(.navbar-transparent) & {
      top: 70px;
    }

    .alert-icon {
      float: left;
      position: relative;
      top: 5px;
      margin-right: 15px;
    }

    .close~span {
      display: block;
      max-width: 89%;
    }

    &[data-notify="container"] {
      width: 350px;
      padding: 10px 10px 10px 20px;
      border-radius: 4px;
    }
  }

  .alert-info {
    background-color: $bg-info;
    color: $info-states-color;
  }

  .alert-success {
    background-color: $bg-success;
    color: $success-states-color;
  }

  .alert-warning {
    background-color: $bg-warning;
    color: $warning-states-color;
  }

  .alert-danger {
    background-color: $bg-danger;
    color: $danger-states-color;
  }
</style>
