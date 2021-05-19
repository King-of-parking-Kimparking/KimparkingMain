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

function setLocation(){
  var locVal = document.getElementById("locInput").value;
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
        alert("검색정보 없음! 주소로 다시 입력해주세요! \nex)제주시 연동, 이도일동")
      }
  });
}
