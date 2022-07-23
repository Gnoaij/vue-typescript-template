<script setup lang="ts">
import { useRequestAnimationFrame } from '@/hooks'

const time = ref('')

const padZero = (target: number, n = 2) => target.toString().padStart(n, '0')

const update = () => {
  const date = new Date()
  const Y = padZero(date.getFullYear(), 4)
  const M = padZero(date.getMonth() + 1)
  const D = padZero(date.getDate())
  const H = padZero(date.getHours())
  const m = padZero(date.getMinutes())
  const s = padZero(date.getSeconds())
  time.value = `${Y}-${M}-${D} ${H}:${m}:${s}`
}

const { start, stop } = useRequestAnimationFrame(update)

onMounted(() => {
  start()
})

onUnmounted(() => {
  stop()
})

onActivated(() => {
  start()
})

onDeactivated(() => {
  stop()
})
</script>

<template>
  <div class="clock">
    <span class="time">{{ time }}</span>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';

$color-shadow: rgb(255 255 255 / 50%);
$color-green: #10ccba;
$color-yellow: #ccbc2f;
$color-pink: #cc00b3;

.clock {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;

  .time {
    font-size: 7vw;
    color: transparent;
    user-select: none;
    background-clip: text;
    animation: clock-animation 3s linear infinite;
  }
}

@include T.set-theme-css('light') {
  .time {
    text-shadow: 0 0 4px $color-shadow;
    background-image: linear-gradient(135deg, $color-green, $color-yellow, $color-pink);
  }
}

@include T.set-theme-css('dark') {
  .time {
    text-shadow: 0 0 4px color.adjust($color-shadow, $alpha: 0.2);
    background-image: linear-gradient(
      135deg,
      color.adjust($color-green, $lightness: 20%),
      color.adjust($color-yellow, $lightness: 20%),
      color.adjust($color-pink, $lightness: 20%)
    );
  }
}

@keyframes clock-animation {
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
