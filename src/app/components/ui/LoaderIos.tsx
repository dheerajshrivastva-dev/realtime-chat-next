// import { FC } from 'react'

// interface LoaderIosProps {
//   isLoading?: boolean;
//   speed?: number;
//   color?: string;
// }

// const LoaderIos: FC<LoaderIosProps> = ({}) => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default LoaderIos
import React from "react";
import styles from "@/app/components/ui/Loader.module.css";

interface LoaderProps {
  isLoading: boolean;
  size?: number;
  color?: string;
  speed?: number;
  bgColor?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  isLoading,
  size,
  color = "#fff",
  speed = 10,
  bgColor = "#737373",
  className
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>


      <svg
        width={size || "auto"}
        height={size || "auto"}
        className={`${styles.loader} ${!isLoading ? "" : styles.animate}`}
        style={{animationDuration: `${10/speed}s`}}
        viewBox="0 0 345 345"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M106.74 316.399C102.598 323.573 93.4244 326.031 86.25 321.889C79.0756 317.747 76.6175 308.573 80.7597 301.399L115.76 240.777C119.902 233.603 129.076 231.145 136.25 235.287C143.424 239.429 145.883 248.603 141.74 255.777L106.74 316.399Z"
          fill={bgColor}
        />
        <path
          d="M43.601 264.24C36.4266 268.383 27.2527 265.924 23.1106 258.75C18.9685 251.576 21.4266 242.402 28.601 238.26L89.2228 203.26C96.3971 199.118 105.571 201.576 109.713 208.75C113.855 215.924 111.397 225.098 104.223 229.24L43.601 264.24Z"
          fill={bgColor}
        />
        <path
          d="M15 187.5C6.71572 187.5 -2.46891e-07 180.784 0 172.5C2.46891e-07 164.216 6.71573 157.5 15 157.5H85C93.2843 157.5 100 164.216 100 172.5C100 180.784 93.2843 187.5 85 187.5H15Z"
          fill={bgColor}
        />
        <path
          d="M28.601 106.74C21.4266 102.598 18.9685 93.4244 23.1106 86.25C27.2527 79.0756 36.4266 76.6175 43.601 80.7597L104.223 115.76C111.397 119.902 113.855 129.076 109.713 136.25C105.571 143.424 96.3971 145.883 89.2228 141.74L28.601 106.74Z"
          fill={bgColor}
        />
        <path
          d="M80.7596 43.601C76.6175 36.4266 79.0756 27.2528 86.25 23.1107C93.4244 18.9685 102.598 21.4266 106.74 28.601L141.74 89.2228C145.883 96.3972 143.424 105.571 136.25 109.713C129.076 113.855 119.902 111.397 115.76 104.223L80.7596 43.601Z"
          fill={bgColor}
        />
        <path
          d="M157.5 15C157.5 6.71573 164.216 0 172.5 0C180.784 0 187.5 6.71573 187.5 15V85C187.5 93.2843 180.784 100 172.5 100C164.216 100 157.5 93.2843 157.5 85V15Z"
          fill={bgColor}
        />
        <path
          d="M238.26 28.601C242.402 21.4266 251.576 18.9684 258.75 23.1106C265.924 27.2527 268.383 36.4266 264.24 43.601L229.24 104.223C225.098 111.397 215.924 113.855 208.75 109.713C201.576 105.571 199.118 96.3971 203.26 89.2227L238.26 28.601Z"
          fill={bgColor}
        />
        <path
          d="M301.399 80.7596C308.573 76.6174 317.747 79.0756 321.889 86.25C326.032 93.4243 323.573 102.598 316.399 106.74L255.777 141.74C248.603 145.882 239.429 143.424 235.287 136.25C231.145 129.076 233.603 119.902 240.777 115.76L301.399 80.7596Z"
          fill={bgColor}
        />
        <path
          d="M330 157.5C338.284 157.5 345 164.216 345 172.5C345 180.784 338.284 187.5 330 187.5H260C251.716 187.5 245 180.784 245 172.5C245 164.216 251.716 157.5 260 157.5H330Z"
          fill={bgColor}
        />
        <path
          d="M316.399 238.26C323.573 242.402 326.031 251.576 321.889 258.75C317.747 265.924 308.573 268.383 301.399 264.24L240.777 229.24C233.603 225.098 231.145 215.924 235.287 208.75C239.429 201.576 248.603 199.118 255.777 203.26L316.399 238.26Z"
          fill={bgColor}
        />
        <path
          d="M264.24 301.399C268.383 308.573 265.924 317.747 258.75 321.889C251.576 326.032 242.402 323.573 238.26 316.399L203.26 255.777C199.118 248.603 201.576 239.429 208.75 235.287C215.924 231.145 225.098 233.603 229.24 240.777L264.24 301.399Z"
          fill={bgColor}
        />
        <path
          d="M187.5 330C187.5 338.284 180.784 345 172.5 345C164.216 345 157.5 338.284 157.5 330V260C157.5 251.716 164.216 245 172.5 245C180.784 245 187.5 251.716 187.5 260V330Z"
          fill={bgColor}
        />
        <path
          d="M43.601 264.24C36.4266 268.383 27.2527 265.924 23.1106 258.75C18.9685 251.576 21.4266 242.402 28.601 238.26L89.2228 203.26C96.3971 199.118 105.571 201.576 109.713 208.75C113.855 215.924 111.397 225.098 104.223 229.24L43.601 264.24Z"
          fill={color}
          fillOpacity="0.0666667"
        />
        <path
          d="M15 187.5C6.71572 187.5 -2.46891e-07 180.784 0 172.5C2.46891e-07 164.216 6.71573 157.5 15 157.5H85C93.2843 157.5 100 164.216 100 172.5C100 180.784 93.2843 187.5 85 187.5H15Z"
          fill={color}
          fillOpacity="0.133333"
        />
        <path
          d="M28.601 106.74C21.4266 102.598 18.9685 93.4244 23.1106 86.25C27.2527 79.0756 36.4266 76.6175 43.601 80.7597L104.223 115.76C111.397 119.902 113.855 129.076 109.713 136.25C105.571 143.424 96.3971 145.883 89.2228 141.74L28.601 106.74Z"
          fill={color}
          fillOpacity="0.2"
        />
        <path
          d="M80.7596 43.601C76.6175 36.4266 79.0756 27.2528 86.25 23.1107C93.4244 18.9685 102.598 21.4266 106.74 28.601L141.74 89.2228C145.883 96.3972 143.424 105.571 136.25 109.713C129.076 113.855 119.902 111.397 115.76 104.223L80.7596 43.601Z"
          fill={color}
          fillOpacity="0.266667"
        />
        <path
          d="M157.5 15C157.5 6.71573 164.216 0 172.5 0C180.784 0 187.5 6.71573 187.5 15V85C187.5 93.2843 180.784 100 172.5 100C164.216 100 157.5 93.2843 157.5 85V15Z"
          fill={color}
          fillOpacity="0.333333"
        />
        <path
          d="M238.26 28.601C242.402 21.4266 251.576 18.9684 258.75 23.1106C265.924 27.2527 268.383 36.4266 264.24 43.601L229.24 104.223C225.098 111.397 215.924 113.855 208.75 109.713C201.576 105.571 199.118 96.3971 203.26 89.2227L238.26 28.601Z"
          fill={color}
          fillOpacity="0.4"
        />
        <path
          d="M301.399 80.7596C308.573 76.6174 317.747 79.0756 321.889 86.25C326.032 93.4243 323.573 102.598 316.399 106.74L255.777 141.74C248.603 145.882 239.429 143.424 235.287 136.25C231.145 129.076 233.603 119.902 240.777 115.76L301.399 80.7596Z"
          fill={color}
          fillOpacity="0.466667"
        />
        <path
          d="M330 157.5C338.284 157.5 345 164.216 345 172.5C345 180.784 338.284 187.5 330 187.5H260C251.716 187.5 245 180.784 245 172.5C245 164.216 251.716 157.5 260 157.5H330Z"
          fill={color}
          fillOpacity="0.6"
        />
        <path
          d="M316.399 238.26C323.573 242.402 326.031 251.576 321.889 258.75C317.747 265.924 308.573 268.383 301.399 264.24L240.777 229.24C233.603 225.098 231.145 215.924 235.287 208.75C239.429 201.576 248.603 199.118 255.777 203.26L316.399 238.26Z"
          fill={color}
          fillOpacity="0.733333"
        />
        <path
          d="M264.24 301.399C268.383 308.573 265.924 317.747 258.75 321.889C251.576 326.032 242.402 323.573 238.26 316.399L203.26 255.777C199.118 248.603 201.576 239.429 208.75 235.287C215.924 231.145 225.098 233.603 229.24 240.777L264.24 301.399Z"
          fill={color}
          fillOpacity="0.866667"
        />
        <path
          d="M187.5 330C187.5 338.284 180.784 345 172.5 345C164.216 345 157.5 338.284 157.5 330V260C157.5 251.716 164.216 245 172.5 245C180.784 245 187.5 251.716 187.5 260V330Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default Loader;

//region mobile loader
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Animated, StyleSheet } from 'react-native';
// import Svg, { Path } from 'react-native-svg'; // Import Svg and Path components

