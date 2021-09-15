import React from 'react';

const LoadingButton = () => {
    return (
        <div>
            {/* @ts-ignore */}
            <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_dBbqyA.json" style={{height:'25vh',marginTop:'5vh'}}  background="transparent"  speed="1"   loop  autoplay></lottie-player>
        </div>
    );
}

export default LoadingButton;
