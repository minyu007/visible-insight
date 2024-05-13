<template>
    <keep-alive>
    <Chart style="width: 100%; height: 370px" :option="chartOption" />
</keep-alive>
    <!-- </a-col> -->
</template>

<script lang="ts" setup>
    import useChartOption from '@/hooks/chart-option';
    const props = defineProps({
        columns: {
            type: Number,
            default: 4,
        },
        name: {
            type: String,
            default: '',
        },
        timer: {
            type: Array,
            default: () => ([]),
        },
        data: {
            type: Array,
            default: () => ([]),
        },
        vid: {
            type: Number,
            default: 100,
        },
        category: {
            type: String,
            default: '',
        }
    })
    // console.log(props.category)
    const color = props.category == 'good'? 'red': 'green'

    const { chartOption } = useChartOption(() => {
      return {
        title: {
          text: props.name,
        },
        xAxis: {
            type: 'category',
            data: props.timer
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: props.data,
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: color
                }
            }
        ]
      };
    });
</script>
  