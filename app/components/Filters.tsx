import React from "react";

const Filters = () => {
  return (
    <>
      <div className="flex flex-col justify-start w-9/12 mt-9 ml-4">
        <h2 className="font-bold border-2 border-cyan-400 max-w-fit self-start p-2">
          Filtrar en el mapa
        </h2>
        <div className="flex flex-col ">
          <div className="flex flex-row my-4 max-h-7 max-w-md overflow-hidden">
            <h4 className="border-2 border-r-0 border-cyan-500">
              filtrar por inversion inicial
            </h4>
            <select
              className="border-2 border-l-0 border-cyan-500"
              name=""
              id=""
            >
              <option value="">1sdfsdgfs</option>
              <option value="">2</option>
            </select>
          </div>
          <div className="flex flex-row my-4">
            <h4 className="border-2 border-r-0 border-cyan-500">
              filtrar por cantidad dormitorios
            </h4>
            <select
              className="border-2 border-l-0 border-cyan-500"
              name=""
              id=""
            >
              <option value="">1</option>
              <option value="">2</option>
            </select>
          </div>
          <div className="flex flex-row my-4">
            <h4 className="border-2 border-r-0 border-cyan-500">
              filtrar por estacionamiento
            </h4>
            <select
              className="border-2 border-l-0 border-cyan-500"
              name=""
              id=""
            >
              <option value="">1</option>
              <option value="">2</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
