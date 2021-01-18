import {getLodop} from '@/tools/LodopFuncs'
//  自有产品标签
const PrintAccount = (data, printingQuantity, apiece, repeat) => {
  function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
  }

  //  调用打印对象
  LODOP = getLodop()
  //  序号
  LODOP.PRINT_INITA(0, 0, 50, 50, '成品_自有产品标签');
  LODOP.SET_PRINT_PAGESIZE(1, '95mm', '65mm', '');
  /*  LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1);
    LODOP.SET_PRINT_STYLEA(2, 'AngleOfPageInside', 180);*/
  for (var i = 0; i < printingQuantity; i++) {
    LODOP.SET_PRINT_STYLE('FontSize', 15);
    LODOP.SET_PRINT_STYLEA('FontName','黑体');
    LODOP.ADD_PRINT_TEXT('1.5mm', '16mm', '65mm', '10mm', data[0].goodName);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);// 给前面的那个文本加粗。
    if (getLength(data[0].color) >= 19) {
      LODOP.ADD_PRINT_TEXT('14mm', '16mm', '68mm', '10mm', data[0].color);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    } else {
      LODOP.ADD_PRINT_TEXT('14mm', '16mm', '75mm', '10mm', data[0].color);
      LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
    }
    LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);
    LODOP.ADD_PRINT_BARCODE('10mm', '81mm', '13mm', '13mm', 'QRCode', data[0].barcode)
    LODOP.ADD_PRINT_TEXT('22mm', '16mm', '33mm', '10mm', data[0].executiveStandard);
    console.log(getLength(data[0].executiveStandard))
    if(getLength(data[0].executiveStandard)>14){
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
    }else{
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
    }
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    LODOP.SET_PRINT_STYLEA(0, 'LetterSpacing', 0.1);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('26.5mm', '16mm', '33mm', '10mm', data[0].standardForSubstances);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('24mm', '64mm', '33mm', '10mm', data[0].mixtureRatio);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11.5);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('33mm', '16mm', '32mm', '10mm', data[0].productionDate);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('33mm', '64mm', '32mm', '10mm', data[0].lotNo);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('43mm', '16mm', '31mm', '10mm', data[0].qualityGuaranteePeriod);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('41mm', '64mm', '33mm', '10mm', data[0].spec);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 26);
    LODOP.SET_PRINT_STYLEA(0,'FontName','黑体');
    LODOP.SET_PRINT_STYLEA(0,'LineSpacing', 1);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.SET_PRINT_STYLE('FontSize', 10.5);
    LODOP.ADD_PRINT_TEXT('55mm', '15.5mm', '50mm', '10mm', '料号:' + data[0].goodCode);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    // 分页
    LODOP.NewPage();
  }
}
//  OEM成品
const PrintTwo1 = (data, printingQuantity, apiece, repeat, printModel) => {
  function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
  }
  LODOP.PRINT_INITA(0, 0, 50, 50, '100*70标签');
  //  调用打印对象
  LODOP = getLodop()
  for (var i = 0; i < printingQuantity; i++) {
    //  序号
    LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm', '');
    // 表格线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '3mm', '96mm', 0, 1);
    // 上横线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '67mm', '2mm', 0, 1);
    //  最左竖线
    LODOP.ADD_PRINT_LINE('3mm', '96mm', '67mm', '96mm', 0, 1);
    //  最右竖线
    LODOP.ADD_PRINT_LINE('67mm', '2mm', '67mm', '96mm', 0, 1);
    //  下横线
    LODOP.SET_PRINT_STYLEA('FontName','黑体');
    LODOP.SET_PRINT_STYLE('FontSize', 14);
    LODOP.ADD_PRINT_TEXT('16mm', '2.5mm', '17.5mm', '10mm', '旧料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);

    console.log(getLength(data[0].color))
    if(getLength(data[0].color) > 13){
      if(getLength(data[0].color)> 27){
        LODOP.ADD_PRINT_TEXT('4mm', '19mm', '62.5mm', '40mm', data[0].color);
      }else{
        LODOP.ADD_PRINT_TEXT('10mm', '19mm', '62.5mm', '40mm', data[0].color);
      }
    }else{
      LODOP.ADD_PRINT_TEXT('14mm', '19mm', '62.5mm', '40mm', data[0].color);
    }

    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 23);
    LODOP.SET_PRINT_STYLEA(0,'FontName','黑体');
    LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);

    LODOP.ADD_PRINT_BARCODE('10mm', '76mm', '21mm', '21mm', 'QRCode', data[0].barcode)
   /* LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);*/
    LODOP.ADD_PRINT_TEXT('38mm', '2mm', '17.5mm', '10mm', '生产');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('44mm', '2mm', '17.5mm', '10mm', '日期');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('41mm', '19mm', '30mm', '10mm', data[0].productionDate);
    LODOP.ADD_PRINT_TEXT('41mm', '50.3mm', '17.5mm', '10mm', '批号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13);
    if(getLength(data[0].lotNo)>11){
      LODOP.ADD_PRINT_TEXT('38mm', '67.3mm', '32mm', '10mm', data[0].lotNo);
    }else{
      LODOP.ADD_PRINT_TEXT('41mm', '67.3mm', '32mm', '10mm', data[0].lotNo);
    }
    LODOP.ADD_PRINT_TEXT('56mm', '2.5mm', '17.5mm', '10mm', '料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLE('FontSize', 8);
    LODOP.ADD_PRINT_TEXT('57mm', '19mm', '33mm', '10mm', data[0].goodCode);
    LODOP.SET_PRINT_STYLE('FontSize', 14);
    LODOP.ADD_PRINT_TEXT('56mm', '50.3mm', '17.5mm', '10mm', '净含量');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
    LODOP.ADD_PRINT_TEXT('56mm', '65.3mm', '30mm', '10mm', data[0].spec);
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    // 第一行横线
    LODOP.ADD_PRINT_LINE('35.3mm', '2mm', '35.3mm', '96mm', 0, 1);
    // 第二行横线
    LODOP.ADD_PRINT_LINE('50.6mm', '2mm', '50.6mm', '96mm', 0, 1);
    // 中间第一竖线
    LODOP.ADD_PRINT_LINE('3mm', '18mm', '67mm', '18mm', 0, 1);
    // 中间第二竖线
    LODOP.ADD_PRINT_LINE('35.3mm', '49.5mm', '67mm', '49.5mm', 0, 1);
    // 中间第三竖线
    LODOP.ADD_PRINT_LINE('35.3mm', '66.5mm', '67mm', '66.5mm', 0, 1);
    //  最右竖线
    //  分页
    LODOP.NewPage();
  }
}
//  成品_OEM产品_美瓷胶标签
const PrintTwo2 = (data, printingQuantity, apiece, repeat, printModel) => {
  function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
  }
  LODOP.PRINT_INITA(0, 0, 50, 50, '100*70标签');
  //  调用打印对象
  LODOP = getLodop()
  for (var i = 0; i < printingQuantity; i++) {
    //  序号
    LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm', '');
    // 表格线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '3mm', '96mm', 0, 1);
    // 上横线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '67mm', '2mm', 0, 1);
    //  最左竖线
    LODOP.ADD_PRINT_LINE('3mm', '96mm', '67mm', '96mm', 0, 1);
    //  最右竖线
    LODOP.ADD_PRINT_LINE('67mm', '2mm', '67mm', '96mm', 0, 1);
    //  下横线
    LODOP.SET_PRINT_STYLEA('FontName','黑体');
    LODOP.SET_PRINT_STYLE('FontSize', 14);
    LODOP.ADD_PRINT_TEXT('16mm', '2.5mm', '17.5mm', '10mm', '旧料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
    if(getLength(data[0].color) > 13){
      if(getLength(data[0].color)> 27){
        LODOP.ADD_PRINT_TEXT('4mm', '19mm', '62.5mm', '40mm', data[0].color);
      }else{
        LODOP.ADD_PRINT_TEXT('10mm', '19mm', '62.5mm', '40mm', data[0].color);
      }
    }else{
      LODOP.ADD_PRINT_TEXT('14mm', '19mm', '62.5mm', '40mm', data[0].color);
    }
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 23);
    LODOP.SET_PRINT_STYLEA(0,'FontName','黑体');
    LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    LODOP.ADD_PRINT_BARCODE('10mm', '76mm', '21mm', '21mm', 'QRCode', data[0].barcode)
    LODOP.ADD_PRINT_TEXT('38mm', '2mm', '17.5mm', '10mm', '生产');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('44mm', '2mm', '17.5mm', '10mm', '日期');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('41mm', '19mm', '30mm', '10mm', data[0].productionDate);

    LODOP.ADD_PRINT_TEXT('41mm', '52.3mm', '17mm', '10mm', '批号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13);
    if(getLength(data[0].lotNo)>11){
      LODOP.ADD_PRINT_TEXT('38mm', '67.3mm', '32mm', '10mm', data[0].lotNo);
    }else{
      LODOP.ADD_PRINT_TEXT('41mm', '67.3mm', '32mm', '10mm', data[0].lotNo);
    }
    LODOP.ADD_PRINT_TEXT('56mm', '2mm', '17.5mm', '10mm', '料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLE('FontSize', 8);
    LODOP.ADD_PRINT_TEXT('57mm', '19mm', '38mm', '10mm', data[0].goodCode);
    LODOP.SET_PRINT_STYLE('FontSize', 14);
    LODOP.ADD_PRINT_TEXT('53mm', '52.3mm', '17mm', '10mm', '每箱');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('59mm', '52.3mm', '17mm', '10mm', '数量');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLE('FontSize', 16);
    LODOP.ADD_PRINT_TEXT('56mm', '65.3mm', '30mm', '10mm', apiece + '支');
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    // 第一行横线
    LODOP.ADD_PRINT_LINE('35.3mm', '2mm', '35.3mm', '96mm', 0, 1);
    // 第二行横线
    LODOP.ADD_PRINT_LINE('50.6mm', '2mm', '50.6mm', '96mm', 0, 1);
    // 中间第一竖线
    LODOP.ADD_PRINT_LINE('3mm', '18mm', '67mm', '18mm', 0, 1);
    // 中间第二竖线
    LODOP.ADD_PRINT_LINE('35.3mm', '49.5mm', '67mm', '49.5mm', 0, 1);
    // 中间第三竖线
    LODOP.ADD_PRINT_LINE('35.3mm', '66.5mm', '67mm', '66.5mm', 0, 1);
    //  最右竖线
    //  分页
    LODOP.NewPage();
  }
}
//  半成品_色石&Base标签
const PrintTwo3 = (data, printingQuantity, apiece, repeat, printModel) => {
  function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
  }
  LODOP.PRINT_INITA(0, 0, 50, 50, '100*70标签');
  //  调用打印对象
  LODOP = getLodop()
  for (var i = 0; i < printingQuantity; i++) {
    //  序号
    LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm', '');
    // 表格线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '3mm', '96mm', 0, 1);
    // 上横线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '67mm', '2mm', 0, 1);
    //  最左竖线
    LODOP.ADD_PRINT_LINE('3mm', '96mm', '67mm', '96mm', 0, 1);
    //  最右竖线
    LODOP.ADD_PRINT_LINE('67mm', '2mm', '67mm', '96mm', 0, 1);
    //  下横线
    LODOP.SET_PRINT_STYLEA('FontName','黑体');
    LODOP.SET_PRINT_STYLE('FontSize', 14);
    LODOP.ADD_PRINT_TEXT('16mm', '2.5mm', '17.5mm', '10mm', '旧料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
    if(getLength(data[0].color) > 13){
      if(getLength(data[0].color)> 27){
        LODOP.ADD_PRINT_TEXT('4mm', '19mm', '62.5mm', '40mm', data[0].color);
      }else{
        LODOP.ADD_PRINT_TEXT('10mm', '19mm', '62.5mm', '40mm', data[0].color);
      }
    }else{
      LODOP.ADD_PRINT_TEXT('14mm', '19mm', '62.5mm', '40mm', data[0].color);
    }
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 23);
    LODOP.SET_PRINT_STYLEA(0,'FontName','黑体');
    LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    LODOP.ADD_PRINT_BARCODE('10mm', '76mm', '21mm', '21mm', 'QRCode', data[0].barcode)
    LODOP.ADD_PRINT_TEXT('38mm', '2mm', '17.5mm', '10mm', '生产');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('44mm', '2mm', '17.5mm', '10mm', '日期');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('41mm', '19mm', '30mm', '10mm', data[0].productionDate);
    LODOP.ADD_PRINT_TEXT('41mm', '50.3mm', '17.5mm', '10mm', '批号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13);
    if(getLength(data[0].lotNo)>11){
      LODOP.ADD_PRINT_TEXT('38mm', '67.3mm', '32mm', '10mm', data[0].lotNo);
    }else{
      LODOP.ADD_PRINT_TEXT('41mm', '67.3mm', '32mm', '10mm', data[0].lotNo);
    }
    LODOP.ADD_PRINT_TEXT('56mm', '2.5mm', '17.5mm', '10mm', '料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLE('FontSize', 8);
    LODOP.ADD_PRINT_TEXT('57mm', '19mm', '33mm', '10mm', data[0].goodCode);
    LODOP.SET_PRINT_STYLE('FontSize', 14);
    LODOP.ADD_PRINT_TEXT('56mm', '50.3mm', '17.5mm', '10mm', '净重量');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
    LODOP.ADD_PRINT_TEXT('56mm', '65.3mm', '30mm', '10mm', data[0].spec);
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    // 第一行横线
    LODOP.ADD_PRINT_LINE('35.3mm', '2mm', '35.3mm', '96mm', 0, 1);
    // 第二行横线
    LODOP.ADD_PRINT_LINE('50.6mm', '2mm', '50.6mm', '96mm', 0, 1);
    // 中间第一竖线
    LODOP.ADD_PRINT_LINE('3mm', '18mm', '67mm', '18mm', 0, 1);
    // 中间第二竖线
    LODOP.ADD_PRINT_LINE('35.3mm', '49.5mm', '67mm', '49.5mm', 0, 1);
    // 中间第三竖线
    LODOP.ADD_PRINT_LINE('35.3mm', '66.5mm', '67mm', '66.5mm', 0, 1);
    //  最右竖线
    //  分页
    LODOP.NewPage();
  }
}
//  半成品_美瓷胶标签
const PrintTwo4 = (data, printingQuantity, apiece, repeat, printModel) => {
  function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
  }
  LODOP.PRINT_INITA(0, 0, 50, 50, '100*70标签');
  //  调用打印对象
  LODOP = getLodop()
  for (var i = 0; i < printingQuantity; i++) {
    //  序号
    LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm', '');
    // 表格线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '3mm', '96mm', 0, 1);
    // 上横线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '67mm', '2mm', 0, 1);
    //  最左竖线
    LODOP.ADD_PRINT_LINE('3mm', '96mm', '67mm', '96mm', 0, 1);
    //  最右竖线
    LODOP.ADD_PRINT_LINE('67mm', '2mm', '67mm', '96mm', 0, 1);
    //  下横线
    LODOP.SET_PRINT_STYLEA('FontName','黑体');
    LODOP.SET_PRINT_STYLE('FontSize', 14);
    LODOP.ADD_PRINT_TEXT('16mm', '2.5mm', '17.5mm', '10mm', '旧料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
    if(getLength(data[0].color) > 13){
      if(getLength(data[0].color)> 27){
        LODOP.ADD_PRINT_TEXT('4mm', '19mm', '62.5mm', '40mm', data[0].color);
      }else{
        LODOP.ADD_PRINT_TEXT('10mm', '19mm', '62.5mm', '40mm', data[0].color);
      }
    }else{
      LODOP.ADD_PRINT_TEXT('14mm', '19mm', '62.5mm', '40mm', data[0].color);
    }
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 23);
    LODOP.SET_PRINT_STYLEA(0,'FontName','黑体');
    LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    LODOP.ADD_PRINT_BARCODE('10mm', '76mm', '21mm', '21mm', 'QRCode', data[0].barcode)
    LODOP.ADD_PRINT_TEXT('38mm', '2mm', '17.5mm', '10mm', '生产');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('44mm', '2mm', '17.5mm', '10mm', '日期');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('41mm', '19mm', '30mm', '10mm', data[0].productionDate);

    LODOP.ADD_PRINT_TEXT('41mm', '52.3mm', '17mm', '10mm', '批号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13);
    if(getLength(data[0].lotNo)>11){
      LODOP.ADD_PRINT_TEXT('38mm', '67.3mm', '32mm', '10mm', data[0].lotNo);
    }else{
      LODOP.ADD_PRINT_TEXT('41mm', '67.3mm', '32mm', '10mm', data[0].lotNo);
    }
    LODOP.ADD_PRINT_TEXT('56mm', '2mm', '17.5mm', '10mm', '料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLE('FontSize', 8);
    LODOP.ADD_PRINT_TEXT('56mm', '19mm', '38mm', '10mm', data[0].goodCode);
    LODOP.SET_PRINT_STYLE('FontSize', 14);
    LODOP.ADD_PRINT_TEXT('53mm', '52.3mm', '17mm', '10mm', '每箱');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('59mm', '52.3mm', '17mm', '10mm', '数量');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLE('FontSize', 16);
    LODOP.ADD_PRINT_TEXT('56mm', '67.3mm', '30mm', '10mm', data[0].spec);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    // 第一行横线
    LODOP.ADD_PRINT_LINE('35.3mm', '2mm', '35.3mm', '96mm', 0, 1);
    // 第二行横线
    LODOP.ADD_PRINT_LINE('50.6mm', '2mm', '50.6mm', '96mm', 0, 1);
    // 中间第一竖线
    LODOP.ADD_PRINT_LINE('3mm', '18mm', '67mm', '18mm', 0, 1);
    // 中间第二竖线
    LODOP.ADD_PRINT_LINE('35.3mm', '49.5mm', '67mm', '49.5mm', 0, 1);
    // 中间第三竖线
    LODOP.ADD_PRINT_LINE('35.3mm', '66.5mm', '67mm', '66.5mm', 0, 1);
    //  最右竖线
    //  最右竖线
    //  分页
    LODOP.NewPage();
  }
}
//  外购物料标签
const PrintThree = (data, codetype, url, code) => {
  //  调用打印对象
  LODOP = getLodop()
  LODOP.PRINT_INITA(0, 0, 100, 70, '100*70标签');
  for (var i = 0; i < data.length; i++) {
    console.log(i)
    let qrAccount = data[i].barcode
    // 序号

    LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm', '');
    // 表格线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '3mm', '96mm', 0, 1);
    // 上横线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '67mm', '2mm', 0, 1);
    //  最左竖线
    LODOP.ADD_PRINT_LINE('3mm', '96mm', '67mm', '96mm', 0, 1);
    //  最右竖线
    LODOP.ADD_PRINT_LINE('67mm', '2mm', '67mm', '96mm', 0, 1);
    //  下横线
    LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);
    LODOP.SET_PRINT_STYLEA('FontName','新宋体');
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.ADD_PRINT_BARCODE('30mm', '67.5mm', '34mm', '34mm', 'QRCode', qrAccount)
    LODOP.ADD_PRINT_TEXT('6mm', '2mm', '17mm', '10mm', '旧料号');
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0,'Bold',  1);
    LODOP.ADD_PRINT_TEXT('6mm', '19mm', '76mm', '10mm', data[i].oldCode);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.SET_PRINT_STYLE('FontSize', 12);
    LODOP.ADD_PRINT_TEXT('17mm', '2mm', '17mm', '10mm', '品  名');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.ADD_PRINT_TEXT('17mm', '19mm', '76mm', '10mm', data[i].goodName);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.ADD_PRINT_TEXT('28mm', '2mm', '17mm', '10mm', '料  号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.ADD_PRINT_TEXT('28mm', '17mm', '53mm', '10mm', data[i].goodCode);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.ADD_PRINT_TEXT('39mm', '2mm', '17mm', '10mm', '规  格');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.ADD_PRINT_TEXT('39mm', '19mm', '47mm', '10mm', data[i].spec);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.ADD_PRINT_TEXT('50mm', '2mm', '17mm', '10mm', '批  号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.ADD_PRINT_TEXT('50mm', '19mm', '47mm', '10mm', data[i].lotNo);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    LODOP.ADD_PRINT_TEXT('61mm', '2mm', '17mm', '10mm', '日  期');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    if(data[i].productionDate != undefined && data[i].productionDate != null){
      LODOP.ADD_PRINT_TEXT('61mm', '19mm', '47mm', '10mm', data[i].productionDate);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    }else{
      LODOP.ADD_PRINT_TEXT('61mm', '19mm', '47mm', '10mm', data[i].putTime);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.SET_PRINT_STYLEA(0,'Bold',1);
    }
    // 第一行横线
    LODOP.ADD_PRINT_LINE('13.8mm', '2mm', '13.8mm', '96mm', 0, 1);
    // 第二行横线
    LODOP.ADD_PRINT_LINE('24.6mm', '2mm', '24.6mm', '96mm', 0, 1);
    // 第三行横线
    LODOP.ADD_PRINT_LINE('35.4mm', '2mm', '35.4mm', '67.8mm', 0, 1);
    // 第四行横线
    LODOP.ADD_PRINT_LINE('46.2mm', '2mm', '46.2mm', '67.8mm', 0, 1);
    // 第四行横线
    LODOP.ADD_PRINT_LINE('57.2mm', '2mm', '57.2mm', '67.8mm', 0, 1);
    // 中间第一竖线
    LODOP.ADD_PRINT_LINE('3mm', '18mm', '67mm', '18mm', 0, 1);
    // 中间第二竖线
    LODOP.ADD_PRINT_LINE('24.6mm', '67.8mm', '67mm', '67.8mm', 0, 1);
    // 分页
    LODOP.NewPage();
  }
}
//  物料标签
const PrintFour = (data, codetype, url, code) => {
  //  调用打印对象
  LODOP = getLodop()
  LODOP.PRINT_INITA(0, 0, 100, 70, '100*70标签');
  for (var i = 0; i < data.length; i++) {
    let qrAccount = data[i].qrCode;
    //  序号

    LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm', '');
    // 表格线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '3mm', '96mm', 0, 1);
    // 上横线
    LODOP.ADD_PRINT_LINE('3mm', '2mm', '67mm', '2mm', 0, 1);
    //  最左竖线
    LODOP.ADD_PRINT_LINE('3mm', '96mm', '67mm', '96mm', 0, 1);
    //  最右竖线
    LODOP.ADD_PRINT_LINE('67mm', '2mm', '67mm', '96mm', 0, 1);
    //  下横线
    LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);
    LODOP.ADD_PRINT_BARCODE('20mm', '65mm', '34mm', '34mm', 'QRCode', qrAccount)
    LODOP.SET_PRINT_STYLE('FontSize', 12);
    LODOP.ADD_PRINT_TEXT('11mm', '2mm', '24mm', '10mm', '旧料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('11mm', '26mm', '37mm', '10mm', data[i].oldCode);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('32mm', '2mm', '24mm', '10mm', '料  号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('32mm', '26mm', '37mm', '10mm', data[i].goodCode);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    /* LODOP.ADD_PRINT_TEXT('33mm', '2mm', '24mm', '10mm', '批  号');
     LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
     LODOP.ADD_PRINT_TEXT('33mm', '26mm', '37mm', '10mm', '');
     LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);*/
    LODOP.ADD_PRINT_TEXT('54mm', '2mm', '24mm', '10mm', '规  格');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('54mm', '26mm', '37mm', '10mm', data[i].spec);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    /*LODOP.ADD_PRINT_TEXT('59mm', '2mm', '24mm', '10mm', '入库日期');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('59mm', '26mm', '37mm', '10mm', '');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);*/
    // 第一行横线
    LODOP.ADD_PRINT_LINE('23.8mm', '2mm', '23.8mm', '62.8mm', 0, 1);
    // 第二行横线
    LODOP.ADD_PRINT_LINE('43.6mm', '2mm', '43.6mm', '62.8mm', 0, 1);
    /* // 第三行横线
     LODOP.ADD_PRINT_LINE('41.4mm', '2mm', '41.4mm', '62.8mm', 0, 1);
     // 第四行横线
     LODOP.ADD_PRINT_LINE('54.2mm', '2mm', '54.2mm', '62.8mm', 0, 1);*/
    // 中间第一竖线
    LODOP.ADD_PRINT_LINE('3mm', '25.2mm', '67mm', '25.2mm', 0, 1);
    // 中间第二竖线
    LODOP.ADD_PRINT_LINE('3mm', '62.8mm', '67mm', '62.8mm', 0, 1);
    // 分页
    LODOP.NewPage();
  }
}
//  成品排产信息
const PrintSchedule = (data, codetype, url, code) => {
  function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) {
        // 全角
        len += 2;
      } else {
        len += 1;
      }

    }
    return len;
  }

  function fucCheckLength(strTemp) {
    var i, sum;
    sum = 0;
    for (i = 0; i < strTemp.length; i++) {
      if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {
        sum = sum + 1;
      } else {
        sum = sum + 2;
      }
    }
    return sum;
  }

  function cutStr(str, L, M) {
    var result = ''
    var strlen = str.length //  字符串长度
    var chrlen = str.replace(/[^x00-\xff]/g, '**').length //  字节长度
    if (chrlen <= L) {
      return str
    }

    for (var i = 0, j = 0; i < strlen; i++) {
      var chr = str.charAt(i)
      if (/[x00-\xff]/.test(chr)) {
        j++ //  ascii码为0-255，一个字符就是一个字节的长度
      } else {
        j += 2 //  ascii码为0-255以外，一个字符就是两个字节的长度
      }
      if (j <= L) { //  当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
        result += chr
      } else { //  反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
        return result
      }
    }
  }

  function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
  }

  let fenyeSize = 0;
  let num = 2
  LODOP.SET_PRINT_PAGESIZE(0, '210mm', '297mm', 'A4');// 一开始用的是像素，后来都改成用mm为单位
  LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1);
  LODOP.SET_PRINT_STYLEA(0, 'AngleOfPageInside', 90);
  // 动态列表信息
  let trheight = 9;// 用于每个竖线距离上面的固定长度
  let thHeight = 11;// 用于每行距离上面的固定长度47.98
  let newHeight = 0;// 用于动态增加一行的长度
  let lastSize = 0;// 分页前的那个下标
  let lastheght = 2;
  let size = 10;
  let extendSize = 0;
  let table_hegth = (size + 1) * 25;
  let fonsize = 4;

  // 标题等
  LODOP.ADD_PRINT_TEXT('4.15mm', '1mm', '11mm', '5.37mm', '序号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '10mm', '25mm', '5.37mm', '订单日期');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '35mm', '25mm', '5.37mm', '订单号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '60mm', '25mm', '5.37mm', '排产单号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '85mm', '30mm', '5.37mm', '项目名称');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '115mm', '20mm', '5.37mm', '色号/旧料号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('1.55mm', '135mm', '9mm', '5.37mm', '订单数量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('1.55mm', '144mm', '9mm', '5.37mm', '计划数量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('1.55mm', '153mm', '9mm', '5.37mm', '完工数量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '162mm', '20mm', '5.37mm', '计划日期');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '182mm', '18mm', '5.37mm', '产品分类');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('1.55mm', '200mm', '9mm', '5.37mm', '生产设备');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '209mm', '25mm', '5.37mm', '生产类型');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '233mm', '16mm', '5.37mm', '生产状态');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '248mm', '20mm', '5.37mm', '备注');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  // 表格线
  LODOP.ADD_PRINT_LINE('1mm', '1mm', '1mm', '268.55mm', 0, 1);//  最上条标题横线
  LODOP.ADD_PRINT_LINE('9.31mm', '1mm', '9.31mm', '268.55mm', 0, 1);//  标题下横线
  LODOP.ADD_PRINT_LINE('1mm', '1mm', '9.11mm', '1mm', 0, 1);//  最左竖线
  // 添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
  LODOP.ADD_PRINT_LINE('1mm', '10mm', '9.11mm', '10mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '35mm', '9.11mm', '35mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '60mm', '9.11mm', '60mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '85mm', '9.11mm', '85mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '115mm', '9.11mm', '115mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '135mm', '9.11mm', '135mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '144mm', '9.11mm', '144mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '153mm', '9.11mm', '153mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '162mm', '9.11mm', '162mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '182mm', '9.11mm', '182mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '200mm', '9.11mm', '200mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '209mm', '9.11mm', '209mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '234mm', '9.11mm', '234mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '248mm', '9.11mm', '248mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '268mm', '9.11mm', '268mm', 0, 1);
  for (let k = 0; k < data.length; k++) {
    let allProductNumber = 0;
    let aaa = '1234567890';
    let bbb = '1234567890';
    let ccc = '1234567';
    newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
    let SizeTmpt = parseInt(getByteLen(aaa) / 35);
    if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(bbb) / 16);
    }
    if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(ccc) / 17);
    }
    if (fucCheckLength(data[k].color) > 16 || (data[k].soName == null ? '' : fucCheckLength(data[k].soName)) > 18) {
      if (fucCheckLength(data[k].color) > 26 || (data[k].soName == null ? '' : fucCheckLength(data[k].soName)) > 36) {
        if ((data[k].soName == null ? '' : fucCheckLength(data[k].soName)) > 54) {
          if ((data[k].soName == null ? '' : fucCheckLength(data[k].soName)) > 72) {
            LODOP.SET_PRINT_STYLE('FontSize', 8);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '11mm', '9mm', parseInt(1 + k));
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '10mm', '25mm', '12mm', data[k].soDate);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '35mm', '25mm', '12mm', data[k].soNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '60mm', '25mm', '12mm', data[k].taskNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '85mm', '30mm', '16mm', data[k].soName);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '115mm', '21mm', '16mm', data[k].color);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '135mm', '9mm', '12mm', data[k].odPrNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '144mm', '9mm', '12mm', data[k].allocatedNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '153mm', '9mm', '12mm', data[k].productionQuantity);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '162mm', '20mm', '12mm', data[k].productionDate);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '182mm', '18mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '200mm', '9mm', '12mm', data[k].plName);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '209mm', '25mm', '12mm', data[k].productionType);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '234mm', '16mm', '12mm', data[k].allocatedStatus);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '248mm', '20mm', '12mm', data[k].remark);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

            extendSize += SizeTmpt;
            newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 16 + 5.37 + 'mm', '1mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 16 + 5.37 + 'mm', '10mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '35mm', trheight + newHeight + 16 + 5.37 + 'mm', '35mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '60mm', trheight + newHeight + 16 + 5.37 + 'mm', '60mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '85mm', trheight + newHeight + 16 + 5.37 + 'mm', '85mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '115mm', trheight + newHeight + 16 + 5.37 + 'mm', '115mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '135mm', trheight + newHeight + 16 + 5.37 + 'mm', '135mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '144mm', trheight + newHeight + 16 + 5.37 + 'mm', '144mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '153mm', trheight + newHeight + 16 + 5.37 + 'mm', '153mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '162mm', trheight + newHeight + 16 + 5.37 + 'mm', '162mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '182mm', trheight + newHeight + 16 + 5.37 + 'mm', '182mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '200mm', trheight + newHeight + 16 + 5.37 + 'mm', '200mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '209mm', trheight + newHeight + 16 + 5.37 + 'mm', '209mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '234mm', trheight + newHeight + 16 + 5.37 + 'mm', '234mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '248mm', trheight + newHeight + 16 + 5.37 + 'mm', '248mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '268mm', trheight + newHeight + 16 + 5.37 + 'mm', '268mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + 16 + 'mm', '1mm', trheight + newHeight + 5.57 + 16 + 'mm', '268mm', 0, 1);// 每条数据后加一横线
            if ((trheight + newHeight + 5.57 + 8 + 7.6) >= 211) {
              LODOP.NewPage();
              thHeight = 11 - 5.37;
              lastSize = k;
              trheight = 9 - 5.37;
              extendSize = 0;
              newHeight = 0;
              // 标题等
              LODOP.ADD_PRINT_TEXT('4.15mm', '1mm', '11mm', '5.37mm', '序号');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '10mm', '25mm', '5.37mm', '订单日期');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '35mm', '25mm', '5.37mm', '订单号');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '60mm', '25mm', '5.37mm', '排产单号');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '85mm', '30mm', '5.37mm', '项目名称');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '115mm', '20mm', '5.37mm', '色号/旧料号');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('1.55mm', '135mm', '9mm', '5.37mm', '订单数量');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('1.55mm', '144mm', '9mm', '5.37mm', '计划数量');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('1.55mm', '153mm', '9mm', '5.37mm', '完工数量');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '162mm', '20mm', '5.37mm', '计划日期');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '182mm', '18mm', '5.37mm', '产品分类');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('1.55mm', '200mm', '9mm', '5.37mm', '生产设备');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '209mm', '25mm', '5.37mm', '生产类型');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '233mm', '16mm', '5.37mm', '生产状态');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '248mm', '20mm', '5.37mm', '备注');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              // 表格线
              LODOP.ADD_PRINT_LINE('1mm', '1mm', '1mm', '268.55mm', 0, 1);//  最上条标题横线
              LODOP.ADD_PRINT_LINE('9.31mm', '1mm', '9.31mm', '268.55mm', 0, 1);//  标题下横线
              LODOP.ADD_PRINT_LINE('1mm', '1mm', '9.11mm', '1mm', 0, 1);//  最左竖线
              // 添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
              LODOP.ADD_PRINT_LINE('1mm', '10mm', '9.11mm', '10mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '35mm', '9.11mm', '35mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '60mm', '9.11mm', '60mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '85mm', '9.11mm', '85mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '115mm', '9.11mm', '115mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '135mm', '9.11mm', '135mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '144mm', '9.11mm', '144mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '153mm', '9.11mm', '153mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '162mm', '9.11mm', '162mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '182mm', '9.11mm', '182mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '200mm', '9.11mm', '200mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '209mm', '9.11mm', '209mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '234mm', '9.11mm', '234mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '248mm', '9.11mm', '248mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '268mm', '9.11mm', '268mm', 0, 1);
            } else {
              trheight = trheight + 15.6
              thHeight = thHeight + 15.6
            }
          } else {
            LODOP.SET_PRINT_STYLE('FontSize', 8);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '11mm', '9mm', parseInt(1 + k));
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '10mm', '25mm', '12mm', data[k].soDate);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '35mm', '25mm', '12mm', data[k].soNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '60mm', '25mm', '12mm', data[k].taskNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '85mm', '30mm', '15mm', data[k].soName);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '115mm', '21mm', '12mm', data[k].color);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '135mm', '9mm', '12mm', data[k].odPrNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '144mm', '9mm', '12mm', data[k].allocatedNum);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '153mm', '9mm', '12mm', data[k].productionQuantity);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '162mm', '20mm', '12mm', data[k].productionDate);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '182mm', '18mm', '12mm', '');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '200mm', '9mm', '12mm', data[k].plName);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '209mm', '25mm', '12mm', data[k].productionType);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '234mm', '16mm', '12mm', data[k].allocatedStatus);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '248mm', '20mm', '12mm', data[k].remark);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

            extendSize += SizeTmpt;
            newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 12 + 5.37 + 'mm', '1mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 12 + 5.37 + 'mm', '10mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '35mm', trheight + newHeight + 12 + 5.37 + 'mm', '35mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '60mm', trheight + newHeight + 12 + 5.37 + 'mm', '60mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '85mm', trheight + newHeight + 12 + 5.37 + 'mm', '85mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '115mm', trheight + newHeight + 12 + 5.37 + 'mm', '115mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '135mm', trheight + newHeight + 12 + 5.37 + 'mm', '135mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '144mm', trheight + newHeight + 12 + 5.37 + 'mm', '144mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '153mm', trheight + newHeight + 12 + 5.37 + 'mm', '153mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '162mm', trheight + newHeight + 12 + 5.37 + 'mm', '162mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '182mm', trheight + newHeight + 12 + 5.37 + 'mm', '182mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '200mm', trheight + newHeight + 12 + 5.37 + 'mm', '200mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '209mm', trheight + newHeight + 12 + 5.37 + 'mm', '209mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '234mm', trheight + newHeight + 12 + 5.37 + 'mm', '234mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '248mm', trheight + newHeight + 12 + 5.37 + 'mm', '248mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '268mm', trheight + newHeight + 12 + 5.37 + 'mm', '268mm', 0, 1);//
            LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + 12 + 'mm', '1mm', trheight + newHeight + 5.57 + 12 + 'mm', '268mm', 0, 1);// 每条数据后加一横线
            if ((trheight + newHeight + 5.57 + 8 + 7.6) >= 211) {
              LODOP.NewPage();
              thHeight = 11 - 5.37;
              lastSize = k;
              trheight = 9 - 5.37;
              extendSize = 0;
              newHeight = 0;
              // 标题等
              LODOP.ADD_PRINT_TEXT('4.15mm', '1mm', '11mm', '5.37mm', '序号');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '10mm', '25mm', '5.37mm', '订单日期');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '35mm', '25mm', '5.37mm', '订单号');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '60mm', '25mm', '5.37mm', '排产单号');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '85mm', '30mm', '5.37mm', '项目名称');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '115mm', '20mm', '5.37mm', '色号/旧料号');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('1.55mm', '135mm', '9mm', '5.37mm', '订单数量');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('1.55mm', '144mm', '9mm', '5.37mm', '计划数量');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('1.55mm', '153mm', '9mm', '5.37mm', '完工数量');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '162mm', '20mm', '5.37mm', '计划日期');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '182mm', '18mm', '5.37mm', '产品分类');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('1.55mm', '200mm', '9mm', '5.37mm', '生产设备');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '209mm', '25mm', '5.37mm', '生产类型');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '233mm', '16mm', '5.37mm', '生产状态');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              LODOP.ADD_PRINT_TEXT('4.15mm', '248mm', '20mm', '5.37mm', '备注');
              LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
              // 表格线
              LODOP.ADD_PRINT_LINE('1mm', '1mm', '1mm', '268.55mm', 0, 1);//  最上条标题横线
              LODOP.ADD_PRINT_LINE('9.31mm', '1mm', '9.31mm', '268.55mm', 0, 1);//  标题下横线
              LODOP.ADD_PRINT_LINE('1mm', '1mm', '9.11mm', '1mm', 0, 1);//  最左竖线
              // 添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
              LODOP.ADD_PRINT_LINE('1mm', '10mm', '9.11mm', '10mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '35mm', '9.11mm', '35mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '60mm', '9.11mm', '60mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '85mm', '9.11mm', '85mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '115mm', '9.11mm', '115mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '135mm', '9.11mm', '135mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '144mm', '9.11mm', '144mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '153mm', '9.11mm', '153mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '162mm', '9.11mm', '162mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '182mm', '9.11mm', '182mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '200mm', '9.11mm', '200mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '209mm', '9.11mm', '209mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '234mm', '9.11mm', '234mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '248mm', '9.11mm', '248mm', 0, 1);
              LODOP.ADD_PRINT_LINE('1mm', '268mm', '9.11mm', '268mm', 0, 1);
            } else {
              trheight = trheight + 11.6
              thHeight = thHeight + 11.6
            }
          }
        } else {
          LODOP.SET_PRINT_STYLE('FontSize', 8);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '11mm', '9mm', parseInt(1 + k));
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '10mm', '25mm', '12mm', data[k].soDate);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '35mm', '25mm', '12mm', data[k].soNum);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '60mm', '25mm', '12mm', data[k].taskNum);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '85mm', '30mm', '12mm', data[k].soName);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '115mm', '21mm', '12mm', data[k].color);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '135mm', '9mm', '12mm', data[k].odPrNum);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '144mm', '9mm', '12mm', data[k].allocatedNum);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '153mm', '9mm', '12mm', data[k].productionQuantity);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '162mm', '20mm', '12mm', data[k].productionDate);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '182mm', '18mm', '12mm', '');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '200mm', '9mm', '12mm', data[k].plName);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '209mm', '25mm', '12mm', data[k].productionType);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '234mm', '16mm', '12mm', data[k].allocatedStatus);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '248mm', '20mm', '12mm', data[k].remark);
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

          extendSize += SizeTmpt;
          newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 8 + 5.37 + 'mm', '1mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 8 + 5.37 + 'mm', '10mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '35mm', trheight + newHeight + 8 + 5.37 + 'mm', '35mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '60mm', trheight + newHeight + 8 + 5.37 + 'mm', '60mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '85mm', trheight + newHeight + 8 + 5.37 + 'mm', '85mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '115mm', trheight + newHeight + 8 + 5.37 + 'mm', '115mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '135mm', trheight + newHeight + 8 + 5.37 + 'mm', '135mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '144mm', trheight + newHeight + 8 + 5.37 + 'mm', '144mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '153mm', trheight + newHeight + 8 + 5.37 + 'mm', '153mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '162mm', trheight + newHeight + 8 + 5.37 + 'mm', '162mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '182mm', trheight + newHeight + 8 + 5.37 + 'mm', '182mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '200mm', trheight + newHeight + 8 + 5.37 + 'mm', '200mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '209mm', trheight + newHeight + 8 + 5.37 + 'mm', '209mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '234mm', trheight + newHeight + 8 + 5.37 + 'mm', '234mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '248mm', trheight + newHeight + 8 + 5.37 + 'mm', '248mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '268mm', trheight + newHeight + 8 + 5.37 + 'mm', '268mm', 0, 1);//
          LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + 8 + 'mm', '1mm', trheight + newHeight + 5.57 + 8 + 'mm', '268mm', 0, 1);// 每条数据后加一横线
          if ((trheight + newHeight + 5.57 + 8 + 7.6) >= 211) {
            LODOP.NewPage();
            thHeight = 11 - 5.37;
            lastSize = k;
            trheight = 9 - 5.37;
            extendSize = 0;
            newHeight = 0;
            // 标题等
            LODOP.ADD_PRINT_TEXT('4.15mm', '1mm', '11mm', '5.37mm', '序号');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '10mm', '25mm', '5.37mm', '订单日期');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '35mm', '25mm', '5.37mm', '订单号');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '60mm', '25mm', '5.37mm', '排产单号');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '85mm', '30mm', '5.37mm', '项目名称');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '115mm', '20mm', '5.37mm', '色号/旧料号');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('1.55mm', '135mm', '9mm', '5.37mm', '订单数量');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('1.55mm', '144mm', '9mm', '5.37mm', '计划数量');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('1.55mm', '153mm', '9mm', '5.37mm', '完工数量');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '162mm', '20mm', '5.37mm', '计划日期');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '182mm', '18mm', '5.37mm', '产品分类');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('1.55mm', '200mm', '9mm', '5.37mm', '生产设备');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '209mm', '25mm', '5.37mm', '生产类型');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '233mm', '16mm', '5.37mm', '生产状态');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.ADD_PRINT_TEXT('4.15mm', '248mm', '20mm', '5.37mm', '备注');
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            // 表格线
            LODOP.ADD_PRINT_LINE('1mm', '1mm', '1mm', '268.55mm', 0, 1);//  最上条标题横线
            LODOP.ADD_PRINT_LINE('9.31mm', '1mm', '9.31mm', '268.55mm', 0, 1);//  标题下横线
            LODOP.ADD_PRINT_LINE('1mm', '1mm', '9.11mm', '1mm', 0, 1);//  最左竖线
            // 添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
            LODOP.ADD_PRINT_LINE('1mm', '10mm', '9.11mm', '10mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '35mm', '9.11mm', '35mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '60mm', '9.11mm', '60mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '85mm', '9.11mm', '85mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '115mm', '9.11mm', '115mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '135mm', '9.11mm', '135mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '144mm', '9.11mm', '144mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '153mm', '9.11mm', '153mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '162mm', '9.11mm', '162mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '182mm', '9.11mm', '182mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '200mm', '9.11mm', '200mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '209mm', '9.11mm', '209mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '234mm', '9.11mm', '234mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '248mm', '9.11mm', '248mm', 0, 1);
            LODOP.ADD_PRINT_LINE('1mm', '268mm', '9.11mm', '268mm', 0, 1);
          } else {
            trheight = trheight + 7.6
            thHeight = thHeight + 7.6
          }
        }
      } else {
        LODOP.SET_PRINT_STYLE('FontSize', 8);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '11mm', '9mm', parseInt(1 + k));
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '10mm', '25mm', '12mm', data[k].soDate);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '35mm', '25mm', '12mm', data[k].soNum);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '60mm', '25mm', '12mm', data[k].taskNum);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '85mm', '30mm', '12mm', data[k].soName);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '115mm', '21mm', '12mm', data[k].color);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '135mm', '9mm', '12mm', data[k].odPrNum);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '144mm', '9mm', '12mm', data[k].allocatedNum);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '153mm', '9mm', '12mm', data[k].productionQuantity);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '162mm', '20mm', '12mm', data[k].productionDate);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '182mm', '18mm', '12mm', '');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '200mm', '9mm', '12mm', data[k].plName);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '209mm', '25mm', '12mm', data[k].productionType);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '234mm', '16mm', '12mm', data[k].allocatedStatus);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '248mm', '20mm', '12mm', data[k].remark);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

        extendSize += SizeTmpt;
        newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 4 + 5.37 + 'mm', '1mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 4 + 5.37 + 'mm', '10mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '35mm', trheight + newHeight + 4 + 5.37 + 'mm', '35mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '60mm', trheight + newHeight + 4 + 5.37 + 'mm', '60mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '85mm', trheight + newHeight + 4 + 5.37 + 'mm', '85mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '115mm', trheight + newHeight + 4 + 5.37 + 'mm', '115mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '135mm', trheight + newHeight + 4 + 5.37 + 'mm', '135mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '144mm', trheight + newHeight + 4 + 5.37 + 'mm', '144mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '153mm', trheight + newHeight + 4 + 5.37 + 'mm', '153mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '162mm', trheight + newHeight + 4 + 5.37 + 'mm', '162mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '182mm', trheight + newHeight + 4 + 5.37 + 'mm', '182mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '200mm', trheight + newHeight + 4 + 5.37 + 'mm', '200mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '209mm', trheight + newHeight + 4 + 5.37 + 'mm', '209mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '234mm', trheight + newHeight + 4 + 5.37 + 'mm', '234mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '248mm', trheight + newHeight + 4 + 5.37 + 'mm', '248mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '268mm', trheight + newHeight + 4 + 5.37 + 'mm', '268mm', 0, 1);//
        LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + 4 + 'mm', '1mm', trheight + newHeight + 5.57 + 4 + 'mm', '268mm', 0, 1);// 每条数据后加一横线
        if ((trheight + newHeight + 5.57 + 8 + 7.6) >= 211) {
          LODOP.NewPage();
          thHeight = 11 - 5.37;
          lastSize = k;
          trheight = 9 - 5.37;
          extendSize = 0;
          newHeight = 0;
          // 标题等
          LODOP.ADD_PRINT_TEXT('4.15mm', '1mm', '11mm', '5.37mm', '序号');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '10mm', '25mm', '5.37mm', '订单日期');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '35mm', '25mm', '5.37mm', '订单号');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '60mm', '25mm', '5.37mm', '排产单号');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '85mm', '30mm', '5.37mm', '项目名称');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '115mm', '20mm', '5.37mm', '色号/旧料号');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('1.55mm', '135mm', '9mm', '5.37mm', '订单数量');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('1.55mm', '144mm', '9mm', '5.37mm', '计划数量');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('1.55mm', '153mm', '9mm', '5.37mm', '完工数量');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '162mm', '20mm', '5.37mm', '计划日期');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '182mm', '18mm', '5.37mm', '产品分类');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('1.55mm', '200mm', '9mm', '5.37mm', '生产设备');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '209mm', '25mm', '5.37mm', '生产类型');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '233mm', '16mm', '5.37mm', '生产状态');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          LODOP.ADD_PRINT_TEXT('4.15mm', '248mm', '20mm', '5.37mm', '备注');
          LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
          // 表格线
          LODOP.ADD_PRINT_LINE('1mm', '1mm', '1mm', '268.55mm', 0, 1);//  最上条标题横线
          LODOP.ADD_PRINT_LINE('9.31mm', '1mm', '9.31mm', '268.55mm', 0, 1);//  标题下横线
          LODOP.ADD_PRINT_LINE('1mm', '1mm', '9.11mm', '1mm', 0, 1);//  最左竖线
          // 添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
          LODOP.ADD_PRINT_LINE('1mm', '10mm', '9.11mm', '10mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '35mm', '9.11mm', '35mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '60mm', '9.11mm', '60mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '85mm', '9.11mm', '85mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '115mm', '9.11mm', '115mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '135mm', '9.11mm', '135mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '144mm', '9.11mm', '144mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '153mm', '9.11mm', '153mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '162mm', '9.11mm', '162mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '182mm', '9.11mm', '182mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '200mm', '9.11mm', '200mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '209mm', '9.11mm', '209mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '234mm', '9.11mm', '234mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '248mm', '9.11mm', '248mm', 0, 1);
          LODOP.ADD_PRINT_LINE('1mm', '268mm', '9.11mm', '268mm', 0, 1);
        } else {
          trheight = trheight + 3.6
          thHeight = thHeight + 3.6
        }
      }
    } else {
      LODOP.SET_PRINT_STYLE('FontSize', 8);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '11mm', '9mm', parseInt(1 + k));
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '10mm', '25mm', '12mm', data[k].soDate);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '35mm', '25mm', '12mm', data[k].soNum);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '60mm', '25mm', '12mm', data[k].taskNum);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '85mm', '30mm', '12mm', data[k].soName);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '115mm', '21mm', '12mm', data[k].color);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '135mm', '9mm', '12mm', data[k].odPrNum);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '144mm', '9mm', '12mm', data[k].allocatedNum);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '153mm', '9mm', '12mm', data[k].productionQuantity);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '162mm', '20mm', '12mm', data[k].productionDate);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '182mm', '18mm', '12mm', '');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '200mm', '9mm', '12mm', data[k].plName);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '209mm', '25mm', '12mm', data[k].productionType);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '234mm', '16mm', '12mm', data[k].allocatedStatus);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '248mm', '20mm', '12mm', data[k].remark);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      extendSize += SizeTmpt;
      newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 5.37 + 'mm', '1mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 5.37 + 'mm', '10mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '35mm', trheight + newHeight + 5.37 + 'mm', '35mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '60mm', trheight + newHeight + 5.37 + 'mm', '60mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '85mm', trheight + newHeight + 5.37 + 'mm', '85mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '115mm', trheight + newHeight + 5.37 + 'mm', '115mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '135mm', trheight + newHeight + 5.37 + 'mm', '135mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '144mm', trheight + newHeight + 5.37 + 'mm', '144mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '153mm', trheight + newHeight + 5.37 + 'mm', '153mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '162mm', trheight + newHeight + 5.37 + 'mm', '162mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '182mm', trheight + newHeight + 5.37 + 'mm', '182mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '200mm', trheight + newHeight + 5.37 + 'mm', '200mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '209mm', trheight + newHeight + 5.37 + 'mm', '209mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '234mm', trheight + newHeight + 5.37 + 'mm', '234mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '248mm', trheight + newHeight + 5.37 + 'mm', '248mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '268mm', trheight + newHeight + 5.37 + 'mm', '268mm', 0, 1);//
      LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + 'mm', '1mm', trheight + newHeight + 5.57 + 'mm', '268mm', 0, 1);// 每条数据后加一横线
      if ((trheight + newHeight + 5.57 + 8 + 7.6) >= 211) {
        LODOP.NewPage();
        thHeight = 11 - 5.37;
        lastSize = k;
        trheight = 9 - 5.37;
        extendSize = 0;
        newHeight = 0;
        // 标题等
        LODOP.ADD_PRINT_TEXT('4.15mm', '1mm', '11mm', '5.37mm', '序号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '10mm', '25mm', '5.37mm', '订单日期');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '35mm', '25mm', '5.37mm', '订单号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '60mm', '25mm', '5.37mm', '排产单号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '85mm', '30mm', '5.37mm', '项目名称');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '115mm', '20mm', '5.37mm', '色号/旧料号');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('1.55mm', '135mm', '9mm', '5.37mm', '订单数量');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('1.55mm', '144mm', '9mm', '5.37mm', '计划数量');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('1.55mm', '153mm', '9mm', '5.37mm', '完工数量');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '162mm', '20mm', '5.37mm', '计划日期');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '182mm', '18mm', '5.37mm', '产品分类');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('1.55mm', '200mm', '9mm', '5.37mm', '生产设备');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '209mm', '25mm', '5.37mm', '生产类型');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '233mm', '16mm', '5.37mm', '生产状态');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.ADD_PRINT_TEXT('4.15mm', '248mm', '20mm', '5.37mm', '备注');
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        // 表格线
        LODOP.ADD_PRINT_LINE('1mm', '1mm', '1mm', '268.55mm', 0, 1);//  最上条标题横线
        LODOP.ADD_PRINT_LINE('9.31mm', '1mm', '9.31mm', '268.55mm', 0, 1);//  标题下横线
        LODOP.ADD_PRINT_LINE('1mm', '1mm', '9.11mm', '1mm', 0, 1);//  最左竖线
        // 添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
        LODOP.ADD_PRINT_LINE('1mm', '10mm', '9.11mm', '10mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '35mm', '9.11mm', '35mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '60mm', '9.11mm', '60mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '85mm', '9.11mm', '85mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '115mm', '9.11mm', '115mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '135mm', '9.11mm', '135mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '144mm', '9.11mm', '144mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '153mm', '9.11mm', '153mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '162mm', '9.11mm', '162mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '182mm', '9.11mm', '182mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '200mm', '9.11mm', '200mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '209mm', '9.11mm', '209mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '234mm', '9.11mm', '234mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '248mm', '9.11mm', '248mm', 0, 1);
        LODOP.ADD_PRINT_LINE('1mm', '268mm', '9.11mm', '268mm', 0, 1);
      }
    }
  }
}
//  半成品排产信息
const PrintSemi = (data, codetype, url, code) => {
  console.log(data)

  function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) {
        // 全角
        len += 2;
      } else {
        len += 1;
      }

    }
    return len;
  }

  let fenyeSize = 0;
  let num = 2
  LODOP.SET_PRINT_PAGESIZE(0, '210mm', '297mm', 'A4');// 一开始用的是像素，后来都改成用mm为单位
  LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1);
  LODOP.SET_PRINT_STYLEA(0, 'AngleOfPageInside', 90);
  // 动态列表信息
  let trheight = 13.5;// 用于每个竖线距离上面的固定长度
  let thHeight = 15;// 用于每行距离上面的固定长度47.98
  let newHeight = 0;// 用于动态增加一行的长度
  let lastSize = 0;// 分页前的那个下标
  let lastheght = 2;
  let size = 10;
  let extendSize = 0;
  let table_hegth = (size + 1) * 25;
  let fonsize = 4;
  console.log(data[0])
  for (var i in data) {
    // 标题等
    LODOP.ADD_PRINT_TEXT('6.15mm', '1mm', '11mm', '5.37mm', '序号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('3.15mm', '10mm', '16mm', '5.37mm', '计划日期');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '10mm', '16mm', '5.37mm', '生产设备');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('3.15mm', '25mm', '80mm', '5.37mm', data[i].productionDate0);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '25mm', '40mm', '5.37mm', '旧料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '65mm', '10mm', '5.37mm', '数量');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '75mm', '16mm', '5.37mm', '生产状态');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '90mm', '16mm', '5.37mm', '任务警示');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

    LODOP.ADD_PRINT_TEXT('3.15mm', '105mm', '80mm', '5.37mm', data[i].productionDate1);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '105mm', '40mm', '5.37mm', '旧料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '145mm', '10mm', '5.37mm', '数量');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '155mm', '16mm', '5.37mm', '生产状态');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '170mm', '16mm', '5.37mm', '任务警示');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

    LODOP.ADD_PRINT_TEXT('3.15mm', '185mm', '80mm', '5.37mm', data[i].productionDate2);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '185mm', '40mm', '5.37mm', '旧料号');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '225mm', '10mm', '5.37mm', '数量');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '235mm', '16mm', '5.37mm', '生产状态');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT('9.15mm', '250mm', '16mm', '5.37mm', '任务警示');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  }

  //  表格线
  LODOP.ADD_PRINT_LINE('1mm', '1mm', '1mm', '265mm.55mm', 0, 1);//  最上条标题横线
  LODOP.ADD_PRINT_LINE('7.31mm', '10mm', '7.31mm', '265mm.55mm', 0, 1);//  标题下横线1
  LODOP.ADD_PRINT_LINE('13.62mm', '1mm', '13.62mm', '265mm.55mm', 0, 1);//  标题下横线2
  LODOP.ADD_PRINT_LINE('1mm', '1mm', '13.62mm', '1mm', 0, 1);//  最左竖线
  //  添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
  LODOP.ADD_PRINT_LINE('1mm', '10mm', '13.11mm', '10mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '25mm', '13.11mm', '25mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '65mm', '13.11mm', '65mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '75mm', '13.11mm', '75mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '90mm', '13.11mm', '90mm', 0, 1);

  LODOP.ADD_PRINT_LINE('1mm', '105mm', '13.11mm', '105mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '145mm', '13.11mm', '145mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '155mm', '13.11mm', '155mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '170mm', '13.11mm', '170mm', 0, 1);

  LODOP.ADD_PRINT_LINE('1mm', '185mm', '13.11mm', '185mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '225mm', '13.11mm', '225mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '235mm', '13.11mm', '235mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '250mm', '13.11mm', '250mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '265mm', '13.22mm', '265mm', 0, 1);
  for (let k = 0; k < data.length; k++) {
    let allProductNumber = 0;
    let aaa = '1234567890';
    let bbb = '1234567890';
    let ccc = '1234567';
    newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
    let SizeTmpt = parseInt(getByteLen(aaa) / 35);
    if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(bbb) / 16);
    }
    if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(ccc) / 17);
    }

    LODOP.SET_PRINT_STYLE('FontSize', 7);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '11mm', '9mm', parseInt(1 + k));
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '10mm', '16mm', '12mm', data[k].plName);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '25mm', '43mm', '12mm', data[k].oldCode0);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '65mm', '10mm', '12mm', data[k].allocatedNum0);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '75mm', '16mm', '12mm', data[k].allocatedStatus0);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    if (data[k].alertStatus0 == 1) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '90mm', '16mm', '12mm', '延误');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    } else if (data[k].alertStatus0 == 3) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '90mm', '16mm', '12mm', '加急');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    } else if (data[k].alertStatus0 == 4) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '90mm', '16mm', '12mm', '暂停');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    } else if (data[k].alertStatus0 == 0) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '90mm', '16mm', '12mm', '正常');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    }

    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '105mm', '43mm', '12mm', data[k].oldCode1);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '145mm', '10mm', '12mm', data[k].allocatedNum1);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '155mm', '16mm', '12mm', data[k].allocatedStatus1);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    if (data[k].alertStatus1 == 1) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '170mm', '16mm', '12mm', '延误');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    } else if (data[k].alertStatus1 == 3) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '170mm', '16mm', '12mm', '加急');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    } else if (data[k].alertStatus1 == 4) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '170mm', '16mm', '12mm', '暂停');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    } else if (data[k].alertStatus1 == 0) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '170mm', '16mm', '12mm', '正常');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    }
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '185mm', '43mm', '12mm', data[k].oldCode2);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '225mm', '10mm', '12mm', data[k].allocatedNum2);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '235mm', '16mm', '12mm', data[k].allocatedStatus2);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    if (data[k].alertStatus2 == 1) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '250mm', '16mm', '12mm', '延误');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    } else if (data[k].alertStatus2 == 3) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '250mm', '16mm', '12mm', '加急');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    } else if (data[k].alertStatus2 == 4) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '250mm', '16mm', '12mm', '暂停');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    } else if (data[k].alertStatus2 == 0) {
      LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '250mm', '16mm', '12mm', '正常');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    }
    extendSize += SizeTmpt;
    newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
    if (k == lastSize + 1 && k != 1) {
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight - SizeTmpt * fonsize + 'mm', '265mm', 0, 1);// 每条数据后加一横线
    }
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 5.37 + 'mm', '1mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 5.37 + 'mm', '10mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '25mm', trheight + newHeight + 5.37 + 'mm', '25mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '65mm', trheight + newHeight + 5.37 + 'mm', '65mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '75mm', trheight + newHeight + 5.37 + 'mm', '75mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '90mm', trheight + newHeight + 5.37 + 'mm', '90mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '105mm', trheight + newHeight + 5.37 + 'mm', '105mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '145mm', trheight + newHeight + 5.37 + 'mm', '145mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '155mm', trheight + newHeight + 5.37 + 'mm', '155mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '170mm', trheight + newHeight + 5.37 + 'mm', '170mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '185mm', trheight + newHeight + 5.37 + 'mm', '185mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '225mm', trheight + newHeight + 5.37 + 'mm', '225mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '235mm', trheight + newHeight + 5.37 + 'mm', '235mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '250mm', trheight + newHeight + 5.37 + 'mm', '250mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '265mm', trheight + newHeight + 5.37 + 'mm', '265mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + 'mm', '1mm', trheight + newHeight + 5.57 + 'mm', '265mm', 0, 1);// 每条数据后加一横线

    if ((trheight + newHeight + 5.57) % fenyeSize <= fenyeSize && (trheight + 5.57 + newHeight) % fenyeSize >= (fenyeSize - 15)) {
      LODOP.NewPage();
      thHeight = 0.67;
      lastSize = k;
      trheight = 0;
      extendSize = 0;
    }
    table_hegth = trheight + newHeight + 5.57;
    //  最下显示订单信息
    let moneyWeight = 0;
    if ((lastheght + table_hegth + 5) % fenyeSize <= fenyeSize && (lastheght + table_hegth + 5) % fenyeSize >= (fenyeSize - 6)) {
      LODOP.NewPage();
      lastheght = 0;
      table_hegth = 0;
    }
  }
}
const PrintStorage = (data, codetype, url, code) => {
  for (var i = 0; i < data.length; i++) { // 每页最多打印六条
    // 左边栏
    let qrAccount = data[i].barcode
    console.log(qrAccount)
    LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);
    LODOP.ADD_PRINT_BARCODE('1mm', '2mm', '68mm', '68mm', 'QRCode', qrAccount)
    LODOP.ADD_PRINT_TEXT('72mm', '0mm', '70mm', '8mm', data[i].piCode);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 40);
    LODOP.SET_PRINT_PAGESIZE(2, '100mm', '70mm');
    // 分页
    LODOP.NewPage();
  }
}
export {
  PrintAccount,
  PrintTwo1,
  PrintTwo2,
  PrintTwo3,
  PrintTwo4,
  PrintThree,
  PrintSchedule,
  PrintSemi,
  PrintStorage,
  PrintFour
}
