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
var parkLoc = ["제주특별자치도 제주시 중앙로 235", "제주특별자치도 제주시 중앙로 217", "제주특별자치도 제주시 인다14길 34", "제주특별자치도 제주시 인다14길 25", "제주특별자치도 제주시 인다14길 30", "제주특별자치도 제주시 인다14길 20","제주특별자치도 제주시 인다13길 28", "제주특별자치도 제주시 인다13길 34", "제주특별자치도 제주시 인다4길 25-8", "제주특별자치도 제주시 인다2길 67"];
var parkMarkers = [];
for(var i = 0; i < parkLoc.length; i++){
  setParkLoc(parkLoc[i]);
}

function setLocation(locVal){
  geocoder.addressSearch(locVal, function(result, status) {

      // 정상적으로 검색이 완료됐으면
       if (status === kakao.maps.services.Status.OK) {
          map.setLevel(5); // 지도의 레벨 변경
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          var markerImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
          var imageSize = new kakao.maps.Size(24, 35);

          // 마커이미지와 마커를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;">주차장 검색 위치</div>'
          });
          infowindow.open(map, marker);

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

function setParkLoc(locVal){
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
          var infowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;">' + locVal + '</div>'
          });
          infowindow.open(map, marker);
          kakao.maps.event.addListener(marker, 'click', function() { // 마커 이벤트 등록
            // 마커 위에 인포윈도우를 표시합니다
            window.open("./htmlFolder/test.html?value="+encodeURI(encodeURIComponent(locVal)));
          });
          parkMarkers.push(marker);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      }
      else{
      }
  });
}
