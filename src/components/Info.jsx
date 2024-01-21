import React from 'react'
import backIcon from '../assets/back.svg';

function Info({setInfo}) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center relative"> {/* Add relative positioning here */}
      <button onClick={() => setInfo(false)} 
              className="absolute top-0 right-0 text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-full p-2 m-1" 
              style={{marginTop: '10px', marginRight: '10px'}}> {/* Absolute positioning */}
        <img src={backIcon} alt="Back" className="h-6 w-6" />
      </button>

      <p className="my-4 py-4 text-gray-700">
        This is an information component. It contains a paragraph and three useful links. You can customize the content as needed.
      </p>

      <div className="flex flex-col items-center space-y-2">
        <a href="#link1" className="text-blue-500 hover:text-blue-700">Link 1</a>
        <a href="#link2" className="text-blue-500 hover:text-blue-700">Link 2</a>
        <a href="#link3" className="text-blue-500 hover:text-blue-700">Link 3</a>
      </div>
    </div>
  )
}

export default Info;
