import React, { useState, useEffect } from "react";
import '../css/GetAir.css';
import loadingImg from '../image/Cloud-in-the-Sky.gif';
import Axios from "axios";
import { useLocation,Link } from 'react-router-dom';

const GetAir = () => {

    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); 
    let loc = changeLocation(location);
    const [check, setCheck] = useState(true);
    const [user,setUser] = useState("");
    const [date,setDate] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {               
                const response = await Axios.get(`http://ec2-52-78-155-140.ap-northeast-2.compute.amazonaws.com:3001/node/getTickets`, {
                //const response = await Axios.get(`http://localhost:3001/node/getTickets`, {
                    params: {
                        goDay: location.state.goDay,
                        goMonth: location.state.goMonth,
                        toDay: location.state.toDay,
                        toMonth: location.state.toMonth,
                        goLocation: location.state.goLocation,
                        toLocation: location.state.toLocation
                    }
                });              
                setUser(location.state.name);
                setDates(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [location]);
    
    if (loading) {
        return <div align="center" style={{width:'100%;',height:'auto;'}}>
            <img src={loadingImg} alt=""/>
        </div>;
    }

    return (
        
        <div className="getAirDiv">
            <table className="getAirTbl">
                <thead>
                    <tr className="getAirTr">
                        <td align="right" className="getAirTd" colSpan={8}>
                            <Link to={{ 
                                pathname: '/',
                                search:'?name='+user
                            }}>
                                <button className="getBackButton">뒤로가기</button>
                            </Link>
                        </td>
                    </tr>
                </thead>
                <tbody align="center">
                    {(dates.length > 0 && check === true) && (
                        <>
                            <tr className="getAirTr">
                                <td className="getAirTd" colSpan={1}>항공사</td>
                                <td className="getAirTd" colSpan={1}>출발 공항</td>
                                <td className="getAirTd" colSpan={1}>출발 시간</td>
                                <td className="getAirTd" colSpan={1}>도착 공항</td>
                                <td className="getAirTd" colSpan={1}>도착 시간</td>
                                <td className="getAirTd" colSpan={1}>경유/직항</td>
                                <td className="getAirTd" colSpan={1}>가격</td>
                                <td className="getAirTd" colSpan={1}></td>
                            </tr>                     
                            {dates.map(date => (  
                                <tr className="getAirTr" key={date.id}>                          
                                    <td className="getAirTd" colSpan={1}>{date.company}</td>
                                    <td className="getAirTd" colSpan={1}>{loc.l1}</td>
                                    <td className="getAirTd" colSpan={1}>{date.inTime}</td>
                                    <td className="getAirTd" colSpan={1}>{loc.l2}</td>
                                    <td className="getAirTd" colSpan={1}>{date.outTime}</td>
                                    <td className="getAirTd" colSpan={1}>{date.layover}</td>
                                    <td className="getAirTd" colSpan={1}>{date.price}</td>
                                    <td className="getAirTd" colSpan={1}><button className="submitButton" onClick={async () => {
                                        try {
                                            const response = await Axios.get(`http://ec2-52-78-155-140.ap-northeast-2.compute.amazonaws.com:3001/node/reserveTickets`, {
                                            //const response = await Axios.get(`http://localhost:3001/node/reserveTickets`, {
                                                params: {
                                                    name:user,
                                                    company: date.company,
                                                    toLocation: loc.l1,
                                                    inTime: date.inTime,
                                                    goLocation: loc.l2,
                                                    outTime: date.outTime,
                                                    layover: date.layover,
                                                    price: date.price
                                                }
                                            });
                                            console.log(response.data);
                                            setCheck(false);
                                            setDate(date);
                                        } catch (error) {
                                            console.error('Error while reserving tickets:', error);
                                            setLoading(false);
                                        }
                                    }}>예약하기</button>
                                    </td>
                                </tr>    
                            ))}
                        </>
                    )}                 
                    {(dates.length === 0) && (
                        <div align="center">
                        <p>항공권 정보가 존재하지 않습니다!</p>
                        <p>다시 검색해주세요!</p>
                        </div>
                    )}   
                    {(!check && dates.length > 0) && (             
                        <div align="center">
                            <tr className="getAirTr">
                                <td className="getAirTd" colSpan={7}>{user}님 예약이 완료되었습니다!</td>
                            </tr>
                            <tr className="getAirTr">
                                <td className="getAirTd" colSpan={7}>예약 정보</td>
                            </tr>
                            <tr className="getAirTr">
                                <td className="getAirTd" colSpan={1}>항공사</td>
                                <td className="getAirTd" colSpan={1}>출발 공항</td>
                                <td className="getAirTd" colSpan={1}>출발 시간</td>
                                <td className="getAirTd" colSpan={1}>도착 공항</td>
                                <td className="getAirTd" colSpan={1}>도착 시간</td>
                                <td className="getAirTd" colSpan={1}>경유/직항</td>
                                <td className="getAirTd" colSpan={1}>가격</td>
                            </tr>
                            <tr className="getAirTr">
                                <td className="getAirTd" colSpan={1}>{date.company}</td>
                                <td className="getAirTd" colSpan={1}>{loc.l1}</td>
                                <td className="getAirTd" colSpan={1}>{date.inTime}</td>
                                <td className="getAirTd" colSpan={1}>{loc.l2}</td>
                                <td className="getAirTd" colSpan={1}>{date.outTime}</td>
                                <td className="getAirTd" colSpan={1}>{date.layover}</td>
                                <td className="getAirTd" colSpan={1}>{date.price}</td>
                            </tr>
                            
                        </div>
                    )}    
                </tbody>
                <tfoot>                 
                </tfoot>
            </table>
        </div>
    );
};

const changeLocation = (location) =>{
    let l1,l2;
    const goTo = [{key:'ICN',name:'인천'},{key:"SEL",name:'김포'},{key:"CJU",name:'제주'}];
    const toGo = [{key:'HKG',name:'홍콩'},
    {key:'HAN',name:'하노이'},
    {key:'SIN',name:'싱가폴'},
    {key:'KIX',name:'오사카'},
    {key:'OKA',name:'오키나와'},
    {key:'GUM',name:'괌'},
    {key:'CDG',name:'파리'},
    {key:'ZRH',name:'취리히'},
    {key:'MAD',name:'마드리드'},
    {key:'LAX',name:'LA'},
    {key:'HNL',name:'하와이'},
    {key:'SEA',name:'시애틀'},
    {key:'CAN',name:'광저우'},
    {key:'PVG',name:'상해(푸동)'},
    {key:'SHA',name:'상해(홍처우)'}];

    for(let i=0;i<goTo.length;i++){
        if(location.state.goLocation===goTo[i].key){
            l1 = goTo[i].name;
        }
    }
    for(let j=0;j<toGo.length;j++){
        if(location.state.toLocation===toGo[j].key){
            l2 = toGo[j].name;
        }
    }
    return {l1,l2};

}

export default GetAir;