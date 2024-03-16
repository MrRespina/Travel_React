import React, { Component } from "react";
import '../css/SearchPage.css';

class SearchPage extends Component{
    state ={
        goDay:" ",
        goMonth:" ",
        toDay:" ",
        toMonth:" ",
        name:"",
        goRealMonth:" ",
        toRealMonth:" ",
        myLocation:""
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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getMyUserName();
        const val = this.getAllDate();   
        this.setMyDate(val[0],val[1],val[2],val[3]);
    }
    handleInputChange(event) {
        this.setState({myLocation:event.target.value}); // 입력된 값으로 상태 업데이트
    };
    render(){
        return(
            <div className="BookFlights">
                <div className="accordion container-fluid mx-auto p-1 bg-light" style={{height:'100%',width:'100%'}}>
                {/*  맨위 category div start */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full bg-light" style={{height:'90px'}}>
                    <div className="flex space-x-2" style={{height: '100%'}}>
                        <div className="accordion-btn border text-black" align="center" style={{height:'90px'}}>
                            <div align="center">어디로 갈까?</div>           
                            <input className="monthInput" type="text" name="goToLoc" value={this.state.myLocation}
                            onChange={this.handleInputChange} />  
                        </div>
                    </div>
                    <div className="flex space-x-2" style={{height: '100%'}}>
                        <button id="departDateBtn" className="accordion-btn border p-2" style={{width:'100%',height: '100%'}}>출발날짜&nbsp;
                            <button name="resetDate" className="accordion-btn border text-black" onClick={
                                function(){
                                    this.setState({goDay:" ",goMonth:" ",goRealMonth:" "});
                                }.bind(this)
                            }>초기화</button>
                            <div>
                                <input className="monthInput" type="text" name="selectedMonth" readOnly="readOnly" 
                                value={this.state.year+"."+this.state.goRealMonth+"."+this.state.goDay}/>                              
                            </div>
                        </button>
                        <button id="departDateBtn" className="accordion-btn border p-2" style={{height: '100%'}}>도착날짜&nbsp;
                            <button name="resetDate" className="accordion-btn border text-blacktext-black" onClick={
                                function(){
                                    this.setState({toDay:" ",toMonth:" "});
                                }.bind(this)
                            }>초기화</button>
                            <div>
                                <input className="monthInput" type="text" name="selectedMonth" readOnly="readOnly" 
                                value={this.state.year+"."+this.state.toRealMonth+"."+this.state.toDay}/>
                            </div>
                        </button>
                    </div>
                    <div className="flex space-x-2" style={{height: '100%'}}>
                        <GoComp goDate={this.state.year+"."+this.state.goRealMonth+"."+this.state.goDay}
                        toDate={this.state.year+"."+this.state.goRealMonth+"."+this.state.toDay} myLocation={this.state.myLocation}>
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
                                                if(this.state.month<10){
                                                    this.setState({goMonth:this.state.monthVal,goRealMonth:"0"+(this.state.month +1)});
                                                }else{
                                                    this.setState({goMonth:this.state.monthVal,goRealMonth:this.state.month+1});
                                                }
                                                if(this.state.day<10){
                                                    this.setState({goDay:"0"+day});
                                                }else{
                                                    this.setState({goDay:day});
                                                }
                                                
                                            }else{
                                                if(this.state.month<10){
                                                    this.setState({toMonth:this.state.monthVal,toRealMonth:"0"+(this.state.month +1)});
                                                }else{
                                                    this.setState({toMonth:this.state.monthVal,toRealMonth:this.state.month+1});
                                                }
                                                if(this.state.day<10){
                                                    this.setState({toDay:"0"+day});
                                                }else{
                                                    this.setState({toDay:day});
                                                }
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
const GoComp = ({ goDate,toDate,myLocation }) => {

    const handleSearch = () => {
        const queryParams = new URLSearchParams({
            start_day: goDate,
            end_day: toDate,
            myLocation: myLocation
        }).toString();

        window.location.href = `http://ec2-15-165-76-87.ap-northeast-2.compute.amazonaws.com:3001/mainpage?${queryParams}`;

    };

    return (
        <div align="right" style={{ width: '100%', height: '100%' }}>
            <button onClick={handleSearch} className="bg-blue-500 text-black border p-2" style={{ width: '100%', height: '100%' }}>검색하기</button>
        </div>
    );

};

export default SearchPage;