// interface LoaderProps {
//   isLoading: boolean;
//   size?: number;
//   color?: string;
//   speed?: number;
//   bgColor?: string;
// }

// const Loader: React.FC<LoaderProps> = ({
//   isLoading,
//   size = 40,
//   color = '#fff',
//   speed = 10,
//   bgColor = '#737373',
// }) => {
//   const rotation = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (isLoading) {
//       Animated.timing(rotation, {
//         toValue: 360,
//         duration: (10 / speed) * 1000, // Speed is in seconds, convert to milliseconds
//         useNativeDriver: true, // For better performance
//       }).start(() => {
//         // Reset rotation after completing one cycle
//         rotation.setValue(0);
//       });
//     } else {
//       rotation.setValue(0); // Reset rotation when not loading
//     }

//     return () => {
//       Animated.stopAnimation(rotation); // Stop animation on unmount
//     };
//   }, [isLoading, speed]);

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.loader,
//           {
//             width: size,
//             height: size,
//             transform: [{ rotate: rotation.interpolate({
//               inputRange: [0, 360],
//               outputRange: ['0deg', '360deg'],
//             }) }],
//           },
//         ]}
//       >
//         <Svg width={size} height={size} viewBox="0 0 345 345" fill="none" xmlns="http://www.w3.org/2000/svg">
//           {/* Your SVG paths here, using the same paths from your previous code */}
//           <Path d="M106.74 316.399C102.598 323.573 93.4244 326.031 86.25 321.889C79.0756 317.747 76.6175 308.573 80.7597 301.399L115.76 240.777C119.902 233.603 129.076 231.145 136.25 235.287C143.424 239.429 145.883 248.603 141.74 255.777L106.74 316.399Z" fill={bgColor} />
//           {/* ... rest of your SVG paths */}
//         </Svg>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loader: {
//     borderRadius: 100,
//     overflow: 'hidden', // To clip the SVG if it extends outside the loader circle
//   },
// });

// export default Loader;
//endredion