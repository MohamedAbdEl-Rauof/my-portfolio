import React from 'react';
import {motion} from 'framer-motion';
import {Typography} from '@mui/material';
import Link from "next/link";
import {itemVariants} from './animations';

const IntroText: React.FC = () => (
    <>
        <motion.div
            variants={itemVariants}
            transition={{type: "spring", stiffness: 400, damping: 10}}
        >
            <Typography variant="body1" paragraph>
                Your friendly neighborhood frontend developer, UX architect, and JavaScript
                engineer. I spend my days (and often nights) painting the Internet canvas with
                <Link href="/projects">
                    <span className="font-bold p-1 hover:underline">Projects </span>
                </Link>
                and lines of code, turning zeroes and ones into immersive, interactive experiences.
            </Typography>
        </motion.div>
        <motion.div
            variants={itemVariants}
            transition={{type: "spring", stiffness: 400, damping: 10}}
        >
            <Typography variant="body1" paragraph>
                Bona fide photochromic Lens enthusiast - sunlight or indoors, I've got it covered. I
                tread the path of minimalism, finding beauty in simplicity and order. When I'm not
                crafting beautiful web experiences, you can find me reading Articles or swaying to the
                rhythm of Pop Music & Jazz, losing myself in the captivating flow of melodies. Anyways, you can
                <Link href="/contact">
                    <span className="font-bold hover:underline"> Contact Me.</span>
                </Link>
            </Typography>
        </motion.div>
    </>
);

export default IntroText;