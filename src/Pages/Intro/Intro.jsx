import { useState } from 'react';
import './Intro.scss'
import xImg from "../../Assets/Img/x.png"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../Context/Context';

export default function Intro() {
    const { url, token, setToken } = useContext(Context)
    const [modal, setModal] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
        if (!nameRegex.test(formData.name.trim())) {
            newErrors.name = 'Ismingizni yozing';
            isValid = false;
        }

        const phoneNumberRegex = /^\998[0-9]\d{8}$/;
        if (!phoneNumberRegex.test(formData.phoneNumber) || formData.phoneNumber.length !== 12) {
            newErrors.phoneNumber = 'Raqamingizni shu tarzda kiriting 998XXXXXXXXX';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch(`${url}/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        phone_number: formData.phoneNumber
                    })
                });

                const data = await response.json();

                if (data.success) {
                    window.localStorage.setItem('token', data.user_token)
                    setToken(data.user_token);

                    setFormData({
                        name: '',
                        phoneNumber: '',
                    });

                    navigate("/quiz")

                } else if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error during POST request:', error);
            }
        } else {
            console.log('Form validation failed');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className='intro'>
            <div className="container">
                <div className="container__list">
                    <div className="container__list__item">
                        <h3 className='container__list__item__title'>Bu sayt sizga bir nechta imkoniyatlar taqdim etadi. Siz bu sayt da testlarni yechish orqali ingiliz tilidagi ko'nikmalaringizni sinashga yordam beradi</h3>
                        <button onClick={() => { setModal(true) }} className='container__list__item__btn'>Bilib olish</button>
                    </div>
                </div>
            </div>
            <div className={modal ? "pop-up-close activeModal" : "pop-up-close"} onClick={() => { setModal(false) }}></div>
            <div className={modal ? "pop-up activeModal" : "pop-up"}>
                <form onSubmit={handleSubmit} className="pop-up__form">
                    <div className="pop-up__form__top">
                        <h3>IELTS ga birinchi qadam shu yerdan boshlanadi!</h3>
                        <p onClick={() => { setModal(false) }}>
                            <img src={xImg} alt="" />
                        </p>
                    </div>
                    <p className="pop-up__form__subtitle">Test natijalari bo‘yicha yordam berishimiz uchun bizga ma’lumotlaringizni qoldiring.</p>
                    <div>
                        <input
                            className='pop-up__form__inp'
                            placeholder='Ismingiz'
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            className='pop-up__form__inp'
                            placeholder='Telefon'
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            maxLength={12}
                        />
                        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
                    </div>

                    <button className='pop-up__form__btn' type="submit">Yuborish</button>
                </form>
            </div>
        </div>
    )
}