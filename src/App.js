import React from 'react';
import { useState } from "react";
import './App.css';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import NavBar from "./components/NavBar";
import { AreaChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ComposedChart, Tooltip, Legend, Bar, Area } from 'recharts';
import { ConstructionRounded } from '@mui/icons-material';
import { CSVLink } from "react-csv";




function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyDVoFl4w7UsQCMS6Di16ryTG5rwRQLkJ0g",
    authDomain: "weatherdata-e114b.firebaseapp.com",
    databaseURL: "https://weatherdata-e114b-default-rtdb.firebaseio.com",
    projectId: "weatherdata-e114b",
    storageBucket: "weatherdata-e114b.appspot.com",
    messagingSenderId: "140725281827",
    appId: "1:140725281827:web:2865232d7b4245aecfbd96",
    measurementId: "G-KSM2NB4C53"
  };

  const app = initializeApp(firebaseConfig);

  const db = getDatabase();

  const reference = ref(db, "data/data/data");

  onValue(reference, (snapshot) => {

    const data1 = snapshot.val();

    var temperatureLiveFirebase = document.getElementById('temperatureLiveFirebase');
    var humidityFirebase = document.getElementById('humidityLiveFirebase');
    var timeLiveFirebase = document.getElementById('timeLiveFirebase');

    temperatureLiveFirebase.innerHTML = data1.temperature + "C";
    humidityFirebase.innerHTML = data1.humidity + "%";
    timeLiveFirebase.innerHTML = data1.time;
  })

  const dbRef = ref(getDatabase());
  get(child(dbRef, 'data/hourlyData')).then((snapshot) => {
    if (snapshot.exists()) {

      //Getting the data as brent 
      var childKey = snapshot.val();
      var dataFirebase = document.getElementById('dataFirebase');
      dataFirebase.innerHTML = childKey;

      var repos;

      var newArr = [];

      //Looping through the data to get the name of the data
      for (repos in childKey) {
        //console.log(repos);

        //Accessing every name of the data to get the other data like the date and the time and temperature and the humitidy
        get(child(dbRef, 'data/hourlyData/' + repos)).then((snapshot) => {
          if (snapshot.exists()) {

            var childKey = snapshot.val();
            //console.log(childKey.date);

            //mapping the fetched data to a 2 Dimontial array
            const data11 = {
              "name": childKey.time,
              "uv": childKey.date,
              "pv": childKey.humidity,
              "amt": childKey.temperature
            };

            newArr.push(data11);
          }

        }).catch((error) => {
          console.error(error);

        });
      }
      console.log(newArr);
    }

  }).catch((error) => {
    console.error(error);

  });


  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ];

  const headers = [
    { label: 'Time', key: 'name' },
    { label: 'Date', key: 'uv' },
    { label: 'Temperature', key: 'pv' },
    { label: 'Humitidy', key: 'amt' }
  ];

  const csvReport = {
    filename: 'Report.csv',
    headers: headers,
    data: data
  };

  const data2 = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    }
  ];

  console.log(data);


  return (

    <html>

      <React.Fragment>
        <NavBar />
      </React.Fragment>

      <body>

        <main className="main">


          <div className="wrapper">
            <div className="typing-demo">
              We have to use the tech to save the planet.
            </div>
          </div>

          <button className="button1">See More</button>



        </main>

        <div className="einleitung">
          <h1>Die Schritte zu Nachhaltigkeit</h1>
          <p className="block">Schon viel zu lange schaden wir unserer Welt mit unserem egoistischem Lebensverhalten, es ist an Zeit sich um unsere Welt zu kümmern, denn auch kleine Schritte sind ein Fortschritt. Wir vom Team Sensortechnik haben uns vorgenommen diese Schritte zu gehen. Also geh mit uns den Weg der Nachhaltigkeit und sei ein Teil Lösung nicht des Problems.</p>


        </div>

        <h1 className="title">Live Data</h1>



        <div className="card-main">

          <div className="card">

            <div className="card-image">


              <div className="text11">
                <img className="temp" />
                <h4>Temperature</h4>
              </div>

              <h1 id="temperatureLiveFirebase"></h1>

            </div>

            <div className="card-image">

              <div className="text11">
                <img className="Humidity" />
                <h4>Humidity</h4>
              </div>

              <h1 id="humidityLiveFirebase"></h1>

            </div>

            <div className="card-image">

              <div className="text11">

                <img className="time" />

                <h4>Time</h4>

              </div>

              <h1 id="timeLiveFirebase"></h1>

            </div>

          </div>

        </div>

        <div className="chart">

          <AreaChart width={730} height={250} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>


          <ComposedChart width={730} height={250} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>


        </div>


        <p id="dataFirebase"></p>

        <CSVLink {...csvReport}>Export to CSV</CSVLink>

      </body>

      <div className="footer-basic">
        <footer>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="#">Home</a></li>
            <li className="list-inline-item"><a href="#">Services</a></li>
            <li className="list-inline-item"><a href="#">About</a></li>
            <li className="list-inline-item"><a href="#">Terms</a></li>
            <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
          </ul>
          <p className="copyright">Sensortechnik © 2022</p>

        </footer>
      </div>
    </html>
  );
}

export default App;
