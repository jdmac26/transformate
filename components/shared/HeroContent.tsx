"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    slideInFromLeft,
    slideInFromRight,
} from "@/lib/motion";
import Image from "next/image";
import { Button } from "../ui/button";

const HeroContent = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-row items-center justify-center px-20 w-full z-[20] "
        >
            
            <div className="h-full w-full flex flex-col gap-5 justify-center text-start ">
                <motion.div
                    variants={slideInFromLeft(0.5)}
                    className="flex flex-col gap-2 text-6xl font-bold text-white max-w-[550px] w-auto h-auto "
                >
                    <span>
                        Providing
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            {" "}
                            the best{" "}
                        </span>
                        AI experience
                    </span>
                </motion.div>

                <motion.p
                    variants={slideInFromLeft(0.8)}
                    className="text-lg text-gray-400 my-5 max-w-[600px]"
                >
                    Unleash your creative side with <b>Transformate</b> and utilize the rich feature set that we offer, more information is below!
                </motion.p>
                <motion.div variants={slideInFromLeft(0.8)}>
                    <Button className="bg-gradient-to-r from-purple-500 to-cyan-500">Get Started</Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HeroContent;