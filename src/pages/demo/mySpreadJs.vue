<template>
  <div>
    <input type="file" id="myFile" @change="importExcel">
    <gc-spread-sheets :hostClass='hostClass' @workbookInitialized="initWorkBook" id="mySpread">
      <gc-worksheet
          :dataSource="dataTable"
          :autoGenerateColumns='autoGenerateColumns'
      >
        <gc-column
            :width="width"
            :dataField="'price'"
            :visible='visible'
            :formatter='formatter'
            :resizable='resizable'
        ></gc-column>
        <gc-column></gc-column>
        <gc-column></gc-column>

      </gc-worksheet>
    </gc-spread-sheets>
  </div>
</template>

<style>
.spread-host {
  width: 1500px;
  height: 800px;
}
</style>
<!--<script src="@grapecity-software/spread-sheets-io/dist/gc.spread.sheets.io.min.js"></script>-->
<script>
//需要安装： npm install @grapecity-software/spread-sheets-vue
//使用excelio : npm install @grapecity-software/spread-sheets-io

import '@grapecity-software/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css'
import '@grapecity-software/spread-sheets-vue'
import  { IO } from  "@grapecity-software/spread-sheets-io"
import * as GC from '@grapecity-software/spread-sheets';

export default {
  data() {
    return {
      hostClass: 'spread-host',
      autoGenerateColumns: true,
      width: 150,
      visible: true,
      resizable: true,
      formatter: "$ #.00",
      spread: null
    }
  },
  computed: {
    dataTable() {
      let dataTable = [];
      for (let i = 0; i < 20; i++) {
        dataTable.push({price: i + 0.56})
      }
      return dataTable
    }
  },
  methods: {
    initWorkBook(spread) {
      this.spread = spread;

      let sheet = spread.getActiveSheet();
      sheet.getCell(1, 1).value("Hello World");
      sheet.getCell(3, 1).value(100);

      //设置列宽
      sheet.setColumnWidth(1, 100);
      //设置行高
      sheet.setRowHeight(1, 30);

      //设置单元格下拉菜单
      var listStyle = new GC.Spread.Sheets.Style();
      listStyle.cellButtons = [
        {
          imageType: GC.Spread.Sheets.ButtonImageType.dropdown,
          command: "openList",
          useButtonStyle: true
        }
      ];
      listStyle.dropDowns = [{
        type: GC.Spread.Sheets.DropDownType.list,
        option: {
          items: [{
            text: "AAAAAAA",
            value: "AAAAAAA"
          }, {
            text: "BBBBBB",
            value: "BBBBBB"
          }]
        }
      }];
      sheet.setStyle(1, 2, listStyle);

      //冻结行列
      sheet.frozenRowCount(1);
      sheet.frozenColumnCount(1);
      sheet.options.frozenlineColor = "blue";

      //设置区域样式
      var styleYellow = new GC.Spread.Sheets.Style();
      styleYellow.backColor = "yellow";
      styleYellow.foreColor = "white";
      sheet.conditionalFormats.addCellValueRule(GC.Spread.Sheets.ConditionalFormatting.ComparisonOperators.EqualsTo, 100, undefined, styleYellow, [new GC.Spread.Sheets.Range(0, 0, 10, 3)]);

      //sheet.setStyle(3,2,styleYellow);

      //单元格下拉框
      var cellType2 = new GC.Spread.Sheets.CellTypes.ComboBox();
      cellType2.items(["a", "b", "c"]);
      sheet.getCell(4, 2).cellType(cellType2);

      var items2 = ["a", "ab", "abc", "apple", "boy", "cat", "dog"];
      var eComboBoxCellType = new GC.Spread.Sheets.CellTypes.ComboBox().items(items2).editable(true);
      sheet.getCell(5, 2).cellType(eComboBoxCellType);
      sheet.setColumnWidth(2,120);

      var activeSheet=sheet;
      // 将行头的列数设置为2。
      activeSheet.setRowCount(1,GC.Spread.Sheets.SheetArea.colHeader);
      activeSheet.setColumnCount(3,GC.Spread.Sheets.SheetArea.rowHeader);
      activeSheet.setValue(3, 0,"Column",GC.Spread.Sheets.SheetArea.rowHeader);
      activeSheet.options.rowHeaderAutoTextIndex = 1;
      activeSheet.options.rowHeaderAutoText = GC.Spread.Sheets.HeaderAutoText.numbers;
      activeSheet.options.colHeaderAutoTextIndex = 1;
      activeSheet.options.colHeaderAutoText = GC.Spread.Sheets.HeaderAutoText.letters;

      //新增行列
      sheet.addRows(0,1);
      sheet.addColumns(0,1);

      //黄图标
      var style1 = new GC.Spread.Sheets.Style();
      style1.decoration = {
        icons: [
          {
            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02IDBDOS4zMTM3MSAwIDEyIDIuNjg2MjkgMTIgNkMxMiA5LjMxMzcxIDkuMzEzNzEgMTIgNiAxMkMyLjY4NjI5IDEyIDAgOS4zMTM3MSAwIDZDMCAyLjY4NjI5IDIuNjg2MjkgMCA2IDBaTTYgOEM2LjM2ODE5IDggNi42NjY2NyA4LjI5ODQ4IDYuNjY2NjcgOC42NjY2N0M2LjY2NjY3IDkuMDM0ODYgNi4zNjgxOSA5LjMzMzMzIDYgOS4zMzMzM0M1LjYzMTgxIDkuMzMzMzMgNS4zMzMzMyA5LjAzNDg2IDUuMzMzMzMgOC42NjY2N0M1LjMzMzMzIDguMjk4NDggNS42MzE4MSA4IDYgOFpNNiAyLjY2NjY3QzYuMjc2MTQgMi42NjY2NyA2LjUgMi44OTA1MiA2LjUgMy4xNjY2N1Y2LjY2NjY3QzYuNSA2Ljk0MjgxIDYuMjc2MTQgNy4xNjY2NyA2IDcuMTY2NjdDNS43MjM4NiA3LjE2NjY3IDUuNSA2Ljk0MjgxIDUuNSA2LjY2NjY3VjMuMTY2NjdDNS41IDIuODkwNTIgNS43MjM4NiAyLjY2NjY3IDYgMi42NjY2N1oiIGZpbGw9IiNGRjk5MDIiLz4KPC9zdmc+Cg==',
            position: GC.Spread.Sheets.IconPosition.leftOfText
          }
        ]
      };
      sheet.setStyle(5, 1, style1);

      //已识别
      var style2 = new GC.Spread.Sheets.Style();
      style2.decoration = {
        icons: [
          {
            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0tMC4wMDA0ODgyODEgNS45OTk5Qy0wLjAwMDQ4ODI4MSAyLjY4NjExIDIuNjg1ODcgLTAuMDAwMjQ0MTQxIDUuOTk5NjYgLTAuMDAwMjQ0MTQxQzkuMzEzNDUgLTAuMDAwMjQ0MTQxIDExLjk5OTggMi42ODYxMSAxMS45OTk4IDUuOTk5OUMxMS45OTk4IDkuMzEzNjkgOS4zMTM0NSAxMiA1Ljk5OTY2IDEyQzIuNjg1ODcgMTIgLTAuMDAwNDg4MjgxIDkuMzEzNjkgLTAuMDAwNDg4MjgxIDUuOTk5OVpNOC43NTQyMyA0LjE0NjM1QzguNTU4OTYgMy45NTEwOCA4LjI0MjM3IDMuOTUxMDggOC4wNDcxIDQuMTQ2MzVMNC45ODIxNSA3LjIwOTk3TDMuNjg2NTEgNS45MTQxNkwzLjYxNzI2IDUuODU2M0MzLjQyMjM4IDUuNzIxMyAzLjE1Mjk1IDUuNzQwNTkgMi45NzkzOCA1LjkxNDE2QzIuNzg0MTEgNi4xMDk0MiAyLjc4NDExIDYuNDI2MDEgMi45NzkzOCA2LjYyMTI4TDQuNjI5MzQgOC4yNzEyNEw0LjY5ODU5IDguMzI5MDlDNC44OTM0NiA4LjQ2NDA5IDUuMTYyODkgOC40NDQ4MSA1LjMzNjQ2IDguMjcxMjRMOC43NTQyMyA0Ljg1MzQ3TDguODEyMDggNC43ODQyMkM4Ljk0NzA4IDQuNTg5MzUgOC45Mjc4IDQuMzE5OTIgOC43NTQyMyA0LjE0NjM1WiIgZmlsbD0iIzFDQzc4RCIvPgo8L3N2Zz4K',
            position: GC.Spread.Sheets.IconPosition.left
          }
        ]
      };
      sheet.setStyle(6, 1, style2);

      //未识别
      var style3 = new GC.Spread.Sheets.Style();
      style3.decoration = {
        icons: [
          {
            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02IDBDOS4zMTM3MSAwIDEyIDIuNjg2MjkgMTIgNkMxMiA5LjMxMzcxIDkuMzEzNzEgMTIgNiAxMkMyLjY4NjI5IDEyIDAgOS4zMTM3MSAwIDZDMCAyLjY4NjI5IDIuNjg2MjkgMCA2IDBaTTYgOEM2LjM2ODE5IDggNi42NjY2NyA4LjI5ODQ4IDYuNjY2NjcgOC42NjY2N0M2LjY2NjY3IDkuMDM0ODYgNi4zNjgxOSA5LjMzMzMzIDYgOS4zMzMzM0M1LjYzMTgxIDkuMzMzMzMgNS4zMzMzMyA5LjAzNDg2IDUuMzMzMzMgOC42NjY2N0M1LjMzMzMzIDguMjk4NDggNS42MzE4MSA4IDYgOFpNNiAyLjY2NjY3QzYuMjc2MTQgMi42NjY2NyA2LjUgMi44OTA1MiA2LjUgMy4xNjY2N1Y2LjY2NjY3QzYuNSA2Ljk0MjgxIDYuMjc2MTQgNy4xNjY2NyA2IDcuMTY2NjdDNS43MjM4NiA3LjE2NjY3IDUuNSA2Ljk0MjgxIDUuNSA2LjY2NjY3VjMuMTY2NjdDNS41IDIuODkwNTIgNS43MjM4NiAyLjY2NjY3IDYgMi42NjY2N1oiIGZpbGw9IiNGRjRDNEMiLz4KPC9zdmc+Cg==',
            position: GC.Spread.Sheets.IconPosition.left
          }
        ]
      };
      sheet.setStyle(7, 1, style3);




    },
    importExcel() {
      let spread = this.spread;
      debugger
      var excelIO = new GC.Spread.Excel.IO();

      spread.suspendPaint();
      var excelFile = document.getElementById("myFile").files[0];
      excelIO.open(excelFile, function (json) {
        spread.fromJSON(json);
      }, function (e) {
        console.log(e);
      });

      spread.resumePaint();
    },
  }
}
</script>
