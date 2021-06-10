psiInfo = "";

function loadFileToElement(filename)
{
  var xmlHTTP = new XMLHttpRequest();
  try
  {
  xmlHTTP.open("GET", filename, false);
  xmlHTTP.send(null);
}
  catch (e) {
      window.alert("Unable to load the requested file.");
      return;
  }
  psiInfo = xmlHTTP.responseText;
}
loadFileToElement("./DataBase/getPisInfo.xml");
var nofPL = (psiInfo.split("<ISTL_LCTN_ADDR>")).length - 1;//주차장 수
var psiInfoarr = [];

for(var i = 1; i <= nofPL; i++){
  psiInfoarr[0] = (psiInfo.split("<ISTL_LCTN_ADDR>")[i]).split("</ISTL_LCTN_ADDR>")[0]; // 주소
  psiInfoarr[1] = (psiInfo.split("<GNRL_RMND_PRZN_NUM>")[i]).split("</GNRL_RMND_PRZN_NUM>")[0]; // 일반주차
  psiInfoarr[2] = (psiInfo.split("<HNDC_RMND_PRZN_NUM>")[i]).split("</HNDC_RMND_PRZN_NUM>")[0]; // 장애인 주차
  psiInfoarr[3] = (psiInfo.split("<HVVH_RMND_PRZN_NUM>")[i]).split("</HVVH_RMND_PRZN_NUM>")[0]; // 대형 주차
  psiInfoarr[4] = (psiInfo.split("<LGVH_RMND_PRZN_NUM>")[i]).split("</LGVH_RMND_PRZN_NUM>")[0]; // 경차 주차
  psiInfoarr[5] = (psiInfo.split("<WMON_RMND_PRZN_NUM>")[i]).split("</WMON_RMND_PRZN_NUM>")[0]; // 여성 주차
  //alert(psiInfoarr[0]);
  setRealTimeLoc(psiInfoarr[0], psiInfoarr[1], psiInfoarr[2], psiInfoarr[3], psiInfoarr[4], psiInfoarr[5]);
}
