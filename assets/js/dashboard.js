"use strict";
!(function () {
  let s,
  i = {
    series1: "#FF625F",
    series2: "#83E542",
    series3: "#787EFF",
    series4: "#FDBE42",
    series5: "#29dac7",
  };
  var c = document.querySelector("#dataAsset"),
    d = {
      chart: { height: 310, parentHeightOffset: 0, type: "donut" },
      labels: ["IT Hardware & Software", "Furniture", "Electronics", "Vehicles"],
      series: [1000, 240, 534, 360],
      colors: [i.series1, i.series2, i.series3, i.series4],
      stroke: { width: 0 },
      dataLabels: {
        enabled: !1,
        formatter: function (e, t) {
          return parseInt(e);
        },
      },
      legend: {
        show: !0,
        position: "bottom",
        offsetY: 2,
        markers: { width: 8, height: 8, offsetX: -3 },
        itemMargin: { horizontal: 12, vertical: 5 },
        fontSize: "13px",
        fontFamily: "Inter",
        fontWeight: 400,
        labels: { colors: "#4C4E64DE", useSeriesColors: !1 },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: !0,
              value: {
                fontSize: "26px",
                fontFamily: "Inter",
                color: "#4C4E64DE",
                fontWeight: 500,
                offsetY: -12,
                formatter: function (e) {
                  return parseInt(e);
                },
              },
              name: { offsetY: 25, fontFamily: "Inter", color:"#4C4E64DE", },
              total: {
                show: !0,
                fontSize: "13px",
                color: "#4C4E64DE",
                label: "Total Data Asset",
                formatter: function (e) {
                  // console.log(e.config.series)
                  const series = e.config.series;
                  const sum = series.reduce((total, currentValue) => total + parseInt(currentValue), 0);
                  // console.log(sum)
                  return sum;
                },
              },
            },
            size: '78%'
          },
        },
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            chart: { height: 360 },
            legend: {
              position: "bottom",
              labels: { colors: s, useSeriesColors: !1 },
            },
          },
        },
        {
          breakpoint: 576,
          options: {
            chart: { height: 320 },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: !0,
                    name: { fontSize: "12px" },
                    value: { fontSize: "16px" },
                    total: { fontSize: "16px" },
                  },
                },
              },
            },
            legend: {
              position: "bottom",
              labels: { colors: s, useSeriesColors: !1 },
            },
          },
        },
        {
          breakpoint: 420,
          options: { chart: { height: 280 }, legend: { show: !1 } },
        },
        {
          breakpoint: 360,
          options: { chart: { height: 250 }, legend: { show: !1 } },
        },
      ],
    };
  null !== c && new ApexCharts(c, d).render();
})();
