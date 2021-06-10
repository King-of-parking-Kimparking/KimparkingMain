var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 9 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다

function setLocWrapper(){
  var locVal = document.getElementById("locInput").value;
  setLocation(locVal);
}

// 로케이션 자동추가하기

var parkMarkers = [];
var mainMarker;
var mainInfowindow;

function setLocation(locVal){
  geocoder.addressSearch(locVal, function(result, status) {
      // 정상적으로 검색이 완료됐으면
       if (status === kakao.maps.services.Status.OK) {
          if(mainMarker != null){
            mainInfowindow.close();
            mainMarker.setMap(null); // 기존마커삭제
          }
          map.setLevel(5); // 지도의 레벨 변경
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          var markerImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
          var imageSize = new kakao.maps.Size(24, 35);

          // 마커이미지와 마커를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);
          // 결과값으로 받은 위치를 마커로 표시합니다
          mainMarker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          mainInfowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;color: black;">주차장 검색 위치</div>'
          });
          mainInfowindow.open(map, mainMarker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
      }
      else{
        alert("검색정보 없음! 주소로 다시 입력해주세요! \nex)제주시 연동, 이도일동");
      }
  });
}

function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;
}

function setParkLoc(locVal, startTime, endTime, parkData){
  geocoder.addressSearch(locVal, function(result, status) {

      // 정상적으로 검색이 완료됐으면
       if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';


          var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 72),
                spriteSize: new kakao.maps.Size(36, 98)
            };

          // 마커이미지와 마커를 생성합니다
          var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage,
              clickable: true
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow;
          if(startTime == "0:00" && endTime == "0:00"){
            infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;color: black;">' + '시간제한 없음' + '</div>'
            });
          }
          else {
            infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;color: black;">' + '시작시간: ' + startTime + '<br>종료시간: ' + endTime + '</div>'
            });
          }

          //infowindow.open(map, marker);
          kakao.maps.event.addListener(marker, 'mouseover', function() {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              infowindow.open(map, marker);
          });

          // 마커에 마우스아웃 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'mouseout', function() {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              infowindow.close();
          });

          kakao.maps.event.addListener(marker, 'click', function() { // 마커 이벤트 등록
            // 마커 위에 인포윈도우를 표시합니다
            var tempStr = "";
            for(var i = 0; i < parkData.length; i++)
              tempStr += parkData[i] + "$";
            //alert(tempStr);
            window.open("./htmlFolder/test.html?value="+encodeURI(encodeURIComponent(tempStr)));
          });
          parkMarkers.push(marker);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      }
      else{
      }
  });
}


function setPaidParkLoc(locVal, startTime, endTime, parkData){
  geocoder.addressSearch(locVal, function(result, status) {

      // 정상적으로 검색이 완료됐으면
       if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var markerImageSrc = './img/bitCoin2.png';


          var imageSize = new kakao.maps.Size(24, 23),
            imageOptions = {
                offset: new kakao.maps.Point(12, 23)
            };

          // 마커이미지와 마커를 생성합니다
          var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage,
              clickable: true
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow;
          if(startTime == "0:00" && endTime == "0:00"){
            infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;color: black;">' + '시간제한 없음' + '</div>'
            });
          }
          else {
            infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;color: black;">' + '시작시간: ' + startTime + '<br>종료시간: ' + endTime + '</div>'
            });
          }

          //infowindow.open(map, marker);
          kakao.maps.event.addListener(marker, 'mouseover', function() {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              infowindow.open(map, marker);
          });

          // 마커에 마우스아웃 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'mouseout', function() {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              infowindow.close();
          });

          kakao.maps.event.addListener(marker, 'click', function() { // 마커 이벤트 등록
            // 마커 위에 인포윈도우를 표시합니다
            var tempStr = "";
            for(var i = 0; i < parkData.length; i++)
              tempStr += parkData[i] + "$";
            //alert(tempStr);
            window.open("./htmlFolder/test.html?value="+encodeURI(encodeURIComponent(tempStr)));
          });
          parkMarkers.push(marker);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      }
      else{
      }
  });
}


function setRealTimeLoc(locVal, parkInfo1, parkInfo2, parkInfo3, parkInfo4, parkInfo5){
  geocoder.addressSearch(locVal, function(result, status) {

      // 정상적으로 검색이 완료됐으면
       if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var markerImageSrc = './img/live.png';


          var imageSize = new kakao.maps.Size(40, 22),
            imageOptions = {
                offset: new kakao.maps.Point(20, 22)
            };

          // 마커이미지와 마커를 생성합니다
          var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage,
              clickable: true
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow;
          infowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;color: black;">' + '잔여 주차공간'+ parkInfo1 + '</div>'
          });

          //infowindow.open(map, marker);
          kakao.maps.event.addListener(marker, 'mouseover', function() {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              infowindow.open(map, marker);
          });

          // 마커에 마우스아웃 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'mouseout', function() {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              infowindow.close();
          });

          kakao.maps.event.addListener(marker, 'click', function() { // 마커 이벤트 등록
            // 마커 위에 인포윈도우를 표시합니다
            var tempStr = "";

            tempStr = locVal+"$"+parkInfo1 + "$"+parkInfo2 + "$"+parkInfo3 + "$"+parkInfo4 + "$"+parkInfo5 + "$";
            //alert(tempStr);
            window.open("./htmlFolder/test2.html?value="+encodeURI(encodeURIComponent(tempStr)));

          });

          parkMarkers.push(marker);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      }
      else{
      }
  });
}


function button1_click(){
  //alert("buttonClicked");
  if (navigator.geolocation) {

      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {

          var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도

          var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              message = '<div style="padding:5px;color: black;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

          // 마커와 인포윈도우를 표시합니다
          map.setLevel(5); // 지도의 레벨 변경s
          displayMarker(locPosition, message);

        });

  } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
          message = 'geolocation을 사용할수 없어요..'

      displayMarker(locPosition, message);
  }
}

function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}
