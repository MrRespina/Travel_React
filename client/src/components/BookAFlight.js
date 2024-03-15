import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/BookAFlight.css';

class BookAFlight extends Component{
    state ={
        goDay:" ",
        goMonth:" ",
        toDay:" ",
        toMonth:" ",
        name:"",
        goTo:[{key:'ICN',val:'ICN',name:'인천'},
            {key:'SEL',val:'SEL',name:'김포'},
            {key:'CJU',val:'CJU',name:'제주'}],
        toGo:[{key:'HKG',val:'HKG',name:'홍콩'},
        {key:'HAN',val:'HAN',name:'하노이'},
        {key:'SIN',val:'SIN',name:'싱가폴'},
        {key:'KIX',val:'KIX',name:'오사카'},
        {key:'OKA',val:'OKA',name:'오키나와'},
        {key:'GUM',val:'GUM',name:'괌'},
        {key:'CDG',val:'CDG',name:'파리'},
        {key:'ZRH',val:'ZRH',name:'취리히'},
        {key:'MAD',val:'MAD',name:'마드리드'},
        {key:'LAX',val:'LAX',name:'LA'},
        {key:'HNL',val:'HNL',name:'하와이'},
        {key:'SEA',val:'SEA',name:'시애틀'},
        {key:'CAN',val:'CAN',name:'광저우'},
        {key:'PVG',val:'PVG',name:'상해(푸동)'},
        {key:'SHA',val:'SHA',name:'상해(홍처우)'}]
    }
    getMyUserName(){
        const searchParams = new URLSearchParams(window.location.search);
        const name = searchParams.get('name');
        this.setState({"name":name});
    }
    getAllDate(){
        const nowdate = new Date();
        const year = nowdate.getFullYear();
        const month = nowdate.getMonth();
        const daydate = this.getDayResult(year,month);
        const monthVal = this.getMonths(month);
        const value = [year,month,monthVal,daydate];
        return value;
    }
    getMyDate(){
        const value = [this.state.year,this.state.month,this.state.monthVal,this.state.days];
        return value;
    }
    getLastDays(year,month){
        const lastDateofMonth = new Date(year, month + 1, 0).getDate();
        return lastDateofMonth;
    }
    getDayResult(year,month){
        let dayResult = [];
        let firstDayofMonth = new Date(year, month, 1).getDay();
        let lastDate = this.getLastDays(year,month);
        let lastDayofMonth = new Date(year, month,lastDate).getDay(); 
        //let lastDateofLastMonth = new Date(year, month, 0).getDate();
        for (let i = firstDayofMonth; i > 0; i--) {
            //dayResult.push(`${lastDateofLastMonth - i + 1}`);
            dayResult.push(" ");
        }
        for (let i = 1;i < lastDate+1;i++){
            dayResult.push(i);
        }
        for (let i = lastDayofMonth; i < 6; i++) {
            //dayResult.push(`${i - lastDayofMonth + 1}`);
            dayResult.push(" ");
        }
        return dayResult;
    }
    getMonths(month){
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        return months[month];
    }
    setMyDate(year,month,monthVal,days){
        this.setState({"year":year,"month":month,"monthVal":monthVal,"days":days});
    }
    componentDidMount() { 
        this.getMyUserName();
        const val = this.getAllDate();   
        this.setMyDate(val[0],val[1],val[2],val[3]);
    }
    render(){
        return(
            <div className="BookFlights">
                <div className="accordion container-fluid mx-auto p-1 bg-light" style={{height:'100%',width:'100%'}}>
                    {/*  맨위 category div start */}
                    <div className="flex flex-col md:flex-row justify-between items-center w-full bg-light" style={{height:'90px'}}>
                        <div className="flex space-x-2" style={{height: '100%'}}>
                            <div className="accordion-btn border text-black" align="center" style={{height:'90px'}}>
                                <div align="center">출발지</div>
                                <select className='goToWhere' size='2'>
                                {this.state.goTo.map((opt) =>(
                                    <option key={opt.key} value={opt.val} onClick={function(){
                                        this.setState({"goLocation":opt.val})
                                    }.bind(this)}>
                                        {opt.name}
                                    </option>
                                ))
                                }
                                </select>
                            </div>
                            <div className="accordion-btn border text-black" align="center" style={{height:'90px'}}>
                                <div align="center">도착지</div>
                                <select className='goToWhere' size='2'>
                                {this.state.toGo.map((opt) =>(
                                    <option key={opt.key} value={opt.val} onClick={function(){
                                        this.setState({"toLocation":opt.val})
                                    }.bind(this)}>
                                        {opt.name}
                                    </option>
                                ))
                                }
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-2" style={{height: '100%'}}>
                            <button id="departDateBtn" className="accordion-btn border p-2" style={{width:'100%',height: '100%'}}>가는편&nbsp;&nbsp;&nbsp;
                                <button name="resetDate" className="accordion-btn border text-black" onClick={
                                    function(){
                                        this.setState({goDay:" ",goMonth:" "});
                                    }.bind(this)
                                }>초기화</button>
                                <div>
                                    <input className="monthInput" type="text" name="selectedMonth" readOnly="readOnly" value={this.state.goMonth}/>
                                    <input className="dayInput" type="text" name="selectedDay" readOnly="readOnly" value={this.state.goDay||""}/>                                  
                                </div>
                            </button>
                            <button id="departDateBtn" className="accordion-btn border p-2" style={{height: '100%'}}>오는편&nbsp;&nbsp;&nbsp;
                                <button name="resetDate" className="accordion-btn border text-blacktext-black" onClick={
                                    function(){
                                        this.setState({toDay:" ",toMonth:" "});
                                    }.bind(this)
                                }>초기화</button>
                                <div>
                                    <input className="monthInput" type="text" name="selectedMonth" readOnly="readOnly" value={this.state.toMonth||""}/>
                                    <input className="dayInput" type="text" name="selectedDay" readOnly="readOnly" value={this.state.toDay||""}/>
                                </div>
                            </button>
                        </div>
                        <div className="flex space-x-2" style={{height: '100%'}}>
                            <GoComp name={this.state.name} goDay={this.state.goDay} goMonth={this.state.goRealMonth} toDay={this.state.toDay} toMonth={this.state.toRealMonth}
                                goLocation={this.state.goLocation} toLocation={this.state.toLocation}>
                            </GoComp>                           
                        </div>                    
                    </div>
                    {/* 캘린더 div start */}
                    <div className="accordion-content" align="center">
                        <div className="wrapper">         
                            <header>
                                <div className="nav">
                                    <button className="material-icons" onClick={function(){               
                                        let newmonth = this.state.month-1;
                                        if(newmonth === -1){
                                            newmonth = 11;
                                        }
                                        const newmonthVal = this.getMonths(newmonth);
                                        const days = this.getDayResult(this.state.year,newmonth);
                                        this.setMyDate(this.state.year,newmonth,newmonthVal,days);
                                    }.bind(this)}> &lt; 
                                    </button>
                                    <p className="current-date">{this.state.year} {this.state.monthVal}</p>
                                    <button className="material-icons" onClick={function(){ 
                                        let newmonth = this.state.month+1;
                                        if(newmonth === 12){
                                            newmonth = 1;
                                        }
                                        const newmonthVal = this.getMonths(newmonth);
                                        const days = this.getDayResult(this.state.year,newmonth);
                                        this.setMyDate(this.state.year,newmonth,newmonthVal,days);
                                    }.bind(this)}> &gt; 
                                    </button>
                                    </div>
                                </header>                       
                                <div className="calendar">
                                    <ul className="weeks">
                                        <li>Sun</li>
                                        <li>Mon</li>
                                        <li>Tue</li>
                                        <li>Wed</li>
                                        <li>Thu</li>
                                        <li>Fri</li>
                                        <li>Sat</li>
                                    </ul>
                                    <ul className="days">
                                        {
                                        this.state.year && this.state.days.map((day,index) =>
                                            <li key={index} onClick={function(){
                                                if((this.state.goDay===" ")){
                                                    this.setState({goDay:day,goMonth:this.state.monthVal,goRealMonth:this.state.month+1});
                                                }else{
                                                    this.setState({toDay:day,toMonth:this.state.monthVal,toRealMonth:this.state.month+1});
                                                }                                
                                            }.bind(this)}>{day}</li>
                                        )}      
                                    </ul>                                                         
                                </div>
                            </div>
                    </div>
                </div>
                
            </div>

        );

    };

}

const GoComp = ({ goDay, goMonth, toDay, toMonth , goLocation , toLocation , name }) => {
    return (
        <div align="right" style={{width:'100%',height: '100%'}}>
            {/* 필요한 상태 변수들과 업데이트 함수를 이용하여 UI 구성 */}
            <Link
                to={{
                    pathname: '/node/getAir',
                }}  
                state = {{
                    name:name,
                    goDay: goDay,
                    goMonth: goMonth,
                    toDay:toDay,
                    toMonth:toMonth,
                    goLocation:goLocation,
                    toLocation:toLocation
                }}
                >
                <button className="bg-blue-500 text-black border p-2" style={{width:'100%',height: '100%'}}>검색하기</button>
            </Link>
        </div>
    );
};
export default BookAFlight;