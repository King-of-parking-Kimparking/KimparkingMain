ariportParking = "";

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
  ariportParking = xmlHTTP.responseText;
}
loadFileToElement("./DataBase/airportparkingRT.xml");

var result1 = document.getElementById("result1");
var result2 = document.getElementById("result2");
var placeName = ["여객", "화물"];

var i = 1;
var nFull = parseInt((ariportParking.split("<parkingFullSpace>")[i]).split("</parkingFullSpace>")[0]); // 전체 주차 공간 수
var nParked = parseInt((ariportParking.split("<parkingIstay>")[i]).split("</parkingIstay>")[0]); // 주차된 공간 수
result1.innerHTML += placeName[i-1] +"<br>전체 주차 수: "+nFull+"<br>잔여 주차장 수:" + (nFull - nParked) + "<br><br>";
i = 2;
var nFull = parseInt((ariportParking.split("<parkingFullSpace>")[i]).split("</parkingFullSpace>")[0]); // 전체 주차 공간 수
var nParked = parseInt((ariportParking.split("<parkingIstay>")[i]).split("</parkingIstay>")[0]); // 주차된 공간 수
result2.innerHTML += placeName[i-1] +"<br>전체 주차 수: "+nFull+"<br>잔여 주차장 수:" + (nFull - nParked) + "<br><br>";
