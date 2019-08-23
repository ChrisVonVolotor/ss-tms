import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from '../../ss-tms/node_modules/axios';
import TableComponant from './table/table.componant';


export default class viewAllFixtures extends Component {
    constructor(props) {
        super(props);
        this.generateStanding = this.generateStanding.bind(this)

        this.state = {competitors: [],
            fixtures:[],
            standings: [],
        }
    }

    getData = async ()=> {
        let arrCompetitors = [];
        let arrFixtures = [];
        await axios.get(process.env.API_URL + '/competitor/')
            .then(response => {
                arrCompetitors = response.data;
                console.log(arrCompetitors);

            })
            .catch(function (error){
                console.log(error);
            })

        await axios.get(process.env.API_URL + '/fixture/')
            .then(response => {
                arrFixtures = response.data;
                console.log(arrFixtures)
            })
            .catch(function (error){
                console.log(error);
            })
            
            this.setState({
                competitors: arrCompetitors,
                fixtures: arrFixtures
            });
    }
    componentDidMount() {
         this.getData().then(ele =>{
            this.generateStanding();
         })

            
    }

    generateStanding(){
        let arrStandings = [];

        this.state.competitors.forEach(element => {
            arrStandings.push(
                {
                    id: element._id,
                    name: element.Competitor_firstName + ' ' + element.Competitor_lastName,
                    points: 0,
                    pld: 0,
                    won: 0,
                    lost: 0,
                    draw: 0,
                    pd: 0,
                    pos: 0
                }
            )
        });
        console.log('here 0');

        this.state.fixtures.forEach(element => {
            if(element.Match_Completed === false){
                
            }else{
            let result = 0;
            if(element.Match_Competitor1_Score > element.Match_Competitor2_Score){
                result =1
            }else if(element.Match_Competitor1_Score < element.Match_Competitor2_Score){
                result = 2
            }
            console.log(result)

            let comp1 = arrStandings.filter(obj => {
                return obj.id === element.Match_Competitor1._id;
            })

            comp1[0].points += element.Match_Competitor1_Score;
            comp1[0].won += (result === 1)? 1:0;
            comp1[0].lost += (result === 2)? 1:0;
            comp1[0].draw += (result === 0)? 1:0;
            comp1[0].pld++;
            comp1[0].pd += (element.Match_Competitor1_Score - element.Match_Competitor2_Score);
            let comp2 = arrStandings.filter(obj => {
                return obj.id === element.Match_Competitor2._id;
            })

            comp2[0].points += element.Match_Competitor2_Score;
            comp2[0].won += (result === 2)? 1:0;
            comp2[0].lost += (result === 1)? 1:0;
            comp2[0].draw += (result === 0)? 1:0;
            comp2[0].pld++;
            comp2[0].pd += (element.Match_Competitor2_Score - element.Match_Competitor1_Score);

            }
        });
        console.log(arrStandings);
        arrStandings = arrStandings.sort(function(a,b){
            return b.points - a.points || b.won - a.won || b.draw - a.draw
        })

        arrStandings.forEach((element,i) => {
            element.pos = i + 1;
        });

        this.setState({
            standings: arrStandings
        })
}


    render() {
            return (
                <div>
                    <h3>Competition Standings</h3>
                    <TableComponant standings={this.state.standings} />
                </div>
            )
        }
    }
