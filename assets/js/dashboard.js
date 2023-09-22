"use strict";
!(function () {
  let e, o, r, t, s;
  t = (
    isDarkStyle
      ? ((e = config.colors_dark.cardColor),
        (o = config.colors_dark.headingColor),
        (r = config.colors_dark.textMuted),
        (s = config.colors_dark.bodyColor),
        config.colors_dark)
      : ((e = config.colors.cardColor),
        (o = config.colors.headingColor),
        (r = config.colors.textMuted),
        (s = config.colors.bodyColor),
        config.colors)
  ).borderColor;
  const a = { series1: "#826af9", series2: "#d2b0ff", bg: "#f8d3ff" },
    i = {
      series1: "#FF625F",
      series2: "#83E542",
      series3: "#787EFF",
      series4: "#FDBE42",
      series5: "#29dac7",
    },
    l = { series1: "#ab7efd", series2: "#b992fe", series3: "#e0cffe" };
  function n(e, o) {
    let r = 0;
    for (var t = []; r < e; ) {
      var s = "w" + (r + 1).toString(),
        a = Math.floor(Math.random() * (o.max - o.min + 1)) + o.min;
      t.push({ x: s, y: a }), r++;
    }
    return t;
  }
  var c = document.querySelector("#dataAsset"),
    d = {
      chart: { height: 310, parentHeightOffset: 0, type: "donut" },
      labels: ["IT Hardware & Software", "Furniture", "Electronics", "Vehicles"],
      series: [1000, 240, 534, 123],
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
        itemMargin: { horizontal: 8, vertical: 4 },
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
                  return "1002";
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
