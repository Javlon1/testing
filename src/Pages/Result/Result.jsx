import * as React from 'react'
import kurs1 from "../../Assets/Img/kurs1.png"
import kurs2 from "../../Assets/Img/kurs2.png"
import kurs3 from "../../Assets/Img/kurs3.png"
import kurs4 from "../../Assets/Img/kurs4.png"
import { Context } from '../../Context/Context'
import './Result.scss'

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
                        Ushbu natijalarni barchasi belgilangan javoblarga tayanilgan holatda hosil qilindi. Aniq sizga qaysi kasb mos kelishini bilish uchun esa biz bilan bog‘laning,mutaxassislarimiz sizga batafsil maslahat berishadi.
                    </p>
                </div>
                <div className="container__answer">
                    <div className="container__answer__left">
                        <ul className="container__answer__left__list">
                            {
                                quizData?.map((e, i) => (
                                    <li key={i} className={loader ? "skeleton" : "container__answer__left__list__item"}>
                                        <span>
                                            <h4>{e.test_title}</h4>
                                        </span>
                                        <b>{e.score}/{e.question_count}</b>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="container__answer__right">
                        <ul className="container__answer__right__list">
                            <li>
                                <h3>Kurslar haqida slayd bilan tanishing</h3>
                                <p>Slayd orqali siz IT sohasi va bizda mavjud bo‘lgan TOP kasblar haqida bilib olishingiz mumkin bo‘ladi.</p>
                            </li>
                            <li>
                                <h3>O‘zingizni qulay usulda o‘qing</h3>
                                <b>Standart</b>
                                <b>BootCamp</b>
                            </li>
                            <li>
                                <h3>Kurslar dasturi bozor talabiga javob beradi</h3>
                                <span>
                                    <img src={kurs1} alt="" loading="lazy" />
                                    <img src={kurs2} alt="" loading="lazy" />
                                    <img src={kurs3} alt="" loading="lazy" />
                                    <img src={kurs4} alt="" loading="lazy" />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
