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
export {
  PrintAccount
}
