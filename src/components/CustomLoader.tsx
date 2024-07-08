import React from "react";
import { TailSpin } from 'react-loader-spinner'
import CustomLabel from "./CustomLabel";
interface CustomLoaderProps {

}

const CustomLoader: React.FC<CustomLoaderProps> = ({  }) =>{

    return <div className={'custom_laoder'}>
        <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#000000"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
}

export default CustomLoader;