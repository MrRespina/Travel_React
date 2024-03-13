const express = require("express"); // npm i express | yarn add express
const bodyParser = require('body-parser');
const puppeteer = require("puppeteer");
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql2");   // npm i mysql | yarn add mysql
const app     = express();
const PORT    = 3001; // 포트번호 설정

const getHTML = async(goDay,goMonth,toDay,toMonth,goLocation,toLocation) =>{
    try{

        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],headless:true}); // 브라우저 실행 (여기서 headless:false 속성을 주면 브라우저가 열리고 닫히는 과정을 시각적으로 볼 수 있다.
        const page = await browser.newPage(); // 새로운 페이지 열기
        const URL = "https://fly.interpark.com/booking/mainFlights.do?tripType=RT&sdate0=2024";

        let goD = goDay;
        if(goD <10){
            goD = "0"+goD;
        }
        let toD = toDay;
        if(toD <10){
            toD = "0"+toD;
        }
        let goM = goMonth;
        if(goM <10){
            goM = "0"+goM;
        }
        let toM = toMonth;
        if(toM <10){
            toM = "0"+toM;
        }

        // 출발 월/일
        const depTime = goM+goD;
        // 돌아오는 월/일
        const arrTime = "&sdate1=2024"+toM+toD+"&sdate2=";
        // 출발 위치
        const departure = "&dep0="+goLocation;
        // 도착 위치
        const arrival = "&dep1="+toLocation+"&dep2=&";
        // 돌아오는 출발 > 도착
        const back = "&arr0="+toLocation+"&arr1="+goLocation+"&arr2=";
        // 유아 / 어린이 / 성인 인원수
        const nop = "&inf=0&chd=0&adt="+1;
        // 추가 인자
        const end = "&via=&comp=Y&val=&bizCd=#list";
        const resultURL = URL+depTime+arrTime+departure+arrival+back+nop+end;

        console.log('연결할 URL : '+resultURL);

        await page.goto(resultURL);

        //await page.goto('https://fly.interpark.com/booking/mainFlights.do?tripType=RT&sdate0=20240302&sdate1=20240309&sdate2=&dep0=SEL&dep1=KIX&dep2=&arr0=KIX&arr1=SEL&arr2=&adt=1&chd=0&inf=0&via=&comp=Y&val=&bizCd=#list');
        await autoScroll(page);

        // 페이지에서 필요한 탭의 css selector로 연결 후, 크롤링함.
        const bodyContent = await page.evaluate(() => {     
            const lists = document.querySelectorAll('#goodsList0Div > div.air-table.filter-air-table > div.scroll-body.filter-body > ul > li');
                const liArray = Array.from(lists);
                return liArray.map(li => li.textContent.replace(/\s+/g, ' ').trim());
        });

        // 크롤링 시작 후 스크롤이 끝나고 scrollTimeLimit 이후에 비동기로 브라우저를 닫음(스크롤링 중지)
        const scrollTimeLimit = 500; // 0.5초
        setTimeout(async () => {
            console.log("스크롤링이 중지되었습니다.");
            await browser.close();
        }, scrollTimeLimit);

        let jsonResult = [];
        let inTime = null;
        let inC = null;
        let outTime = null;
        let outC = null;
        let price = null;
        let layover = null;
        let count = 0;
        for (let i = 0; i < bodyContent.length; i++) {
            let isMini = true;
            var li = bodyContent[i];
            res = li.split(" ");
            if(res[0] === "긴급땡처리" || res[0] === "Best"){
                res[0] = res[1];
            }
            for(let j = 0; j < res.length; j++){             
                if((res[j]==="ICN") || (res[j]==="SEL") || (res[j]==="CJU")){
                    inC = res[j];
                    inTime = goM+"-"+goD+"/"+res[j+1];
                    outC = res[j+2];
                    outTime = toM+"-"+toD+"/"+res[j+3];
                    layover = res[j+4];
                    if(layover !== "직항"){
                        layover = "경유";
                    }
                }else if((res[j] === "가능") && (isMini === true)){
                    isMini = false;
                    price = res[j+1].replace(/[~]/g,"");
                }
                
            }
            const jo = {"id":count,"company":res[0],"in":inC,"inTime":inTime,"out":outC,"outTime":outTime,"layover":layover,"price":price};      
            count += 1;
            jsonResult.push(jo);
        }
        return jsonResult;

    }catch(error){
        console.error(error);
    }
}

// 열린 페이지를 받아 scroll해서 내리며 데이터를 가져옴.
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

// MySQL 연결
const db = mysql.createPool({
    host: "127.0.0.1", // 호스트
    user: "root",      // 데이터베이스 계정
    password: "respina7524",      // 데이터베이스 비밀번호
    database: "Travel",  // 사용할 데이터베이스
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}));

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }));

app.get("/node/getTickets", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var goDay = req.query.goDay;
    var goMonth = req.query.goMonth;
    var toDay = req.query.toDay;
    var toMonth = req.query.toMonth;
    var goLocation = req.query.goLocation;
    var toLocation = req.query.toLocation;

    const val = await getHTML(goDay, goMonth, toDay, toMonth, goLocation, toLocation);
    res.send(val);
});

app.get("/node/reserveTickets", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    // 사용자로부터 받은 매개변수
    const { name,company, toLocation, inTime, goLocation, outTime, layover, price } = req.query;
    console.log( name ,company, toLocation, inTime, goLocation, outTime, layover, price);

    var getMyId = "SELECT id FROM siteuser WHERE username='"+name+"'";

    db.query(getMyId, (err, result) => {
        if (err) {
            console.error("Error:", err);
        } else {
            //console.log(result);
            const u_id = result[0].id;
            //console.log(u_id);
            // SQL 쿼리 구성
            let sqlQuery = "INSERT INTO tickets (u_id,username, company, toLocation, inTime, goLocation, outTime, layover, price) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?)";

            // 데이터베이스에 SQL 쿼리 실행
            db.query(sqlQuery, [u_id,name,company, toLocation, inTime, goLocation, outTime, layover, price], (err, result) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    res.status(500).send('Error executing SQL query');
                    return;
                }else{
                    //console.log(`${name}님 ${company},${toLocation},${inTime}시 예약 완료되었습니다.`);
                    res.send(name);
                }
                console.log('Data inserted successfully');
            });
        }
    });
});

// 서버 연결 시 발생
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});