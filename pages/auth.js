import Head from "next/head";
import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import {Carousel} from "antd";

const buttonStyle = {
    padding: "15px",
    borderRadius: "50%",
    background: "red",
    opacity: 0.7,
    fontSize: "20px"
};

const headerStyle = {
    color: 'white',
    position: "absolute",
    zIndex: 4,
    top: '30%',
    left: '40%'
}

const contentStyle = {
    color: 'white',
    textAlign: "center",
    top: '50%',
    left: '25%',
    position: "absolute",
    zIndex: 4
}

const bgImg = {
    position: "fixed",
    // zIndex: 3,
    left: 0,
    top: 0,
    // width: "50%",
    // height: "50%"
};

const carousel = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
}

function sendEmail(email) {
    const body = `Здравствуйте, я нашел вашего питомца.%0A-----------%0AС уважением, ${localStorage.user}`;
    window.open(`mailto:${email}?subject=Потерянный зверь&body=${body}`);
}

function Animal(props) {
    if (!props.data) return <p>Loading</p>
    const {header, content, img} = props.data;
    return (
        <div>
            <h1 style={headerStyle}>{header}</h1> <br/>
            <h2 style={contentStyle}>{content}</h2>
            <img
                style={bgImg}
                alt="Чара (моя собака)"
                src={img}
            />
        </div>
    );
}

export default function Auth() {
    const [animals, setAnimals] = React.useState([]);
    React.useEffect(() => {
        fetch('/animals.json').then(data => data.json()).then(data => setAnimals(data));
    }, []);

    function logout() {
        localStorage.clear();
        location.reload();
    }

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>Petto</title>
                    <meta name="description" content="Социальная сеть для питомцев"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main>
                    <div>
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="/"
                        >
                            <p className={styles.logout}>logout</p>
                        </Link>
                    </div>


                    <h1 style={{textAlign: "center"}}>Petto</h1>

                    {/*<AwesomeSlider style={{"--slider-height-percentage": "100%", textAlign: "center"}}>*/}
                    {/*    {*/}
                    {/*        animals.map((data, i) => <div key={i} style={{zIndex: 2}}*/}
                    {/*                                      onClick={() => sendEmail(data?.email)}>*/}
                    {/*            <Animal data={data}/>*/}
                    {/*        </div>)*/}
                    {/*    }*/}
                    {/*</AwesomeSlider>*/}

                    <Carousel autoplay>
                            {/*<h3 style={carousel}>1</h3>*/}
                            {
                                animals.map((data, i) => <div key={i} style={{zIndex: 2}}
                                                              onClick={() => sendEmail(data?.email)}>
                                    <Animal data={data}/>
                                </div>)
                            }
                    </Carousel>

                </main>
                <footer className={styles.footer}>
                    Petto, (c) 2024
                </footer>
            </div>
        </>
    );
}
