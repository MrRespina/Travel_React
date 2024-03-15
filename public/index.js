/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-nocheck TODO remove when fixed
let map;
let marker;
let geocoder;
let responseDiv;
let response;

const urlParams = new URLSearchParams(window.location.search);
let inputName = urlParams.get("name"); // 'name'은 폼 필드의 이름입니다.
const inputStartDay = urlParams.get("start_day"); 
const inputEndDay = urlParams.get("end_day"); 
let inputSearch = urlParams.get("search"); 

console.log("inputName : " + inputName);
if (inputName === null) {
  fetch('/first')
    .then(response => response.json())
    .then(data => {
      console.log("들어왔음!!!!!!!!!" + data.name);
      inputName = data.name;
      // fetch로 데이터를 받은 후에 initMap() 함수 호출
      initMap();
    })
    .catch(error => console.error('Error:', error));
} else {
  // inputName이 이미 있는 경우에는 그대로 initMap() 호출
  initMap();
}

function initMap() {
  console.log("순서확인 1");
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: {
      lat: -34.397,
      lng: 150.644,
    },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();

  const inputText = document.createElement("input");

  inputText.type = "text";

  inputText.value = inputName;

  // 하단에 json파일로 좌표정보 나오게하는 부분
  response = document.createElement("pre");
  response.id = "response";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  marker = new google.maps.Marker({
    map,
  });
  
  geocode({ address: inputText.value });
  clear();
}

function clear() {
  marker.setMap(null);
  responseDiv.style.display = "none";
}

function geocode(request) {
  console.log("순서확인 3");
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);

      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      responseDiv.style.display = "block";
      response.innerText = JSON.stringify(result, null, 2);

      // 지도의 줌단계를 12레벨로 맞춤
      map.setZoom(12);

      // 검색된 주소의 첫번째 위치(문서상 정중앙 위치)의 JSON파일 가져오기
      const firstResult = result.results[0];

      // JSON파일중 위도,경도,지역이름 가져오기
      let name = firstResult.address_components[0].long_name;
      let lat = firstResult.geometry.location.lat;
      let lng = firstResult.geometry.location.lng;
      
      // 위도경도의 경우 함수형으로 선언되었기 때문에 값을 외부로 빼냄
      lat = lat();
      lng = lng();
      start_day = inputStartDay;
      end_day = inputEndDay;
      search = inputName;

      // POST 방식으로 /geocode쪽으로 데이터를 보냄
      fetch("http://localhost:3001/geocode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lat, lng, start_day, end_day, search}),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));

      return results;
    })
    .catch((e) => {
      // alert("Geocode was not successful for the following reason: " + e);
    });
}
console.log("순서확인 4");
window.initMap = initMap;
