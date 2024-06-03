<template>
    <div id="echart-line" ref="echart-line" style="width:100%;height:100%">
    
    
    
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
            let getchart = echarts.init($("#echart-line")[0]);
            var options = {
              title:{
                text:name,
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
                    boundaryGap: false,
                    data: xData
                },
                yAxis: {
                    type: 'value',
                    name :"总进展",
                    axisLabel: {
                      formatter: '{value} '
                    }
                },
                series: [{
                    name: "总进展",
                    type: 'line',
                    stack: '',
                    data: yData,
                    label:{
                      show:true,
                      formatter: '{c} '
                    }
                }]
            };
            getchart.setOption(options);
        }
      

    }

}
</script>