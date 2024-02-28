import * as React from 'react'
import { Context } from '../../Context/Context'
import './Result.scss'
import { Link } from 'react-router-dom'

export default function Result({ }) {
    const { result, url, token } = React.useContext(Context)
    const [quizData, setQuizData] = React.useState()
    const [loader, setLoader] = React.useState(true)

    React.useEffect(() => {
        if (result) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${url}/result/`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Ошибка: ${response.status}`);
                    }

                    const data = await response.json();
                    if (data) {
                        setQuizData(data);
                        setLoader(false)
                    } else {
                        console.error('Ошибка: Некорректные данные получены от сервера.');
                    }

                } catch (error) {
                    console.error('Ошибка при запросе данных:', error.message);
                }
            };

            fetchData();
        }

    }, [])

    return (
        <div className="result">
            <div className="container">
                <div className="container__top">
                    <h3 className="container__top__title">Natija</h3>
                    <p className="container__top__text">
                        Ushbu natijalarni barchasi belgilangan javoblarga tayanilgan holatda hosil qilindi.
                    </p>
                </div>
                <div className="container__answer">
                    <div className="container__answer__left">
                        <ul className="container__answer__left__list">
                            {
                                quizData?.map((e, i) => (
                                    <li key={i} className={loader ? "skeleton" : "container__answer__left__list__item"}>
                                        <h4>📕 {e.test_title}</h4>
                                        <b>📑 Umumiy test soni: {e.question_count}</b>
                                        <b>✅ Togri javoblar: {e.score}</b>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="container__answer__right">
                        <ul className="container__answer__right__list">
                            <li>
                                <h3>O‘zingizni qulay usulda o‘qing</h3>
                                <b>Standart</b>
                                <b>Intensive</b>
                            </li>
                            <li>
                                <h3>BIzni ijtimoiy tarmoqlarda kuzating</h3>
                                <Link to={"#"}>
                                    +
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
