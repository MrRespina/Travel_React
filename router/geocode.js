const express = require("express");
const router = express.Router();
const path = require("path");
const { First, Plan, Category, DraftView } = require("../models"); // 모델 파일의 경로
let  createdRecord ;
const apiKey = "AIzaSyAWPWJFuzQtmuoZqrStOHb_aRWdavmolR0"; // 여기에 구글 맵스 API 키 입력

// GET 요청을 처리하는 핸들러
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "mainpage.html"));
});

// POST 요청을 처리하는 핸들러
router.post("/", async (req, res) => {
  let geocodeJson = req.body;

  geocodeJson.apiKey = apiKey;
  console.log("API Key : " + geocodeJson.apiKey);
  console.log("lat : " + geocodeJson.lat);
  console.log("lng : " + geocodeJson.lng);
  console.log("=====================");

  // 데이터베이스에 새로운 레코드 생성하기
    createdRecord = await First.create({
      name: geocodeJson.name,
      lat: geocodeJson.lat,
      lng: geocodeJson.lng,
      start_day: geocodeJson.start_day,
      end_day: geocodeJson.end_day,
      search: geocodeJson.search,
    });

});

module.exports = router;
