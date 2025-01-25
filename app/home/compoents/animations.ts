export const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            when: "beforeChildren",
            staggerChildren: 0.3
        }
    },
};

export const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    },
};

export const textAnimation = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2
        }
    }
};

export const letterAnimation = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 200,
        }
    }
};

export const colorAnimation = {
    animate: {
        color: [
            'hsl(0, 0%, 0%)',
            'hsl(0, 0%, 20%)',
            'hsl(0, 0%, 40%)',
            'hsl(0, 0%, 60%)',
            'hsl(0, 0%, 80%)',
            'hsl(0, 0%, 100%)',
            'hsl(0, 0%, 80%)',
            'hsl(0, 0%, 60%)',
            'hsl(0, 0%, 40%)',
            'hsl(0, 0%, 20%)',
            'hsl(0, 0%, 0%)',
        ],
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

export const arrowAnimation = {
    x: [0, 10, 0],
    transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

export const socialIconAnimation = {
    hidden: {scale: 0},
    visible: {
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    }
};