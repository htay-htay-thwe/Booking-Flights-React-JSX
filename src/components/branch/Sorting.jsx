import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Sorting = ({ options, handleSelect, selected }) => {

    return (
        <div className="w-full">
            <div className="flex overflow-x-auto justify-start border  border-gray-300 rounded-md overflow-hidden">
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(option.key)}
                        className={`
              flex-1 min-w-[150px] text-center p-4 cursor-pointer 
              border-r last:border-r-0 border-blue-200
              hover:bg-blue-50 transition 
              ${selected === option.key ? "bg-white border-b-4 border-blue-600" : ""}
            `}
                    >
                        <p
                            className={`font-semibold flex items-center justify-center gap-1 
              ${selected === option.key ? "text-blue-600 " : "text-gray-800"}`}
                        >
                            <FontAwesomeIcon icon={option.icon} className={`${option.iconClass || ""}`} />
                            {option.label}
                        </p>
                        <p className="text-gray-600 text-sm">{option.price} • {option.duration}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sorting;
