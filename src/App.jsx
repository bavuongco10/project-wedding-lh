import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

function App() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false
  })

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    })

    // Set target date: 09:00 18/01/2026 (Vu Quy ceremony - Vietnam time)
    const targetDate = new Date("2026-01-18T09:00:00+07:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds, ended: false })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const pad = (num) => (num < 10 ? '0' : '') + num

  return (
    <div id="wrapper">
      {/* Main Banner */}
      <div className="mainBanner">
        <div className="mainBanner--img" data-aos="zoom-out-up" data-aos-duration="1500">
          <img 
            src="/lh/1.jpeg" 
            alt="Huy & Ái Linh Wedding" 
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="mainBanner--content">
          <h1 data-aos-delay="700" data-aos="zoom-out-up" data-aos-duration="1000">Huy & Ái Linh</h1>
          <h2 data-aos-delay="1000" data-aos="zoom-out-up" data-aos-duration="1000">HERE BEGINS THE REST OF OUR STORY</h2>
        </div>
      </div>

      {/* Countdown Section */}
      <section className="countDown">
        <h3 className="countDown--title" data-aos="zoom-out-up" data-aos-duration="1500">Yes We Do</h3>
        <div className="countDown--time" data-aos="zoom-out-up" data-aos-duration="1500">
          {countdown.ended ? (
            <span className="endTime">🎉 SỰ KIỆN ĐÃ ĐẾN VÀ KẾT THÚC! 🎉</span>
          ) : (
            <>
              <dl>
                <dt id="days">{pad(countdown.days)}</dt>
                <dd>Ngày</dd>
              </dl>
              <dl>
                <dt id="hours">{pad(countdown.hours)}</dt>
                <dd>Giờ</dd>
              </dl>
              <dl>
                <dt id="minutes">{pad(countdown.minutes)}</dt>
                <dd>Phút</dd>
              </dl>
              <dl>
                <dt id="seconds">{pad(countdown.seconds)}</dt>
                <dd>Giây</dd>
              </dl>
            </>
          )}
        </div>
      </section>

      {/* Calendar Section */}
      <section className="monthTime">
        <h3 className="countDown--title" data-aos="zoom-out-up" data-aos-duration="1500">Tháng 1</h3>
        <div className="monthTime--calendar">
          <div className="monthTime--week rows" data-aos="zoom-out-up" data-aos-duration="1500">
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span>CN</span>
          </div>

          <div className="monthTime--days rows" data-aos="zoom-out-up" data-aos-duration="1500">
            <span></span>
            <span></span>
            <span></span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
          <div className="monthTime--days rows" data-aos="zoom-out-up" data-aos-duration="1500">
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
          </div>
          <div className="monthTime--days rows" data-aos="zoom-out-up" data-aos-duration="1500">
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span>17</span>
            <span className="heart heart-vu-quy">
              <span className="date-label">18</span>
              <i><img src="/lh/heart.svg" alt="Vu Quy" /></i>
              <span className="event-label">Vu Quy</span>
            </span>
          </div>
          <div className="monthTime--days rows" data-aos="zoom-out-up" data-aos-duration="1500">
            <span>19</span>
            <span>20</span>
            <span>21</span>
            <span>22</span>
            <span>23</span>
            <span className="heart heart-tan-hon">
              <span className="date-label">24</span>
              <i><img src="/lh/heart.svg" alt="Tân Hôn" /></i>
              <span className="event-label">Tân Hôn</span>
            </span>
            <span>25</span>
          </div>
          <div className="monthTime--days rows" data-aos="zoom-out-up" data-aos-duration="1500">
            <span>26</span>
            <span>27</span>
            <span>28</span>
            <span>29</span>
            <span>30</span>
            <span>31</span>
            <span></span>
          </div>
        </div>
      </section>

      {/* Chapter Section */}
      <section className="chapter">
        <div className="chapter--wrap">
          <div className="chapter--content" data-aos="zoom-in-right" data-aos-duration="1500">
            <h4>A New chapter <br />begins</h4>
            <p>Hạnh phúc sẽ trọn vẹn hơn khi có bạn <br className="br01" />
              cùng chung vui <br className="br02" /> trong ngày trọng đại này <br className="br01" />của chúng mình.</p>
          </div>
          <div className="chapter--imgs" data-aos="zoom-in-left" data-aos-duration="1500">
            <div className="chapter--imgs-top">
              <span className="img1">
                <img 
                  src="/lh/2.jpeg" 
                  alt="Huy & Ái Linh" 
                  loading="lazy"
                />
              </span>
            </div>
            <div className="chapter--imgs-bot">
              <span className="img1 squad">
                <img 
                  src="/lh/3.jpeg" 
                  alt="Wedding Memories" 
                  loading="lazy"
                />
              </span>
              <span className="img1">
                <img 
                  src="/lh/4.jpeg" 
                  alt="Huy & Ái Linh" 
                  loading="lazy"
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Information Section */}
      <section className="wedding-info">
        <h3 className="countDown--title" data-aos="zoom-out-up" data-aos-duration="1500">Thông tin thiệp cưới</h3>
        
        <div className="wedding-info--families" data-aos="zoom-out-up" data-aos-duration="1500">
          <div className="family-info">
            <h4 className="family-title">Nhà trai</h4>
            <div className="family-details">
              <p className="family-member">Ông: Trần Tấn Minh</p>
              <p className="family-member">Bà: Phạm Thị Hoàng</p>
              <p className="family-address">Đ/c: 4c khu phố 3 - phường Phú Khương – Tỉnh Vĩnh Long</p>
            </div>
          </div>

          <div className="family-info">
            <h4 className="family-title">Nhà gái</h4>
            <div className="family-details">
              <p className="family-member">Ông: Nguyễn Văn Thuận</p>
              <p className="family-member">Bà: Nguyễn Thị Định</p>
              <p className="family-address">Đ/c: 247 ĐH411 ấp Tân Thành 3 - xã Bắc Tân Uyên – TP. HCM</p>
            </div>
          </div>
        </div>

        <div className="wedding-info--couple" data-aos="zoom-out-up" data-aos-duration="1500">
          <p className="couple-info">Trần Minh Huy (Trưởng nam)</p>
          <p className="couple-info">Nguyễn Thị Ái Linh (Út Nữ)</p>
        </div>
      </section>

      {/* Vu Quy Section */}
      <section className="ceremony-section vu-quy">
        <h3 className="countDown--title" data-aos="zoom-out-up" data-aos-duration="1500">Vu Quy</h3>
        <div className="ceremony-details" data-aos="zoom-out-up" data-aos-duration="1500">
          <p className="ceremony-text">
            Hôn lễ được cử hành tại Tư gia vào lúc <span className="time-highlight"><strong>9h</strong></span> Chủ nhật ngày <span className="date-highlight"><strong>18/01/2026</strong></span><br />
            (Nhằm ngày 30 tháng 11 năm Ất Tỵ)
          </p>
          <p className="ceremony-reception">
            <span className="reception-label">Tiệc:</span><br />
            <span className="venue-name">Văn phòng ấp Tân Thành 3</span><br />
            <span className="venue-details">(đối diện trường Mầm non Hoa Phong Lan) xã Bắc Tân Uyên – TP. HCM</span><br />
            <span className="time-highlight">Đón khách: <strong>11h</strong></span> | <span className="time-highlight">Khai tiệc: <strong>11h30</strong></span>
          </p>
        </div>
      </section>

      {/* Tân Hôn Section */}
      <section className="ceremony-section tan-hon">
        <h3 className="countDown--title" data-aos="zoom-out-up" data-aos-duration="1500">Tân Hôn</h3>
        <div className="ceremony-details" data-aos="zoom-out-up" data-aos-duration="1500">
          <p className="ceremony-text">
            Hôn lễ được cử hành tại Tư gia vào lúc <span className="time-highlight"><strong>9h</strong></span> Thứ bảy ngày <span className="date-highlight"><strong>24/01/2026</strong></span><br />
            (Nhằm ngày 06 tháng 12 năm Ất Tỵ)
          </p>
          <p className="ceremony-reception">
            <span className="reception-label">Tiệc:</span><br />
            <span className="venue-name">Trung tâm Hội nghị và tiệc cưới TTC Palace Bến Tre</span><br />
            <span className="venue-hall">(sảnh Long Phụng)</span><br />
            <span className="venue-address">16 Hai Bà Trung - Phường An Hội – Tỉnh Bến Tre</span><br />
            <span className="time-highlight">Đón khách: <strong>11h</strong></span> | <span className="time-highlight">Vào tiệc: <strong>11h30</strong></span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer--wrap">
          <div className="footer--img" data-aos="zoom-in-right" data-aos-duration="1500">
            <img 
              src="/lh/5.jpeg" 
              alt="Wedding Celebration" 
              loading="lazy"
            />
          </div>
          <div className="footer--content" data-aos="zoom-in-left" data-aos-duration="1500">
            <span className="icon" aria-hidden="true">
              <svg width="165" height="40" viewBox="0 0 165 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20 Q30 10 40 20 Q30 30 20 20" fill="#ae9674" opacity="0.8"/>
                <path d="M60 20 Q70 10 80 20 Q70 30 60 20" fill="#ae9674" opacity="0.8"/>
                <path d="M100 20 Q110 10 120 20 Q110 30 100 20" fill="#ae9674" opacity="0.8"/>
                <path d="M140 20 Q150 10 160 20 Q150 30 140 20" fill="#ae9674" opacity="0.8"/>
              </svg>
            </span>
            <span className="label">Join us on our special day</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App