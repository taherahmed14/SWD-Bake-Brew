import React, { useState } from "react";
import { Avatar, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";
import Profile from "../../Assets/Profile.png";
import "./FeedBackCarousel.css";

const feedbackData = [
  {
    name: "Flipkart Customer",
    feedback: "I have been using there stabilizer from the last few month. There is no problem as yet. You can go with this stabilizer. I have been using this stabilizer for 55 inch android 4k tv. Satisfactory result.",
    rating: 5,
  },
  {
    name: "Flipkart Customer",
    feedback: "Nice product received with 5 years warranty +1 year free extended service warranty received.",
    rating: 4,
  },
  {
    name: "Flipkart Customer",
    feedback:
      `Nextron brand stabilizer is super quality product,
      Then copper transformer is good conductor.
      grey colour is awesome.
      prize range is great.
      made in India also proud of you.
      An ISO certified company is good...😊`,
    rating: 5,
  },
  {
    name: "Amazon Customer",
    feedback:
      "Amazing stabilizer comes with a compact size and time delay function which protects the device overall great value for money.",
    rating: 5,
  },
  {
    name: "Amazon Customer",
    feedback:
      "Working great. Sometimes I get extreme fluctuations, still giving stable voltage. Nice product.",
    rating: 5,
  },
];

const Feedback = () => {
  // const classes = useStyles();
  // const [feedback, setFeedback] = useState(feedbackData);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  // const handleErrorImage = (data) => {
  //   setDefaultImage((prev) => ({
  //     ...prev,
  //     [data.target.alt]: data.target.alt,
  //     linkDefault: imgGirl,
  //   }));
  // };

  return (
    <div className="parent">
      <h2>Thousands of happy customers</h2>
      <p>See why 1000+ customers have switched to Nextron</p>
      <Slider {...settings}>
        {feedbackData.map((item) => (
          <div class="quote-container">
            <div class="star-rating">
              <Rating
                  value={item.rating}
                  readOnly
                  className="rating"
                  size="large"
                />
            </div>
            <p class="quote">{item.feedback}</p>
            
            <div class="reviewer-photo">
              <img src={Profile} alt={item.name} />
            </div>
            <div class="reviewer-details">
              <span class="name">{item.name}</span>
            </div>

            <div class="bottom">
              <svg width="100%" height="80">
                <rect width="100%" height="80" class="shape-fill" />
              </svg>
              <svg class="curves" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 200" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".35" class="shape-fill"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
              </svg>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Feedback;
