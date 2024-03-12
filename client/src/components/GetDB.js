import { Component } from "react";
import '../css/GetDB.css'
import Axios from "axios";

class GetDB extends Component{

    state ={
        db:[],
        username:"",
        loading: true // 추가: 데이터 로딩 상태를 나타내는 변수
    }
    async getMyUserName(){
        const searchParams = new URLSearchParams(window.location.search);
        const name = searchParams.get('username');
        this.setState({ username: name }, () => {
            console.log("현재 DB 호출하는 사람 :",this.state.username);
        });
    }
    async componentDidMount() {
        await this.getMyUserName();
        Axios.get(`http://localhost:3001/node/1/getMyTickets`,{
            params:{
                username:this.state.username
            }
        })
        .then(res => {
            const db = res.data;
            this.setState({ db, loading: false }); // 데이터 로딩이 완료되면 loading을 false로 설정
            console.log(db, res.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            this.setState({ loading: false }); // 에러가 발생해도 loading을 false로 설정
        });
    }

    render(){
        const { db, loading } = this.state;
        return(
            <div className="getDBDiv">
                <h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        db.map(db => 
                            <li key={db.id}>{db.username},{db.company}</li>
                        )
                    )}
                </h1>
            </div>
        );
    };
}

export default GetDB;
