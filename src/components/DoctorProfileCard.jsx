import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ doctor }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container">
      <motion.div
        className={`card-inner ${isFlipped ? "flipped" : ""}`}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="card card-front">
          <h4 className="pt-5"> Hi i'am dr.{doctor.firstName}</h4>
          <div>
            <p className="Card-Body">{doctor.about}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="flip-button front"
            onClick={handleFlip}
          >
            Book now ⪼
          </motion.button>
        </div>

        <div className="card card-back">
          <div className="Card-Body">
            <h4 className="pt-4 pb-4">More about dr.{doctor.firstName}</h4>
            <p>
              <b>phone Number:</b> {doctor.phoneNumber}
            </p>
            <p>
              <b>Specialization:</b> {doctor.specialization}
            </p>
            <p>
              <b>Experience :</b> {doctor.experience}
            </p>
            <p>
              <b>price/hr :</b> ₹ {doctor.price}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.8 }}
            style={{ fontSize: "16px", width: "95%" }}
            className="btn btn-outline-dark btn-sm mt-2"
            onClick={() => navigate(`/boock-appointment/${doctor._id}`)}
          >
            Book now!
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="flip-button back "
            onClick={handleFlip}
          >
            ⪻ About
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
