import React, { useEffect } from "react";
import Layout from "../components/Layout";
import img1 from "../assets/mentel.jpg";
import "./Home.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();
  const controls = useAnimation();
  const { user } = useSelector((state) => state.user);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const animationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Layout>
      <div className="container">
        <div className="image-container">
          <motion.img
            src={img1}
            alt="Mental health support"
            initial="hidden"
            animate={controls}
            variants={animationVariants}
          />
        </div>

        <div className="row">
          <motion.div
            className="col"
            initial="hidden"
            animate={controls}
            variants={animationVariants}
            ref={ref}
          >
            <h1>Hi {user?.name} !</h1>
            <h6>
              Welcome to the safe space, a safe and supportive space where you
              can find guidance, understanding, and tools to help you navigate
              life’s challenges. Whether you're facing stress, anxiety,
              relationship issues, or simply need someone to talk to, we’re here
              for you.
            </h6>
            <hr />
          </motion.div>
        </div>

        <div className="row">
          <motion.h4
            initial="hidden"
            animate={controls}
            variants={animationVariants}
            className="col-12"
          >
            We provide good care with certified doctors
          </motion.h4>
          <motion.div
            className="col-12"
            initial="hidden"
            animate={controls}
            variants={animationVariants}
          >
            <p>
              Here, we offer a range of support services to help you achieve
              emotional wellness, build strong relationships, and find purpose
              in your career.
              <br />
              <br />
              <strong>Mental Health Support</strong>
              <br />
              Our mental health services provide guidance and tools to help you
              manage stress, anxiety, depression, and other emotional
              challenges.
              <br />
              <br />
              <strong>Relationship Advice</strong>
              <br />
              Navigating relationships can be complex, whether it’s with family,
              friends, or romantic partners. Our relationship counselors offer
              insights and strategies.
              <br />
              <br />
              <strong>Career Counseling</strong>
              <br />
              Finding meaning and satisfaction in your career is essential to
              overall well-being. Our career counseling services support you
              through career exploration, goal-setting, and work-life balance
              strategies.
            </p>
            <div>go check our sevices:</div>
            <button
              onClick={() => navigate("/services")}
              className="btn btn-outline-success mt-3"
            >
              services
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
