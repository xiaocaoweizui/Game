<template>
    <div id="echart-bar" ref="echart-bar" style="width:100%;height:100%">
    
    
    
    </div>
</template>

<script>
import echarts from "echarts";



// window.addEventListener('resize', () => {
//     getchart.resize();
// });

export default {

    methods: {
        initChart(name, xData, yData) {
            let getchart = echarts.init($("#echart-bar")[0]);
            var options = {
              title:{
                text:"每周收入金币",
                left:"center"
              },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [name],
                    bottom: '0%'
                },
                grid: {
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'value',
                    name :"总金币（万）",
                    axisLabel: {
                      formatter: '{value} w'
                    }
                },
                series: [{
                    name: "总金币",
                    type: 'bar',
                    barWidth: '30%',
                    data: yData,
                    label:{
                      show:true,
                      formatter: '{c} W'
                    }
                }]
            };
            getchart.setOption(options);
        }
      

    }

}
</script>