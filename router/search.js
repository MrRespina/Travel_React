const express = require("express");
const router = express.Router();
const fetch = require('esm')(module)('node-fetch');

const { First, Plan, Category, DraftView } = require("../models"); 

const apiKey = "AIzaSyAWPWJFuzQtmuoZqrStOHb_aRWdavmolR0"; 
const radiusUrl = 10000;

async function firstDelete() {
  try {
    const lastRows = await First.findAll({
      order: [['createdAt', 'DESC']], 
    });
  
    if (lastRows.length >= 2) {
      console.log('테이블의 가장 마지막 행이 2개 이상입니다.');
      for (let i = 1; i < lastRows.length; i++) {
        await lastRows[i].destroy();
      }
      console.log('테이블의 최초의 데이터를 제외한 나머지 데이터가 성공적으로 삭제되었습니다.');
    } else {
      console.log('삭제할 행이 존재하지 않거나 테이블에 데이터가 하나 뿐입니다.');
    }
  } catch (error) {
    console.error('테이블의 데이터 조회 및 삭제 중 오류가 발생했습니다:', error);
  }
  console.log("처리가 완료되었습니다.");
}

router.get("/attraction/1st", async (req, res) => {
  

  let first = await First.findOne({});
  Plan.truncate({});
  Category.truncate({});

  res.render("mainpage.html", {
    first: first,
  });
});

router.get("/lodging/1st", async (req, res) => {
  

  let first = await First.findOne({});
  Plan.truncate({});
  Category.truncate({});

  res.render("mainpage.html", {
    first: first,
  });
});


router.get("/attraction", async (req, res) => {
  await Plan.truncate({});
  console.log("확인1");
  const location = await First.findOne();
  if (!location) {
    return res
      .status(404)
      .json({ error: "Location not found in the database" });
  }

  const apiType = "nearbysearch";
  const { lat, lng } = location;
  const baseUrl = `https://maps.googleapis.com/maps/api/place/${apiType}/json?`;
  const radius = `radius=${radiusUrl}`;
  const locationUrl = `&location=${lat}%2C${lng}`;
  const searchParams = `&keyword=${encodeURIComponent(req.query.search)}`; // 수정된 부분
  const language = `&language=ko`;
  const dynamicUrl = `${baseUrl}${radius}${locationUrl}${searchParams}${language}&key=${apiKey}`;
  
  console.log("--------------");
  console.log(dynamicUrl);
  console.log("--------------");
  const response = await fetch(dynamicUrl);
  const data = await response.json();


  let createdPlans = [];
  console.log("확인2");


  for (let i = 0; i < data.results.length; i++) {
    let createdPlan = await Plan.create({
      user: "admin",
      name: data.results[i].name,
      addr: data.results[i].formatted_address,
      lat: data.results[i].geometry.location.lat,
      lng: data.results[i].geometry.location.lng,
      start_day: "2024-03-11 07:00",
      photo: "data:image/png;base64,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",
    });

    createdPlans.push(createdPlan);
    console.log("확인3");
  }

  let plans = await Plan.findAll({});
  let first = await First.findOne({});
  let DraftViews = await DraftView.findAll({});
  console.log("======================");
  console.log("확인4 : " + first.search);
  res.render("mainpage.html", {
    first: first,
    plans: plans,
    pickPlans: DraftViews,
  });
});

router.get("/lodging", async (req, res) => {
  Plan.truncate({});
  let typeIndex = "lodging";
  console.log("확인1");
  const location = await First.findOne();
  if (!location) {
    return res
      .status(404)
      .json({ error: "Location not found in the database" });
  }
  const apiType = "nearbysearch";
  const { lat, lng } = location;
  const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
  const radius = `${radiusUrl}`;
  const typeUrl = `&type=${encodeURIComponent(typeIndex)}`;
  const locationUrl = `&location=${lat}%2C${lng}`;
  const inputtype = `&inputtype=${apiType}`;
  const searchParams = `&query=${encodeURIComponent(req.query.search)}`;
  const language = `&language=ko`;
  const dynamicUrl = `${baseUrl}${radius}${typeUrl}${locationUrl}${inputtype}${searchParams}${language}&key=${apiKey}`;
  console.log("--------------");
  console.log(dynamicUrl);
  console.log("--------------");
  const response = await fetch(dynamicUrl);
  const data = await response.json();

  let createdPlans = [];
  console.log("확인2");
  // Plan 생성
  for (let i = 0; i < data.results.length; i++) {
    let createdPlan = await Plan.create({
      user: "admin",
      name: data.results[i].name,
      addr: data.results[i].formatted_address,
      lat: data.results[i].geometry.location.lat,
      lng: data.results[i].geometry.location.lng,
      start_day: "2024-03-11 07:00",
      photo: "moutain.png",
    });

    createdPlans.push(createdPlan);
    console.log("확인3");
    for (let j = 0; j < data.results[i].types.length; j++) {
      let createdCategory = await Category.create({
        planId: createdPlan.id,
        name: data.results[i].types[j],
      });
    }
  }
  let plans = await Plan.findAll({});
  let first = await First.findOne({});
  let DraftViews = await DraftView.findAll({});
  console.log("======================");
  console.log("확인4 : " + first.search);
  res.render("mainpage.html", {
    first: first,
    plans: plans,
    pickPlans: DraftViews,
  });
});

router.get("/temp", async (req, res) => {
  let urlid = req.query.id;
  const year = req.query.years;
  const month = req.query.months;
  const day = req.query.days;
  let dDay = String(year) + "년" + String(month) + "월" + String(day) + "일";

  let pickPlan = await Plan.findOne({
    where: {
      id: urlid, 
    },
  });

  if (pickPlan) {
    let createdDraftView = await DraftView.create({
      planId: urlid,
      days: 1,
      user: "admin",
      name: pickPlan.name,
      addr: pickPlan.addr,
      lat: pickPlan.lat,
      lng: pickPlan.lng,
      days: dDay,
      photo: pickPlan.photo,
    });
  } else {
    console.log("Plan not found!");
  }
  await Plan.truncate({});

  let first = await First.findOne({});
  let DraftViews = await DraftView.findAll({});
  res.render("mainpage.html", {
    pickPlans: DraftViews, first: first,
  });
});

router.use("/delete", async (req, res) => {
  let urlid = req.query.id;
  let first = await First.findOne({});
  await DraftView.destroy({
    where: {
      id: urlid, 
    },
  });

  await Plan.truncate({});
  let DraftViews = await DraftView.findAll({});
  res.render("mainpage.html", {
    pickPlans: DraftViews,
    first: first,
  });
});

module.exports = router;
