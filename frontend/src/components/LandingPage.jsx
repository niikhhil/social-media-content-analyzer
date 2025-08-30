import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

// Animation variants for the container to stagger children animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, 
        },
    },
};

// Animation for the "How It Works" title
const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Animation for the cards, coming from different directions
const cardVariantLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const cardVariantMiddle = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const cardVariantRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};


function LandingPage({ onTryNow }) {
    const [animateHowItWorks, setAnimateHowItWorks] = useState(false);

    // This effect triggers the animation after the subtitle finishes typing
    useEffect(() => {
        const subtitleAnimationDuration = 4000;
        const timer = setTimeout(() => {
            setAnimateHowItWorks(true);
        }, subtitleAnimationDuration);

        return () => clearTimeout(timer); 
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            className="landing-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <header className="app-header">
                <img src="/logo.png" alt="App Logo" className="app-logo" />
                <h1 className="animated-title">
                    {/* <TypeAnimation
                        sequence={[
                            '', 100, 'Social Media Content Analyzer',
                        ]}
                        wrapper="span"
                        speed={60}
                        style={{ fontSize: '1em', display: 'inline-block' }}
                        repeat={0}
                    /> */}
                    Social Media Content Analyzer
                </h1>
                <p className="subtitle">
                    <TypeAnimation
                        sequence={[
                            '', 1000, 'Turn your social media posts into engagement magnets with AI-powered suggestions.',
                        ]}
                        wrapper="span"
                        speed={60}
                        style={{ fontSize: '1em', display: 'inline-block' }}
                        repeat={0}
                    />
                </p>
            </header>

            <motion.div
                className="how-it-works-section"
                variants={containerVariants}
                initial="hidden"
                animate={animateHowItWorks ? "visible" : "hidden"}
            >
                <motion.h2 variants={titleVariants}>How It Works</motion.h2>
                <motion.div className="steps-container" variants={containerVariants}>
                    <motion.div className="step-card" variants={cardVariantLeft}>
                        <div className="step-number">1</div>
                        <h3>Upload Your Post</h3>
                        <p>Upload a screenshot (image) or a saved document (PDF) of your social media post.</p>
                    </motion.div>
                    <motion.div className="step-card" variants={cardVariantMiddle}>
                        <div className="step-number">2</div>
                        <h3>Get AI Analysis</h3>
                        <p>Our AI analyzes the text for tone, readability, and engagement potential in seconds.</p>
                    </motion.div>
                    <motion.div className="step-card" variants={cardVariantRight}>
                        <div className="step-number">3</div>
                        <h3>Improve & Engage</h3>
                        <p>Receive actionable, formatted suggestions to improve your post and boost engagement.</p>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={animateHowItWorks ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <button onClick={onTryNow} className="try-now-btn">
                    Try Now
                </button>
            </motion.div>

        </motion.div>
    );
}

export default LandingPage;

