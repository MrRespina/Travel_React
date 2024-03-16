// 오른쪽 nav bar 초기 상태
document.getElementById("locationDaysBtn").style.backgroundColor =
  "rgb(229 231 235)";
document.getElementById("locationDaysBtn").style.color = "black";
document.getElementById("searchMainBtn").style.backgroundColor =
  "rgb(229 231 235)";
document.getElementById("searchMainBtn").style.color = "black";
document.getElementById("locationLodgingBtn").style.backgroundColor =
  "rgb(229 231 235)";
document.getElementById("locationLodgingBtn").style.color = "black";
document.getElementById("locationAttractionBtn").style.backgroundColor =
  "rgb(229 231 235)";
document.getElementById("locationAttractionBtn").style.color = "black";
document.getElementById("locationConvBtn").style.backgroundColor =
  "rgb(229 231 235)";
document.getElementById("locationConvBtn").style.color = "black";

// 버튼 클릭 에 대한 이벤트
// **************** 날짜 확인 ****************
document
  .getElementById("locationDaysBtn")
  .addEventListener("click", function () {
    // 날짜확인 HTML 파일을 가져와서 표시
    loadDaysContent();

    var button = this;
    var originalColor = button.style.backgroundColor;
    var newColor = '#3f83f8';
    button.style.backgroundColor = newColor;

    setTimeout(function() {
        button.style.backgroundColor = originalColor;
    }, 150); 
  });

// 날짜확인 HTML을 가져와서 표시하는 함수
function loadDaysContent() {
  fetch("/days")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("formContent").innerHTML = html;
      console.log("data : " + data);

    })
    .catch((error) => console.error("Error fetching daysConfirm.html:", error));
}

// **************** 검 색 ****************
document.getElementById("searchMainBtn").addEventListener("click", function () {
  window.location.href = "/search/lodging";

  document.getElementById("searchMainBtn").style.backgroundColor = "#3F83F8";
  document.getElementById("searchMainBtn").style.color = "white";
});

// **************** 장소 선택 ****************
document
  .getElementById("locationAttractionBtn")
  .addEventListener("click", function () {
    window.location.href = "http://localhost:8081/place/startLocation";
  });

// **************** 숙소 선택 ****************
document
  .getElementById("locationLodgingBtn")
  .addEventListener("click", function () {
    window.location.href = "http://localhost:8081/place/startLodging";
  });

// **************** 편의 시설 ****************
document
  .getElementById("locationConvBtn")
  .addEventListener("click", function () {
    window.location.href = "http://localhost:8081/search/conv";
  });

// **************** 일정 생성 ****************
document
  .getElementById("locationSaveBtn")
  .addEventListener("click", function () {
    window.location.href = "/save";
  });

function sendMessageToParent() {
  var message = document.getElementById("location").value;
  window.parent.postMessage(message, "*");
}

// h2 요소의 내용 설정
if (inputName != null) {
  document.getElementById("searchURL").innerText = inputName;
}

// **************** 첫 화면 로드 ****************
// attractionContent.html 파일을 로드합니다.
fetch("/lodgingContent")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("attractionContent").innerHTML = html;

    // 좌측 버튼
  })
  .catch((error) =>
    console.error("Error fetching attractionContent.html:", error)
  );

// **************** 오른쪽 뷰  ****************

// 저장 버튼 클릭 시
document
  .getElementById("locationSaveBtn")
  .addEventListener("click", function () {
    // 직접검색 HTML 파일을 가져와서 표시
    loadDirectSearchContent();
  });

// DraftView HTML을 가져와서 표시하는 함수
function loadSaveContent() {
  fetch("/search/temp")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("Temp").innerHTML = html;
    })
    .catch((error) => console.error("Error fetching new.html:", error));
}
